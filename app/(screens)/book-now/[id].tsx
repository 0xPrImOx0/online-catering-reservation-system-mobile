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

  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    if (isValid && dynamicNextBtn === "Next") {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0 && dynamicPreviousBtn === "Previous") {
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
    async function fetchMenuOrPackage() {
      const menu = await getMenuItem(id as string);
      const isPackage = cateringPackages.some((pkg) => pkg._id === id);

      if (id) {
        if (menu) {
          const prev = watch("selectedMenus") || {};
          setValue("cateringOptions", "custom");
          setValue("selectedMenus", {
            ...prev,
            [menu.category]: {
              ...(prev?.[menu.category] || {}),
              [id as string]: {
                quantity: 1,
                paxSelected: "4-6 pax",
                pricePerPax: menu.prices[0].price,
              },
            },
          });
        }
        if (isPackage) {
          setValue("cateringOptions", "event");
          setValue("selectedPackage", id as string);
          setShowPackageSelection(true);
          return;
        }
      }
    }
    fetchMenuOrPackage();
  }, [id]);

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
