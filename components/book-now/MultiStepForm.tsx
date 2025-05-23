import { View, Text, ScrollView } from "react-native";
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
  title,
  description,
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
  isCategoryError = false,
}: MultiStepFormProps) {
  const [formStep, setFormStep] = useState<number>(initialStep || 0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);
  const reservationRef = useRef(null);
  const checkSizing = isReservationForm ? 24 : 16;

  // Function to go to next form step
  const nextStep = async () => {
    // If validation function is provided, use it
    if (onNextStep) {
      const isValid = await onNextStep(formStep);

      if (nextButtonText === "Choose a Package" && setShowPackageSelection) {
        setShowPackageSelection(true);
        setFormStep(formStep);
        return;
      }

      if (isValid) {
        setFormStep(formStep + 1);
      }
    } else {
      // Otherwise just go to next step
      setFormStep(formStep + 1);
    }
    if (formStep < formSteps.length - 1) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  };

  // Function to go to previous form step
  const prevStep = () => {
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
    <View className="px-4 h-full bg-black">
      <View className="justify-center items-center pt-3 mb-4">
        <Text className="mb-2 text-3xl font-bold text-center text-foreground">
          {title}
        </Text>
        <Text className="text-muted-foreground">{description}</Text>
      </View>

      <View className="flex flex-col gap-2 mb-2 sm:hidden">
        <Text className="text text-muted-foreground">
          Step {formStep + 1} of {formSteps.length}
        </Text>

        <View className="flex-row gap-2 items-center mt-1">
          <View
            className={`items-center justify-center w-10 h-10 text-center  border-2 rounded-full border-primary ${
              isSubmitComplete && "bg-primary text-primary-foreground"
            }`}
          >
            <Text className="text-foreground">
              {isSubmitComplete ? <Check className="w-4 h-4" /> : formStep + 1}{" "}
            </Text>
          </View>

          <Text className="text-2xl font-medium text-foreground">
            {formSteps[formStep].title}
          </Text>
        </View>
      </View>

      <View className="relative mt-2 mb-4">
        <View className="absolute top-0 right-0 left-0 h-1 bg-muted">
          <Progress
            value={isSubmitComplete ? 100 : (formStep / formSteps.length) * 100}
          />
        </View>
      </View>

      <View className="flex overflow-hidden flex-col flex-1">
        <View className="overflow-y-auto flex-1 py-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-4">
              <CardTitle className="flex text-lg">
                {!isSubmitComplete && formSteps[formStep].title}
              </CardTitle>

              <CardDescription>
                {formSteps[formStep].description}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-16 h-full">
              {children[formStep]}
            </CardContent>
          </Card>
        </View>

        <View className="sticky bottom-0 pt-2 pb-6 border-t bg-background md:py-2">
          <View className="flex justify-between mt-2">
            {isSubmitComplete ? (
              <Button className="ml-auto" onPress={completeForm}>
                <Text suppressHighlighting>{doneButtonText}</Text>
              </Button>
            ) : (
              <View className="flex-row justify-between items-center">
                <Button
                  variant="outline"
                  onPress={onCancel}
                  className="hover:bg-destructive hover:text-background"
                >
                  <Text className="text-foreground" suppressHighlighting>
                    {cancelButtonText}{" "}
                  </Text>
                </Button>

                <View className="flex-row gap-2">
                  {formStep > 0 && (
                    <Button variant="secondary" onPress={prevStep}>
                      <Text suppressHighlighting className="text-foreground">
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
