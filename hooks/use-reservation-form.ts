import { cateringPackages } from "~/lib/packages-metadata";
import { CategoryProps, MenuItem } from "~/types/menu-types";
import {
  EventType,
  PackageCategory,
  reservationEventTypes,
} from "~/types/package-types";
import {
  MenuReservationDetails,
  paxArray,
  PaxArrayType,
  ReservationItem,
  SelectedMenus,
} from "~/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
      .regex(/^\d{10}$/, "Contact Number must have exactly 10 digits"),
    reservationType: z.enum(["event", "personal"]),
    eventType: z.enum(reservationEventTypes as [EventType, ...EventType[]], {
      required_error: "Please select an Event Type",
    }),
    eventDate: z.date({
      required_error: "Please provide the Event Date",
    }),
    eventTime: z
      .string({ required_error: "Please provide the Event Time" })
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Please enter a valid time (HH:mm)"
      ),
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
    serviceHours: z.string().optional(),
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
  })
  .superRefine((data, ctx) => {
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
        message: `Guest count must be at least 20 persons`,
      });
    }
    if (data.guestCount > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: `Guest count must be at most 200 persons`,
      });
    }
  });

export type ReservationValues = z.infer<typeof reservationSchema>;

const defaultValues: ReservationValues = {
  fullName: "",
  email: "",
  contactNumber: "0",
  reservationType: "event",
  eventType: "Birthday",
  eventDate: new Date(),
  eventTime: "",
  guestCount: 0,
  venue: "",
  cateringOptions: "event",
  serviceType: "Buffet",
  serviceFee: 0,
  serviceHours: "",
  selectedPackage: "",
  selectedMenus: {} as Record<string, Record<string, MenuReservationDetails>>,
  totalPrice: 0,
  specialRequests: "",
  deliveryOption: "Pickup",
  deliveryFee: 0,
  deliveryAddress: "",
  deliveryInstructions: "",
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

  const { watch } = reservationForm;
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = watch("selectedPackage");
  const reservationType = watch("reservationType");
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
            "eventDate",
            "guestCount",
            "venue",
            "serviceType",
            "serviceHours",
          ];
        }
        if (reservationType === "personal") {
          return ["eventDate"];
        }
      default:
        return [];
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    field: any,
    category: CategoryProps,
    menu: MenuItem,
    count: number,
    price: number
  ) => {
    const currentSelection = field.value[category] || {};
    const updatedMenus: Record<
      string,
      {
        quantity: number;
        paxSelected: string;
        pricePerPax: number;
      }
    > = { ...currentSelection };
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

    // Optional: remove the category entirely if it's empty
    if (Object.keys(updatedMenus).length === 0) {
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
    onSubmit,
    isSubmitSuccess,
    handleCheckboxChange,
    showPackageSelection,
    setShowPackageSelection,
    handleReduceQuantity,
    handleAddQuantity,
  };
}
