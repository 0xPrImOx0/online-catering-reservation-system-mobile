import { cateringPackages } from "~/lib/packages-metadata";
import { menuItems } from "~/lib/menu-lists";
import { MenuItem } from "~/types/menu-types";
import { hoursArray, PackageCategory } from "~/types/package-types";
import {
  HoursArrayTypes,
  MenuReservationDetails,
  paxArray,
  PaxArrayType,
  CateringPackagesProps,
  reservationEventTypes,
  SelectedMenu,
  SelectedMenus,
  ReservationEventTypes,
} from "~/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import api from "~/lib/axiosInstance";
import axios from "axios";

import * as z from "zod";
import { useAuthContext } from "~/context/AuthContext";

// Helper to convert “hh:mm AM/PM” → minutes since midnight
const timeToMinutes = (time: string) => {
  const [, hh, mm, period] = time.match(
    /(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)/i
  )!;
  let hours = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);
  if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

// Reservation Schema for Zod
const reservationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must not exceed 50 characters"),

  email: z.string().email("Please enter a valid email address"),

  contactNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with 9 and have 10 digits total",
    }),
  eventType: z.enum(reservationEventTypes, {
    required_error: "Please select an Event Type",
  }),
  reservationDate: z.date({
    required_error: "Please provide the Event Date",
  }),
  reservationTime: z
    .string({
      required_error: "Please provide the Event Time",
    })
    .refine(
      (time) => {
        // 1. Format check
        const timePattern = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/i;
        if (!timePattern.test(time)) return false;

        // 2. Range check: 08:00 AM (480 mins) to 05:00 PM (17*60 = 1020 mins)
        const mins = timeToMinutes(time);
        return mins >= 8 * 60 && mins <= 17 * 60;
      },
      {
        message: "Food Sentinel is only open from 8:00 AM to 5:00 PM.",
      }
    ),
  guestCount: z.number({
    required_error: "Please provide the Guest Count",
  }),
  venue: z
    .string()
    .min(3, "Venue must be at least 3 characters")
    .max(100, "Venue must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  serviceType: z.enum(["Buffet", "Plated"], {
    required_error: "Please select a Service Type",
  }),
  serviceFee: z.number(),
  serviceHours: z
    .enum(hoursArray as [HoursArrayTypes, ...HoursArrayTypes[]])
    .optional(),
  selectedPackage: z.string().optional(),
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
    .max(300, "Special Requests must not exceed 500 characters")
    .optional(),
  orderType: z.enum(["Pickup", "Delivery", ""], {
    required_error: "Please select an Order Type",
  }),
  deliveryFee: z.number(),
  deliveryAddress: z
    .string()
    .min(1, "Delivery address is required")
    .max(200, "Delivery address must not exceed 200 characters")
    .optional()
    .or(z.literal("")), // Accepts empty string too if you want it considered "unset"
  deliveryInstructions: z
    .string()
    .max(300, "Delivery Instructions must not exceed 300 characters")
    .optional(),
  // paymentReference: z
  //   .string()
  //   .min(1, "Payment Reference is required")
  //   .max(100, "Payment Reference must not exceed 100 characters")
  //   .optional(),
  // status: z.enum(
  //   reservationStatusArray as [
  //     ReservationStatusType,
  //     ...ReservationStatusType[]
  //   ]
  // ),
});

export type ReservationValues = z.infer<typeof reservationSchema>;

export function useReservationForm() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [cateringPackages, setCateringPackages] = useState<
    CateringPackagesProps[] | null
  >(null);

  const refinedSchema = reservationSchema.superRefine((data, ctx) => {
    if (
      data.orderType === "Delivery" &&
      (!data.deliveryAddress || data.deliveryAddress.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deliveryAddress"],
        message: "Delivery address is required when order type is Delivery",
      });
    }

    if (
      data.serviceType === "Plated" &&
      (!data.venue || data.venue.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["venue"],
        message: "Venue is required when service type is Plated",
      });
    }

    if (
      data.serviceType === "Plated" &&
      (!data.serviceHours || data.serviceHours.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["serviceHours"],
        message: "Service hours is required when service type is Plated",
      });
    }

    if (data.selectedPackage) {
      if (!cateringPackages) return;
      const selectedPackage = cateringPackages.find(
        (pkg) => pkg._id === data.selectedPackage
      );

      const minimumGuestCount = selectedPackage?.minimumPax || 20;
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

  useEffect(() => {
    const getCateringPackages = async () => {
      try {
        const response = await api.get("/packages");
        setCateringPackages(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING PACKAGES", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getCateringPackages();
  }, []);

  const { customer } = useAuthContext();

  const defaultValues: ReservationValues = {
    fullName: customer?.fullName || "",
    email: customer?.email || "",
    contactNumber: customer?.contactNumber || "",
    eventType: "Others",
    reservationDate: new Date(),
    reservationTime: "08:00 AM",
    guestCount: 20,
    venue: "",
    serviceType: "Buffet",
    serviceFee: 0,
    serviceHours: "4 hours",
    selectedPackage: "",
    selectedMenus: {},
    totalPrice: 0,
    specialRequests: "",
    orderType: "Pickup",
    deliveryFee: 0,
    deliveryAddress: "",
    deliveryInstructions: "",
    // paymentReference: "",
    // status: "Pending",
  };

  const reservationForm = useForm<ReservationValues>({
    resolver: zodResolver(refinedSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (customer) {
      reservationForm.setValue("fullName", customer.fullName || "");
      reservationForm.setValue("email", customer.email || "");
      reservationForm.setValue("contactNumber", customer.contactNumber || "");
    }
  }, [customer, reservationForm]);

  type OrderType = "Pickup" | "Delivery" | "";

  const { watch, setValue } = reservationForm;
  const [cateringOptions, setCateringOptions] = useState<"packages" | "menus">(
    "packages"
  );

  const selectedPackage = watch("selectedPackage");
  const serviceFee = watch("serviceFee");
  const selectedMenus = watch("selectedMenus");
  const guestCount = watch("guestCount") || 1;
  const serviceType = watch("serviceType");
  const deliveryFee = watch("deliveryFee");
  const deliveryAddress = watch("deliveryAddress");
  const deliveryInstructions = watch("deliveryInstructions");
  const orderType = watch("orderType") as OrderType;

  //This was formerly from BookNowForm.tsx which calculates the partial/total price of the reservation
  useEffect(() => {
    if (!cateringPackages) return;

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
  }, [
    selectedMenus,
    serviceFee,
    deliveryFee,
    guestCount,
    selectedPackage,
    serviceType,
    setValue,
    orderType,
  ]);

  //This was formerly from Package Selection, where if there is a selected package, it will assign the Menu Category but with a blank menu to trigger the zod validation which says "At least one menu item must be selected for each category"
  useEffect(() => {
    if (!cateringPackages) return;

    const isValidEventType = (value: string): value is ReservationEventTypes =>
      reservationEventTypes.includes(value as ReservationEventTypes);

    const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage);
    if (pkg) {
      // Update the form with the blank categories
      const selectedMenus = Object.fromEntries(
        pkg?.options.map((opt) => [opt.category, {}])
      );

      setValue("selectedMenus", selectedMenus);
      setValue("guestCount", pkg.minimumPax);
      if (pkg.eventType && isValidEventType(pkg.eventType)) {
        setValue("eventType", pkg.eventType);
      } else {
        setValue("eventType", "Others");
      }
    }
  }, [selectedPackage]);

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    if (
      cateringOptions === "packages" &&
      selectedPackage === "" &&
      step !== 0
    ) {
      setShowPackageSelection(true);
    }
    if (cateringOptions === "menus" && step === 1) {
      return true;
    }
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await reservationForm.trigger(fieldsToValidate);
    return isValid;
  };

  //Find all menus (will transfer to the socket later on)
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
  const getPackageItem = async (pkgId: string) => {
    try {
      const response = await api.get(`/packages/${pkgId}`);
      return response.data.data;
    } catch (err: unknown) {
      console.log("ERRRORRR", err);

      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";

        console.error("ERROR FETCHING PACKAGES", message);
      } else {
        console.error("Something went wrong. Please try again.");
      }
    }
  };

  const [deliveryInformation, setDeliveryInformation] = useState({
    orderType: "" as OrderType,
    deliveryFee: 0,
    deliveryAddress: "",
    deliveryInstructions: "",
  });

  useEffect(() => {
    if (serviceType === "Plated") {
      // Save current values BEFORE clearing them
      setDeliveryInformation({
        orderType: orderType,
        deliveryFee: deliveryFee,
        deliveryAddress: deliveryAddress || "",
        deliveryInstructions: deliveryInstructions || "",
      });

      // Clear delivery-related values
      setValue("orderType", "");
      setValue("deliveryFee", 0);
      setValue("deliveryAddress", "");
      setValue("deliveryInstructions", "");
    } else {
      // Restore previously saved values
      setValue("orderType", deliveryInformation.orderType || "Pickup");
      setValue("deliveryFee", deliveryInformation.deliveryFee);
      setValue("deliveryAddress", deliveryInformation.deliveryAddress);
      setValue(
        "deliveryInstructions",
        deliveryInformation.deliveryInstructions
      );
    }
  }, [serviceType]);

  useEffect(() => {
    if (orderType === "Pickup") {
      // Save current values BEFORE clearing them
      setDeliveryInformation({
        orderType: orderType,
        deliveryFee: deliveryFee,
        deliveryAddress: deliveryAddress || "",
        deliveryInstructions: deliveryInstructions || "",
      });

      // Clear delivery-related values
      setValue("deliveryFee", 0);
      setValue("deliveryAddress", "");
      setValue("deliveryInstructions", "");
    } else {
      // Restore previously saved values
      setValue("deliveryFee", 300);
      setValue("deliveryAddress", deliveryInformation.deliveryAddress);
      setValue(
        "deliveryInstructions",
        deliveryInformation.deliveryInstructions
      );
    }
  }, [orderType]);

  // Submit form function
  const onSubmit = async (data: ReservationValues) => {
    console.log("DATA AFTER SUBMITTING RESERVATION", data);

    let isSuccess = false;

    // Remove selectedPackage if it's empty this is to prevent object id error
    if (data.selectedPackage === "") {
      delete data.selectedPackage;
    }

    try {
      const response = await api.post("/reservations", data);
      // toast.success("Reservation booked successfully");

      isSuccess = true;
      setIsSubmitSuccess(true);
      console.log("LOG RESPONSE AFTER SUBMITTING", response.data);
    } catch (err: unknown) {
      isSuccess = false;
      console.log("ERRORRRR", err);
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        // toast.error(message);
      } else {
        // toast.error("Something went wrong. Please try again.");
      }
    }

    return isSuccess;
  };

  const getFieldsToValidate = (
    step: number
  ): Array<keyof ReservationValues> => {
    switch (step) {
      case 0:
        return ["fullName", "email", "contactNumber"];
      case 1:
        return ["selectedPackage"];
      case 2:
        return ["selectedMenus"];
      case 3:
        return [
          "eventType",
          "deliveryAddress",
          "reservationDate",
          "reservationTime",
          "guestCount",
          "serviceType",
          "serviceHours",
        ];
      default:
        return [];
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    field: ControllerRenderProps<ReservationValues, "selectedMenus">,
    category: PackageCategory,
    menu: MenuItem,
    count: number,
    price: number
  ) => {
    const currentSelection = field.value[category] || {};
    const updatedMenus: SelectedMenu = { ...currentSelection };
    const uniqueMenusSelected = Object.keys(updatedMenus).length;
    if (!menu._id) {
      return;
    }

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
    if (
      Object.keys(updatedMenus).length === 0 &&
      selectedPackage !== undefined &&
      selectedPackage.length < 0
    ) {
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
    cateringOptions,
    setCateringOptions,
    reservationForm,
    validateStep,
    getMenuItem,
    getPackageItem,
    cateringPackages,
    onSubmit,
    isSubmitSuccess,
    handleCheckboxChange,
    showPackageSelection,
    setShowPackageSelection,
    handleReduceQuantity,
    handleAddQuantity,
    getAllMenus,
    isCategoryError,
    setIsCategoryError,
  };
}
