import { cateringPackages } from "~/lib/packages-metadata"
import type { MenuItem } from "~/types/menu-types"
import { type EventType, hoursArray, type PackageCategory, reservationEventTypes } from "~/types/package-types"
import {
  type HoursArrayTypes,
  type MenuReservationDetails,
  paxArray,
  type PaxArrayType,
  type ReservationItem,
  reservationStatusArray,
  type ReservationStatusType,
  type SelectedMenu,
  type SelectedMenus,
} from "~/types/reservation-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "~/lib/axiosInstance"
import axios from "axios"
import {
  initSocket,
  subscribeToMenuUpdates,
  subscribeToMenuDeleted,
  unsubscribeFromMenuUpdates,
  unsubscribeFromMenuDeleted,
} from "~/lib/socket"

import * as z from "zod"

// Reservation Schema for Zod
const reservationSchema = z
  .object({
    fullName: z
      .string({ required_error: "Please provide your Full Name" })
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must not exceed 50 characters"),
    email: z
      .string({ required_error: "Please provide your email address" })
      .email("Please enter a valid email address"),
    contactNumber: z
      .string({ required_error: "Please provide your Contact Number" })
      .regex(/^\d{11}$/, "Contact Number must have exactly 11 digits"),
    reservationType: z.enum(["event", "personal"]),
    eventType: z.enum(reservationEventTypes as [EventType, ...EventType[]], {
      required_error: "Please select an Event Type",
    }),
    reservationDate: z.date({
      required_error: "Please provide the Event Date",
    }),
    reservationTime: z
      .string({ required_error: "Please provide the Event Time" })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time (HH:mm)"),
    period: z.enum(["A.M.", "P.M."]),
    guestCount: z.number({ required_error: "Please provide the Guest Count" }),
    venue: z
      .string({ required_error: "Please provide the Venue" })
      .min(3, "Venue must be at least 3 characters")
      .max(100, "Venue must not exceed 100 characters"),
    cateringOptions: z.enum(["event", "custom"], {
      required_error: "Please select a Service Mode",
    }),
    serviceType: z.enum(["Buffet", "Plated"], {
      required_error: "Please select a Service Type",
    }),
    serviceFee: z.number(),
    serviceHours: z.enum(hoursArray as [HoursArrayTypes, ...HoursArrayTypes[]]).optional(),
    selectedPackage: z.string({ required_error: "Please select a Package" }).min(1, "Package selection is required"),
    selectedMenus: z
      .record(
        z.string(), // category
        z.record(
          z.string(), // dish ID
          z.object({
            quantity: z.number().min(1),
            paxSelected: z.enum(paxArray as [PaxArrayType, ...PaxArrayType[]]),
            pricePerPax: z.number().min(0),
          }),
        ),
      )
      .refine((menus) => Object.values(menus).some((category) => Object.keys(category).length > 0), {
        message: "You must select at least one menu item.",
      }),
    totalPrice: z.number(),
    specialRequests: z.string().max(500, "Special Requests must not exceed 500 characters").optional(),
    deliveryOption: z.enum(["Pickup", "Delivery"], {
      required_error: "Please select a Delivery Option",
    }),
    deliveryFee: z.number(),
    deliveryAddress: z
      .string()
      .min(1, "Delivery address is required")
      .max(200, "Delivery address must not exceed 200 characters")
      .optional(),
    deliveryInstructions: z.string().max(300, "Delivery Instructions must not exceed 300 characters").optional(),
    paymentReference: z
      .string()
      .min(1, "Payment Reference is required")
      .max(100, "Payment Reference must not exceed 100 characters")
      .optional(),
    status: z.enum(reservationStatusArray as [ReservationStatusType, ...ReservationStatusType[]]),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .superRefine((data, ctx) => {
    const match = data.reservationTime.match(/^(\d+):([0-5]\d)$/)
    if (match) {
      const [_, hoursStr, minutesStr] = match
      const hours = Number.parseInt(hoursStr)
      const minutes = Number.parseInt(minutesStr)
      let hours24 = hours
      if (data.period === "P.M." && hours !== 12) {
        hours24 += 12
      } else if (data.period === "A.M." && hours === 12) {
        hours24 = 0
      }

      const totalMinutes = hours24 * 60 + minutes
      const isValidTime = totalMinutes >= 8 * 60 && totalMinutes <= 17 * 60
      if (!isValidTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["reservationTime"],
          message: "Time must be between 8:00 AM and 5:00 PM",
        })
      }
    }

    if (data.selectedPackage) {
      const selectedPackage = cateringPackages.find((pkg) => pkg._id === data.selectedPackage)
      const minimumGuestCount = selectedPackage?.minimumPax || 20
      const allCategoriesHaveMenus = Object.values(data.selectedMenus).every(
        (categoryMenus) => Object.keys(categoryMenus).length > 0,
      )

      if (data.guestCount < minimumGuestCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestCount"],
          message: `Guest count must be at least ${minimumGuestCount}`,
        })
      }

      if (!allCategoriesHaveMenus) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one menu item must be selected for each category",
          path: ["selectedMenus"],
        })
      }
    }
    if (data.guestCount < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: `Guest count must be at least 20 people`,
      })
    }
    if (data.guestCount > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: `Guest count must be at most 200 people`,
      })
    }
  })

export type ReservationValues = z.infer<typeof reservationSchema>

const defaultValues: ReservationValues = {
  fullName: "",
  email: "",
  contactNumber: "",
  reservationType: "event",
  eventType: "",
  reservationDate: new Date(),
  reservationTime: "08:00",
  period: "A.M.",
  guestCount: 20,
  venue: "",
  cateringOptions: "event",
  serviceType: "Buffet",
  serviceFee: 0,
  serviceHours: "4 hours",
  selectedPackage: "",
  selectedMenus: {},
  totalPrice: 0,
  specialRequests: "",
  deliveryOption: "Pickup",
  deliveryFee: 0,
  deliveryAddress: "",
  deliveryInstructions: "",
  paymentReference: "",
  status: "Pending",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export function useReservationForm() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [showPackageSelection, setShowPackageSelection] = useState(false)
  const [isCategoryError, setIsCategoryError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const reservationForm = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  })

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = reservationForm
  const cateringOptions = watch("cateringOptions")
  const selectedPackage = watch("selectedPackage")
  const reservationType = watch("reservationType")
  const serviceFee = watch("serviceFee")
  const deliveryFee = watch("deliveryFee")
  const selectedMenus = watch("selectedMenus")
  const guestCount = watch("guestCount") || 1
  const serviceType = watch("serviceType")
  const deliveryOption = watch("deliveryOption")

  // Initialize socket connection and fetch menus
  useEffect(() => {
    const socket = initSocket()

    const fetchMenus = async () => {
      setIsLoading(true)
      try {
        const allMenus = await getAllMenus()
        if (allMenus) {
          setMenus(allMenus)
        }
      } catch (error) {
        console.error("Error fetching menus:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenus()

    // Subscribe to menu updates
    subscribeToMenuUpdates((updatedMenu) => {
      setMenus((prevMenus) => {
        const index = prevMenus.findIndex((menu) => menu._id === updatedMenu._id)
        if (index !== -1) {
          const newMenus = [...prevMenus]
          newMenus[index] = updatedMenu
          return newMenus
        }
        return [...prevMenus, updatedMenu]
      })
    })

    // Subscribe to menu deletions
    subscribeToMenuDeleted((deletedMenuId) => {
      setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== deletedMenuId))
    })

    return () => {
      unsubscribeFromMenuUpdates()
      unsubscribeFromMenuDeleted()
    }
  }, [])

  // Handle delivery fee updates
  useEffect(() => {
    if (deliveryOption === "Delivery") {
      setValue("deliveryFee", 500)
    } else {
      setValue("deliveryFee", 0)
    }
  }, [deliveryOption, setValue])

  // Handle service fee updates based on service type
  useEffect(() => {
    if (serviceType === "Plated") {
      setValue("serviceFee", 1500)
    } else {
      setValue("serviceFee", 0)
    }
  }, [serviceType, setValue])

  // Calculate total price
  useEffect(() => {
    const isPackage = cateringPackages.find((pkg) => pkg._id === selectedPackage)
    const calculateTotal = () => {
      let total = 0

      // Iterate through each category (Soup, Beverage)
      Object.values(selectedMenus).forEach((category) => {
        // Iterate through each menu item in the category
        Object.values(category).forEach((item) => {
          total += item.quantity * item.pricePerPax
        })
      })
      if (isPackage) {
        const serviceCharge = serviceType === "Plated" ? isPackage.serviceCharge : 0
        setValue("totalPrice", isPackage.pricePerPax * guestCount + (serviceCharge + deliveryFee))
      } else {
        setValue("totalPrice", total + serviceFee + deliveryFee)
      }
    }
    calculateTotal()
  }, [selectedMenus, serviceFee, deliveryFee, guestCount, selectedPackage, serviceType, setValue])

  // Handle package selection
  useEffect(() => {
    const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage)
    if (pkg) {
      // Update the form with the blank categories
      const selectedMenus = Object.fromEntries(pkg?.options.map((opt) => [opt.category, {}]))

      setValue("selectedMenus", selectedMenus)
      setValue("guestCount", pkg.minimumPax)
      setValue("eventType", pkg?.eventType ?? "No Event")
      setValue("reservationType", "event")

      // Reset category error when package changes
      setIsCategoryError(false)
    }
  }, [selectedPackage, setValue])

  // Validate categories have selections
  useEffect(() => {
    if (selectedPackage) {
      const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage)
      if (pkg) {
        const allCategoriesHaveMenus = pkg.options.every((option) => {
          const categoryMenus = selectedMenus[option.category] || {}
          return Object.keys(categoryMenus).length > 0
        })

        setIsCategoryError(!allCategoriesHaveMenus)
      }
    }
  }, [selectedMenus, selectedPackage])

  // Navigate to next step
  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    if (cateringOptions === "event" && selectedPackage === "" && step !== 0) {
      setShowPackageSelection(true)
      return false
    }

    if (cateringOptions === "custom" && step === 1) {
      return true
    }

    const fieldsToValidate = getFieldsToValidate(step)
    const isValid = await reservationForm.trigger(fieldsToValidate)

    // Additional validation for menu selections
    if (step === 2 && selectedPackage) {
      const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage)
      if (pkg) {
        const allCategoriesHaveMenus = pkg.options.every((option) => {
          const categoryMenus = selectedMenus[option.category] || {}
          return Object.keys(categoryMenus).length > 0
        })

        if (!allCategoriesHaveMenus) {
          setIsCategoryError(true)
          return false
        }
      }
    }

    return isValid
  }

  // Get fields to validate for each step
  const getFieldsToValidate = (step: number): Array<keyof ReservationValues> => {
    switch (step) {
      case 0:
        return ["fullName", "email", "contactNumber"]
      case 1:
        return ["cateringOptions", "selectedPackage"]
      case 2:
        return ["selectedMenus"]
      case 3:
        if (reservationType === "event") {
          return [
            "eventType",
            "reservationDate",
            "reservationTime",
            "period",
            "guestCount",
            "venue",
            "serviceType",
            "deliveryOption",
          ]
        }
        return ["reservationDate", "reservationTime", "period", "guestCount", "venue", "serviceType", "deliveryOption"]
      case 4:
        if (deliveryOption === "Delivery") {
          return ["deliveryAddress", "deliveryInstructions"]
        }
        return []
      default:
        return []
    }
  }

  // Fetch all menus
  const getAllMenus = async () => {
    try {
      const response = await api.get(`/menus`)
      return response.data.data
    } catch (err) {
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected error occurred."
        console.error("ERROR FETCHING MENU", message)
      } else {
        console.error("Something went wrong. Please try again.")
      }
      return null
    }
  }

  // Fetch a specific menu item
  const getMenuItem = async (menuId: string) => {
    try {
      const response = await api.get(`/menus/${menuId}`)
      return response.data.data
    } catch (err) {
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected error occurred."
        console.error("ERROR FETCHING MENU", message)
      } else {
        console.error("Something went wrong. Please try again.")
      }
      return null
    }
  }

  // Get package details
  const getPackageItem = (pkgId: string) => {
    const pkg = cateringPackages.find((item) => item._id === pkgId)
    return pkg
  }

  // Handle form submission
  const onSubmit = handleSubmit(async (data: ReservationValues) => {
    setIsSubmitting(true)
    try {
      // Create reservation object
      const reservation: ReservationItem = {
        ...data,
      }

      // Here you would typically send this to your API
      // For example: await api.post('/reservations', reservation);

      // Show success message
      setIsSubmitSuccess(true)

      // Reset form after successful submission
      reservationForm.reset(defaultValues)
      setCurrentStep(0)

      return reservation
    } catch (error) {
      console.error("Error submitting reservation:", error)
    } finally {
      setIsSubmitting(false)
    }
  })

  // Open confirmation dialog
  const openConfirmDialog = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setIsConfirmDialogOpen(true)
    }
  }

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false)
  }

  // Handle checkbox change for menu selection
  const handleCheckboxChange = (
    checked: boolean | string,
    field: any,
    category: PackageCategory,
    menu: MenuItem,
    count: number,
    price: number,
  ) => {
    const currentSelection = field.value[category] || {}
    const updatedMenus: SelectedMenu = { ...currentSelection }
    const uniqueMenusSelected = Object.keys(updatedMenus).length

    if (checked === true) {
      // Allow adding a new dish if under the limit
      if (uniqueMenusSelected < count) {
        updatedMenus[menu._id] = {
          quantity: 1,
          paxSelected: "4-6 pax",
          pricePerPax: price,
        } // Set quantity to 1 when checked
      }
    } else {
      // Remove the dish completely when unchecked
      delete updatedMenus[menu._id]
    }

    const newMenus = {
      ...field.value,
      [category]: updatedMenus,
    }

    // Optional: remove the category entirely if it's empty
    if (Object.keys(updatedMenus).length === 0 && selectedPackage.length < 0) {
      delete newMenus[category]
    }

    field.onChange(newMenus)

    // Update category error state
    if (selectedPackage) {
      const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage)
      if (pkg) {
        const allCategoriesHaveMenus = pkg.options.every((option) => {
          const categoryMenus = newMenus[option.category] || {}
          return Object.keys(categoryMenus).length > 0
        })

        setIsCategoryError(!allCategoriesHaveMenus)
      }
    }
  }

  // Handle reducing quantity of a menu item
  const handleReduceQuantity = (
    value: SelectedMenus,
    category: string,
    menu: string,
    onChange: (value: SelectedMenus) => void,
  ) => {
    // Check if the category exists and get the count of menu items
    const currentCategory = value[category]
    const currentCount = currentCategory ? Object.keys(currentCategory).length : 0

    // Proceed only if the category has menu items and the menu exists
    if (currentCount > 0 && currentCategory && currentCategory[menu]) {
      // Create updated category with the new quantity for the menu
      const updatedCategory: Record<string, MenuReservationDetails> = {
        ...currentCategory,
        [menu]: {
          ...currentCategory[menu],
          quantity: currentCategory[menu].quantity - 1,
        },
      }

      // Remove the menu if its quantity becomes 0
      if (updatedCategory[menu].quantity === 0) {
        delete updatedCategory[menu]
      }

      // If the category becomes empty, remove the category
      if (Object.keys(updatedCategory).length === 0) {
        const updatedFieldValue = { ...value }
        delete updatedFieldValue[category]
        onChange(updatedFieldValue)
      } else {
        onChange({
          ...value,
          [category]: updatedCategory,
        })
      }
    }
  }

  // Handle adding quantity of a menu item
  const handleAddQuantity = (
    value: SelectedMenus,
    category: string,
    menu: string,
    onChange: (value: SelectedMenus) => void,
  ) => {
    // Get the current category, default to empty object if undefined
    const currentCategory = value[category] || {}

    // Get the current menu item, default to a new MenuReservationDetails if undefined
    const currentItem = currentCategory[menu] || {
      quantity: 0,
      paxSelected: "Adult", // Default value, adjust as needed
      pricePerPax: 0, // Default value, adjust as needed
    }

    // Create updated category with incremented quantity
    const updatedCategory: Record<string, MenuReservationDetails> = {
      ...currentCategory,
      [menu]: {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      },
    }

    // Update the value with the new category
    onChange({
      ...value,
      [category]: updatedCategory,
    })
  }

  return {
    reservationForm,
    validateStep,
    getMenuItem,
    getPackageItem,
    onSubmit,
    isSubmitSuccess,
    handleCheckboxChange,
    showPackageSelection,
    setShowPackageSelection,
    handleReduceQuantity,
    handleAddQuantity,
    getAllMenus,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    isLoading,
    menus,
    isCategoryError,
    isSubmitting,
    isConfirmDialogOpen,
    openConfirmDialog,
    closeConfirmDialog,
    errors,
  }
}
