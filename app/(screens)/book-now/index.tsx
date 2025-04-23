import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react-native";
import { Progress } from "~/components/ui/progress";
import MultiStepForm from "~/components/book-now/MultiStepForm";
import { FormStepType } from "~/types/package-types";
import { eventPackageFormSteps } from "~/libs/packages-metadata";
import CustomerInformation from "~/components/book-now/CustomerInformation";
import PackageSelection from "~/components/book-now/PackageSelection";
import CategoryOptions from "~/components/book-now/CategoryOptions";
import EventDetails from "~/components/book-now/EventDetails";
import SummaryBooking from "~/components/book-now/SummaryBooking";
import { useReservationForm } from "~/hooks/use-reservation-form";
import { router } from "expo-router";
import { menuItems } from "~/libs/menu-lists";

export default function BookNow() {
  const {
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
  } = useReservationForm();

  const { watch } = reservationForm;

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nextPageCount, setNextPageCount] = useState(0);

  const { setValue } = reservationForm;
  // const deconstructedId = id && id[0];
  const cateringOptions = watch("cateringOptions");
  const dynamicPreviousBtn =
    showPackageSelection && currentStep === 1
      ? "Change Catering Options"
      : "Previous";
  const dynamicNextBtn =
    cateringOptions === "custom" || currentStep !== 1
      ? "Next"
      : !showPackageSelection
      ? "Choose a Package"
      : "Next";

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = eventPackageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      // if (pathname === `/book-now/${id}` && nextPageCount < 2) {
      //   setCurrentStep(currentStep + 2);
      // } else {
      setCurrentStep(currentStep + 1);
      // setNextPageCount((prev) => prev + 1);
    }
    return isValid;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    router.back();
  };

  // Handle form submission
  const handleSubmit = () => {
    setShowConfirmation(true);
    reservationForm.handleSubmit((data) => {
      onSubmit(data);
      setIsSubmitComplete(true);
    })();
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // useEffect(() => {
  //   const isMenu = menuItems.find((pkg) => pkg._id === deconstructedId);
  //   const isPackage = cateringPackages.some(
  //     (pkg) => pkg._id === deconstructedId
  //   );
  //   if (deconstructedId) {
  //     if (isMenu) {
  //       setValue("cateringOptions", "custom");
  //       setValue("selectedMenus", {
  //         [isMenu.category]: {
  //           [deconstructedId]: {
  //             quantity: 1,
  //             paxSelected: "4-6 pax",
  //             pricePerPax: isMenu.prices[0].price,
  //           },
  //         },
  //       });
  //       return;
  //     }
  //     if (isPackage) {
  //       setValue("cateringOptions", "event");
  //       setValue("selectedPackage", deconstructedId);
  //       setShowPackageSelection(true);
  //       return;
  //     }
  //   }
  // }, [id, deconstructedId, setValue]);

  // const serviceFee = watch("serviceFee");
  // const selectedPackage = watch("selectedPackage");
  // const deliveryFee = watch("deliveryFee");
  // const selectedMenus = watch("selectedMenus");
  // const guestCount = watch("guestCount") || 1;

  // useEffect(() => {
  //   const isPackage = cateringPackages.find(
  //     (pkg) => pkg._id === selectedPackage
  //   );
  //   const calculateTotal = () => {
  //     let total = 0;

  //     // Iterate through each category (Soup, Beverage)
  //     Object.values(selectedMenus).forEach((category) => {
  //       // Iterate through each menu item in the category
  //       Object.values(category).forEach((item) => {
  //         total += item.quantity * item.pricePerPax;
  //       });
  //     });
  //     setValue("totalPrice", total + serviceFee + deliveryFee);
  //   };
  //   if (isPackage) {
  //     setValue(
  //       "totalPrice",
  //       isPackage.pricePerPax * guestCount +
  //         isPackage.serviceCharge +
  //         deliveryFee
  //     );
  //   }
  //   calculateTotal();
  // }, [selectedMenus, serviceFee, deliveryFee, guestCount]);

  const reservationFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection key={"package-selection"} />, // showPackageSelection={showPackageSelection}
    <CategoryOptions key={"category-options"} />, //validateStep={validateStep}
    <EventDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const formContent = (
    <View {...reservationForm} className="bg-black">
      <MultiStepForm
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onPrevStep={handlePreviousStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        nextButtonText={dynamicNextBtn}
        previousButtonText={dynamicPreviousBtn}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
        isReservationForm
        setShowPackageSelection={setShowPackageSelection}
      >
        {reservationFormComponents}
      </MultiStepForm>
    </View>
  );
  return (
    <View className="bg-black">
      {formContent}
      {/* <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Request Sent!</DialogTitle>
            <DialogDescription>
              Thank you for your reservation request. Our caterer will call you
              within 1 hour to discuss the details and provide you with a quote.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="p-3 bg-green-500 rounded-full">
              <Check className="text-white size-10" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={"ghost"}
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </Button>
            <Button
              variant={"default"}
              onClick={() => setShowConfirmation(false)}
              asChild
            >
              <Link href={"/"}>Go to home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </View>
  );
}
