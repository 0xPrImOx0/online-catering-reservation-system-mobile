import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react-native";
import { Progress } from "~/components/ui/progress";
import MultiStepForm from "~/components/book-now/MultiStepForm";
import { FormStepType } from "~/types/package-types";
import {
  cateringPackages,
  eventPackageFormSteps,
} from "~/lib/packages-metadata";
import CustomerInformation from "~/components/book-now/CustomerInformation";
import PackageSelection from "~/components/book-now/PackageSelection";
import CategoryOptions from "~/components/book-now/CategoryOptions";
import ReservationDetails from "~/components/book-now/ReservationDetails";
import SummaryBooking from "~/components/book-now/SummaryBooking";
import { useReservationForm } from "~/hooks/use-reservation-form";
import { Link, router, useLocalSearchParams } from "expo-router";
import { menuItems } from "~/lib/menu-lists";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

export default function BookNow() {
  const {
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
    getMenuItem,
  } = useReservationForm();

  const { id } = useLocalSearchParams();
  const deconstructedId = id && id[0];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nextPageCount, setNextPageCount] = useState(0);
  const { watch, setValue } = reservationForm;

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
      if (nextPageCount < 2) {
        setCurrentStep(currentStep + 2);
      } else {
        setCurrentStep(currentStep + 1);
      }
      setNextPageCount((prev) => prev + 1);
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

  useEffect(() => {
    const isMenu = getMenuItem(deconstructedId);
    const isPackage = cateringPackages.some(
      (pkg) => pkg._id === deconstructedId
    );

    if (deconstructedId) {
      if (isMenu) {
        const prev = watch("selectedMenus") || {};
        setValue("cateringOptions", "custom");
        setValue("selectedMenus", {
          ...prev,
          [isMenu.category]: {
            ...(prev?.[isMenu.category] || {}),
            [deconstructedId]: {
              quantity: 1,
              paxSelected: "4-6 pax",
              pricePerPax: isMenu.prices[0].price,
            },
          },
        });
      }
      if (isPackage) {
        setValue("cateringOptions", "event");
        setValue("selectedPackage", deconstructedId);
        setShowPackageSelection(true);
        return;
      }
    }
  }, [id, deconstructedId]);

  const reservationFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
    />,
    <CategoryOptions key={"category-options"} />, //validateStep={validateStep}
    <ReservationDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const formContent = (
    <FormProvider {...reservationForm}>
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
    </FormProvider>
  );
  return (
    <View className="bg-black">
      {formContent}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Request Sent!</DialogTitle>
            <DialogDescription>
              Thank you for your reservation request. Our caterer will call you
              within 1 hour to discuss the details and provide you with a quote.
            </DialogDescription>
          </DialogHeader>
          <View className="flex justify-center items-center py-4">
            <View className="p-3 bg-green-500 rounded-full">
              <Check className="text-foreground size-10" />
            </View>
          </View>
          <DialogFooter>
            <Button
              variant={"ghost"}
              onPress={() => setShowConfirmation(false)}
            >
              <Text className="text-center text-foreground">Close</Text>
            </Button>
            <Button
              variant={"default"}
              onPress={() => setShowConfirmation(false)}
              asChild
            >
              <Link href={"/home"} onPress={() => setShowConfirmation(false)}>
                Go to home
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
