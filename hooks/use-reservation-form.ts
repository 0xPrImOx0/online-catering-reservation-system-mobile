import { cateringPackages } from "~/lib/packages-metadata";
import { menuItems } from "~/lib/menu-lists";
import { MenuItem } from "~/types/menu-types";
import {
  EventType,
  hoursArray,
  PackageCategory,
  reservationEventTypes,
} from "~/types/package-types";
import {
  HoursArrayTypes,
  MenuReservationDetails,
  paxArray,
  PaxArrayType,
  ReservationItem,
  reservationStatusArray,
  ReservationStatusType,
  SelectedMenu,
  SelectedMenus,
} from "~/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "~/lib/axiosInstance";
import axios from "axios";
import {
  initSocket,
  subscribeToMenuUpdates,
  subscribeToMenuDeleted,
  unsubscribeFromMenuUpdates,
  unsubscribeFromMenuDeleted,
} from "~/lib/socket";

import * as z from "zod";

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
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Please enter a valid time (HH:mm)"
      ),
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
    serviceHours: z
      .enum(hoursArray as [HoursArrayTypes, ...HoursArrayTypes[]])
      .optional(),
    selectedPackage: z
      .string({ required_error: "Please select a Package" })
      .min(1, "Package selection is required"),
    selectedMenus: z
      .record(
        z.string(), // category
        z.record(
          z.string(), // dish ID
          z.object({
            quantity: z.number().min(1),
            paxSelected: z.enum(paxArray as [PaxArrayType, ...PaxArrayType[]]),
            pricePerPax: z.number().min(0),
          })
        )
      )
      .refine(
        (menus) =>
          Object.values(menus).some(
            (category) => Object.keys(category).length > 0
          ),
        { message: "You must select at least one menu item." }
      ),
    totalPrice: z.number(),
    specialRequests: z
      .string()
      .max(500, "Special Requests must not exceed 500 characters")
      .optional(),
    deliveryOption: z.enum(["Pickup", "Delivery"], {
      required_error: "Please select a Delivery Option",
    }),
    deliveryFee: z.number(),
    deliveryAddress: z
      .string()
      .min(1, "Delivery address is required")
      .max(200, "Delivery address must not exceed 200 characters")
      .optional(),
    deliveryInstructions: z
      .string()
      .max(300, "Delivery Instructions must not exceed 300 characters")
      .optional(),
    paymentReference: z
      .string()
      .min(1, "Payment Reference is required")
      .max(100, "Payment Reference must not exceed 100 characters")
      .optional(),
    status: z.enum(
      reservationStatusArray as [
        ReservationStatusType,
        ...ReservationStatusType[]
      ]
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .superRefine((data, ctx) => {
    const match = data.reservationTime.match(/^(\d+):([0-5]\d)$/);
    if (match) {
      const [_, hoursStr, minutesStr] = match;
      const hours = parseInt(hoursStr);
      const minutes = parseInt(minutesStr);
      let hours24 = hours;
      if (data.period === "P.M." && hours !== 12) {
        hours24 += 12;
      } else if (data.period === "A.M." && hours === 12) {
        hours24 = 0;
      }

      const totalMinutes = hours24 * 60 + minutes;
      const isValidTime = totalMinutes >= 8 * 60 && totalMinutes <= 17 * 60;
      if (!isValidTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["reservationTime"],
          message: "Time must be between 8:00 AM and 5:00 PM",
        });
      }
    }

    if (data.selectedPackage) {
      const selectedPackage = cateringPackages.find(
        (pkg) => pkg._id === data.selectedPackage
      );
      let minimumGuestCount = selectedPackage?.minimumPax || 20;
      const allCategoriesHaveMenus = Object.values(data.selectedMenus).every(
        (categoryMenus) => Object.keys(categoryMenus).length > 0
      );

      if (data.guestCount < minimumGuestCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestCount"],
          message: `Guest count must be at least ${minimumGuestCount}`,
        });
      }

      if (!allCategoriesHaveMenus) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one menu item must be selected for each category",
          path: ["selectedMenus"],
        });
      }
    }
    if (data.guestCount < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: `Guest count must be at least 20 people`,
      });
    }
    if (data.guestCount > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: `Guest count must be at most 200 people`,
      });
    }
  });

export type ReservationValues = z.infer<typeof reservationSchema>;

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
};

export function useReservationForm() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  const reservationForm = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { watch, setValue } = reservationForm;
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = watch("selectedPackage");
  const reservationType = watch("reservationType");
  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");
  const selectedMenus = watch("selectedMenus");
  const guestCount = watch("guestCount") || 1;
  const serviceType = watch("serviceType");

  //This was formerly from BookNowForm.tsx which calculates the partial/total price of the reservation
  useEffect(() => {
    const isPackage = cateringPackages.find(
      (pkg) => pkg._id === selectedPackage
    );
    const calculateTotal = () => {
      let total = 0;

      // Iterate through each category (Soup, Beverage)
      Object.values(selectedMenus).forEach((category) => {
        // Iterate through each menu item in the category
        Object.values(category).forEach((item) => {
          total += item.quantity * item.pricePerPax;
        });
      });
      if (isPackage) {
        const serviceCharge =
          serviceType === "Plated" ? isPackage.serviceCharge : 0;
        setValue(
          "totalPrice",
          isPackage.pricePerPax * guestCount + (serviceCharge + deliveryFee)
        );
      } else {
        setValue("totalPrice", total + serviceFee + deliveryFee);
      }
    };
    calculateTotal();
  }, [selectedMenus, serviceFee, deliveryFee, guestCount]);

  //This was formerly from Package Selection, where if there is a selected package, it will assign the Menu Category but with a blank menu to trigger the zod validation which says "At least one menu item must be selected for each category"
  useEffect(() => {
    const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage);
    if (pkg) {
      // Update the form with the blank categories
      const selectedMenus = Object.fromEntries(
        pkg?.options.map((opt) => [opt.category, {}])
      );

      setValue("selectedMenus", selectedMenus);
      setValue("guestCount", pkg.minimumPax);
      setValue("eventType", pkg?.eventType ?? "No Event");
      setValue("reservationType", "event");
    }
  }, [selectedPackage]);

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    if (cateringOptions === "event" && selectedPackage === "" && step !== 0) {
      setShowPackageSelection(true);
    }
    if (cateringOptions === "custom" && step === 1) {
      return true;
    }
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await reservationForm.trigger(fieldsToValidate);
    return isValid;
  };

  //Find all menus (will transfer to the socket later on)
  // Socket-based dynamic menu fetcher

  const getAllMenus = async () => {
    try {
      const response = await api.get(`/menus`);
      return response.data.data;
    } catch (err) {
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message =
          err.response?.data.error || "Unexpected error occurred.";
        console.error("ERROR FETCHING MENU", message);
      } else {
        console.error("Something went wrong. Please try again.");
      }
      return null;
    }
  };

  const getMenuItem = async (menuId: string) => {
    try {
      const response = await api.get(`/menus/${menuId}`);
      return response.data.data;
    } catch (err) {
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message =
          err.response?.data.error || "Unexpected error occurred.";
        console.error("ERROR FETCHING MENU", message);
      } else {
        console.error("Something went wrong. Please try again.");
      }
      return null;
    }
  };

  ///Find all packages (will transfer to socket later on)
  const getPackageItem = (pkgId: string) => {
    const pkg = cateringPackages.find((item) => item._id === pkgId);
    return pkg;
  };

  // Submit form function
  const onSubmit = (data: ReservationValues) => {
    // Create menu item object
    const reservation: ReservationItem = {
      ...data,
    };
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return reservation;
  };

  const getFieldsToValidate = (
    step: number
  ): Array<keyof ReservationValues> => {
    switch (step) {
      case 0:
        return ["fullName", "email", "contactNumber"];
      case 1:
        return ["cateringOptions", "selectedPackage"];
      case 2:
        return ["selectedMenus"];
      case 3:
        if (reservationType === "event") {
          return [
            "eventType",
            "reservationDate",
            "reservationTime",
            "guestCount",
            "serviceType",
            "paymentReference",
          ];
        }
        if (reservationType === "personal") {
          return ["reservationDate", "paymentReference"];
        }
      default:
        return [];
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    field: any,
    category: PackageCategory,
    menu: MenuItem,
    count: number,
    price: number
  ) => {
    const currentSelection = field.value[category] || {};
    const updatedMenus: SelectedMenu = { ...currentSelection };
    const uniqueMenusSelected = Object.keys(updatedMenus).length;

    if (checked === true) {
      // Allow adding a new dish if under the limit
      if (uniqueMenusSelected < count) {
        updatedMenus[menu._id] = {
          quantity: 1,
          paxSelected: "4-6 pax",
          pricePerPax: price,
        }; // Set quantity to 1 when checked
      }
    } else {
      // Remove the dish completely when unchecked
      delete updatedMenus[menu._id];
    }

    const newMenus = {
      ...field.value,
      [category]: updatedMenus,
    };

    // // Optional: remove the category entirely if it's empty
    if (Object.keys(updatedMenus).length === 0 && selectedPackage.length < 0) {
      delete newMenus[category];
    }

    field.onChange(newMenus);
  };

  const handleReduceQuantity = (
    value: SelectedMenus,
    category: string,
    menu: string,
    onChange: (value: SelectedMenus) => void
  ) => {
    // Check if the category exists and get the count of menu items
    const currentCategory = value[category];
    const currentCount = currentCategory
      ? Object.keys(currentCategory).length
      : 0;

    // Proceed only if the category has menu items and the menu exists
    if (currentCount > 0 && currentCategory && currentCategory[menu]) {
      // Create updated category with the new quantity for the menu
      const updatedCategory: Record<string, MenuReservationDetails> = {
        ...currentCategory,
        [menu]: {
          ...currentCategory[menu],
          quantity: currentCategory[menu].quantity - 1,
        },
      };

      // Remove the menu if its quantity becomes 0
      if (updatedCategory[menu].quantity === 0) {
        delete updatedCategory[menu];
      }

      // If the category becomes empty, remove the category
      if (Object.keys(updatedCategory).length === 0) {
        const updatedFieldValue = { ...value };
        delete updatedFieldValue[category];
        onChange(updatedFieldValue);
      } else {
        onChange({
          ...value,
          [category]: updatedCategory,
        });
      }
    }
  };

  const handleAddQuantity = (
    value: SelectedMenus,
    category: string,
    menu: string,
    onChange: (value: SelectedMenus) => void
  ) => {
    // Get the current category, default to empty object if undefined
    const currentCategory = value[category] || {};

    // Get the current menu item, default to a new MenuReservationDetails if undefined
    const currentItem = currentCategory[menu] || {
      quantity: 0,
      paxSelected: "Adult", // Default value, adjust as needed
      pricePerPax: 0, // Default value, adjust as needed
    };

    // Create updated category with incremented quantity
    const updatedCategory: Record<string, MenuReservationDetails> = {
      ...currentCategory,
      [menu]: {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      },
    };

    // Update the value with the new category
    onChange({
      ...value,
      [category]: updatedCategory,
    });
  };

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
  };
}
