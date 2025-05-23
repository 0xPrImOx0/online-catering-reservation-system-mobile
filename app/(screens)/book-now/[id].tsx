import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react-native";
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
import { useAuthContext } from "~/context/AuthContext";

export default function BookNow() {
  const {
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
    getMenuItem,
    cateringOptions,
    setCateringOptions,
    isCategoryError,
    setIsCategoryError,
  } = useReservationForm();

  const { customer } = useAuthContext();

  const { id } = useLocalSearchParams();

  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { watch, setValue } = reservationForm;

  useEffect(() => {
    if (customer) {
      const { fullName, email, contactNumber } = customer;

      // if fullname, email, and contactNumber do have values then step should direct to step 2
      if (fullName && email && contactNumber) setCurrentStep(1);
      return;
    }

    return setCurrentStep(0);
  }, [customer]);

  const [previousBtn, setPreviousBtn] = useState<string>(
    showPackageSelection && currentStep === 1
      ? "Change Catering Options"
      : "Previous"
  );
  const [nextBtn, setNextBtn] = useState<string>(
    cateringOptions === "menus" || currentStep !== 1
      ? "Next"
      : !showPackageSelection
      ? "Choose a Package"
      : "Next"
  );

  useEffect(() => {
    setPreviousBtn(
      showPackageSelection && currentStep === 1
        ? "Change Catering Options"
        : "Previous"
    );
    setNextBtn(
      cateringOptions === "menus" || currentStep !== 1
        ? "Next"
        : !showPackageSelection
        ? "Choose a Package"
        : "Next"
    );
  }, [showPackageSelection, currentStep, cateringOptions]);

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = eventPackageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    if (!isCategoryError) {
      const isValid = await validateStep(currentStep);

      if (isValid && nextBtn === "Next") {
        setCurrentStep(currentStep + 1);
      }
      return isValid;
    }
    return false;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0 && previousBtn === "Previous") {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  };
  // Add a handleCancel function:
  const handleCancel = () => {
    router.push("/home");
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = reservationForm.getValues();
    const isSuccess = await onSubmit(data);

    if (!isSuccess) {
      //  toast.error("Submission Failed");
      return;
    }

    setIsSubmitComplete(true);
    setShowConfirmation(true);
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setCurrentStep(0);
    setIsSubmitComplete(false);
    router.push("/home");
  };

  useEffect(() => {
    if (currentStep !== 2 || cateringOptions === "menus") {
      setIsCategoryError(false);
    }
  }, [currentStep, cateringOptions]);

  useEffect(() => {
    if (id && id !== "0") {
      const fetchMenuOrPackage = async () => {
        const menu = await getMenuItem(id as string);
        const isPackage = cateringPackages.some((pkg) => pkg._id === id);

        if (menu) {
          const prev = watch("selectedMenus") || {};
          setCateringOptions("menus");
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
          setCateringOptions("packages");
          setValue("selectedPackage", id as string);
          setShowPackageSelection(true);
          return;
        }
      };
      fetchMenuOrPackage();
    }
  }, [id]);

  const reservationFormStepComponents = [
    <CustomerInformation key={"customer-information"} />, // Already Fixed
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
      cateringOptions={cateringOptions}
      setCateringOptions={setCateringOptions}
    />,
    <CategoryOptions
      key={"category-options"}
      setIsCategoryError={setIsCategoryError}
      cateringOptions={cateringOptions}
    />,
    <ReservationDetails key={"reservation-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];
  const formContent = (
    <FormProvider {...reservationForm}>
      <MultiStepForm
        title={"Reserve Your Catering Service"}
        description={"Complete the form below to book your event"}
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onPrevStep={handlePreviousStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        nextButtonText={nextBtn}
        previousButtonText={previousBtn}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Go to Home"
        isReservationForm
        setShowPackageSelection={setShowPackageSelection}
        isCategoryError={isCategoryError}
      >
        {reservationFormStepComponents}
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
