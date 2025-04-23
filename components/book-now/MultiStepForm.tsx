import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Check } from "lucide-react-native";
import { Progress } from "~/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { MultiStepFormProps } from "~/types/component-types";

export default function MultiStepForm({
  formSteps,
  children,
  onSubmit,
  onNextStep,
  onPrevStep,
  onComplete,
  onCancel,
  initialStep,
  isSubmitComplete = false,
  submitButtonText = "Submit",
  nextButtonText = "Next",
  previousButtonText = "Previous",
  doneButtonText = "Done",
  cancelButtonText = "Cancel",
  isReservationForm = false,
  setShowPackageSelection, // Default steps for demonstration
}: MultiStepFormProps) {
  const [formStep, setFormStep] = useState<number>(initialStep || 0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);
  const reservationRef = useRef<HTMLDivElement>(null);
  const checkSizing = isReservationForm ? 24 : 16;

  // Function to go to next form step
  const nextStep = async () => {
    if (formStep < formSteps.length - 1) {
      setIsNextButtonDisabled(true);
      // If validation function is provided, use it
      if (onNextStep) {
        const isValid = await onNextStep(formStep);
        if (isValid) {
          setFormStep(formStep + 1);
        }
      } else {
        // Otherwise just go to next step
        setFormStep(formStep + 1);
      }
    }
    setIsNextButtonDisabled(false);
  };

  // Function to go to previous form step
  const prevStep = () => {
    reservationRef.current?.scrollIntoView({ behavior: "smooth" });
    if (previousButtonText === "Change Catering Options") {
      setFormStep(1);
      setShowPackageSelection?.(false);
      return;
    }
    if (onPrevStep && isReservationForm) {
      const isValid = onPrevStep(formStep);
      if (isValid) {
        setFormStep(formStep - 1);
      }
    }
    setFormStep(formStep - 1);
  };

  // Function to submit the form
  const submitForm = () => {
    onSubmit();
  };

  // Function to complete the form process
  const completeForm = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <View className="h-full px-4 bg-black">
      <View className="items-center justify-center pt-3 mb-4">
        <Text className="mb-2 text-3xl font-bold text-center text-white">
          Reserve Your Catering Service
        </Text>
        <Text className="text-muted-foreground">
          Complete the form below to book your event
        </Text>
      </View>
      <View className="flex flex-col gap-2 mb-2 sm:hidden">
        <Text className="text text-muted-foreground">
          Step {formStep + 1} of {formSteps.length}
        </Text>
        <View className="flex-row items-center gap-2 mt-1">
          <View
            className={`items-center justify-center w-10 h-10 text-center  border-2 rounded-full border-primary ${
              isSubmitComplete && "bg-primary text-primary-foreground"
            }`}
          >
            <Text className="text-white">
              {isSubmitComplete ? <Check className="w-4 h-4" /> : formStep + 1}
            </Text>
          </View>
          <Text className="text-2xl font-medium text-white">
            {formSteps[formStep].title}
          </Text>
        </View>
      </View>

      <View className="relative mt-2 mb-4">
        <View className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <Progress
            value={isSubmitComplete ? 100 : (formStep / formSteps.length) * 100}
          />
        </View>
      </View>

      <View className="flex flex-col flex-1 overflow-hidden">
        <View className="flex-1 py-4 overflow-y-auto">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-4">
              <CardTitle className="flex text-lg">
                {!isSubmitComplete && formSteps[formStep].title}
              </CardTitle>
              <CardDescription>
                {formSteps[formStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full px-0 pb-16">
              {children[formStep]}
            </CardContent>
          </Card>
        </View>

        <View className="sticky bottom-0 pt-2 pb-6 border-t bg-background md:py-2 ">
          <View className="flex justify-between mt-2">
            {isSubmitComplete ? (
              <Button className="ml-auto" onPress={completeForm}>
                <Text suppressHighlighting>{doneButtonText}</Text>
              </Button>
            ) : (
              <View className="flex-row items-center justify-between ">
                <Button
                  variant="outline"
                  onPress={onCancel}
                  className="hover:bg-destructive hover:text-background"
                >
                  <Text className="text-white" suppressHighlighting>
                    {cancelButtonText}
                  </Text>
                </Button>
                <View className="flex-row gap-2">
                  {formStep > 0 && (
                    <Button variant="secondary" onPress={prevStep}>
                      <Text suppressHighlighting className="text-white">
                        {previousButtonText}
                      </Text>
                    </Button>
                  )}
                  {formStep < formSteps.length - 1 ? (
                    <Button onPress={nextStep} disabled={isNextButtonDisabled}>
                      <Text suppressHighlighting>{nextButtonText}</Text>
                    </Button>
                  ) : (
                    <Button onPress={submitForm}>
                      <Text suppressHighlighting>{submitButtonText}</Text>
                    </Button>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
