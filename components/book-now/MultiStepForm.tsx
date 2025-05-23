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
import { cn } from "~/lib/utils";

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
    <View
      className={cn("flex-1 mx-auto w-full max-w-4xl", {
        "p-4 rounded-xl border bg-card": isReservationForm,
      })}
    >
      {isReservationForm && (
        <View ref={reservationRef} className="absolute top-0" />
      )}
      <View
        className={cn("px-6 pt-4 pb-2 bg-background", {
          "sticky top-0 z-10": !isReservationForm,
        })}
      >
        <View className="items-center mb-4">
          <Text
            className={cn(
              "font-bold",
              isReservationForm ? "mb-2 text-3xl" : "text-2xl"
            )}
          >
            {title}
          </Text>
          <Text
            className={cn("text-muted-foreground", {
              "text-sm": !isReservationForm,
            })}
          >
            {description}
          </Text>
        </View>
        {/* Mobile step indicator */}
        <View className="flex-col mb-2 space-y-2 sm:hidden">
          <Text className="text-sm text-muted-foreground">
            Step {formStep + 1} of {formSteps.length}
          </Text>
          <View className="flex-row gap-2 items-center mt-1">
            <View
              className={cn(
                "justify-center items-center w-8 h-8 rounded-full border-2 border-primary",
                {
                  "bg-primary": isSubmitComplete,
                }
              )}
            >
              {isSubmitComplete ? (
                <Check color="white" size={16} />
              ) : (
                <Text className="text-foreground">{formStep + 1}</Text>
              )}
            </View>
            <Text className="font-medium text-foreground">
              {formSteps[formStep].title}
            </Text>
          </View>
        </View>

        {/* Desktop step indicators */}
        <View className="hidden sm:flex-row sm:justify-between sm:items-start">
          {formSteps.map((step, index) => (
            <View key={step.id} className="flex-1 items-center">
              <View
                className={cn(
                  "rounded-full items-center justify-center mb-1 mt-22",
                  {
                    "bg-primary": index < formStep || isSubmitComplete,
                    "border-2 border-primary": index === formStep,
                    "border-2 border-muted": index > formStep,
                    "w-9 h-9": isReservationForm,
                    "w-7 h-7": !isReservationForm,
                  }
                )}
              >
                {index < formStep ? (
                  <Check size={checkSizing} color="white" />
                ) : isSubmitComplete ? (
                  <Check size={checkSizing} color="white" />
                ) : (
                  <Text className="text-xs text-foreground">{index + 1}</Text>
                )}
              </View>
              <Text
                className={cn("px-1 text-xs font-medium text-center min-h-8", {
                  "text-primary": index <= formStep || isSubmitComplete,
                  "text-muted-foreground": index > formStep,
                  "lg:text-sm": isReservationForm,
                })}
                numberOfLines={2}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Progress bar */}
        <View className="relative mt-2 mb-4">
          <View className="absolute top-0 right-0 left-0 h-1 bg-muted">
            <Progress
              value={
                isSubmitComplete ? 100 : (formStep / formSteps.length) * 100
              }
              className="h-full"
            />
          </View>
        </View>

        <View className="overflow-hidden flex-1">
          <ScrollView className="flex-1 py-4">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-4">
                <CardTitle className="text-lg">
                  {!isSubmitComplete && formSteps[formStep].title}
                </CardTitle>
                <CardDescription>
                  {!isSubmitComplete && formSteps[formStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-16">
                {children[formStep]}
              </CardContent>
            </Card>
          </ScrollView>

          <View className="sticky bottom-0 px-6 pt-2 pb-6 border-t bg-background">
            <View className="flex-row justify-between mt-2">
              {isSubmitComplete ? (
                <Button className="ml-auto" onPress={completeForm}>
                  <Text suppressHighlighting className="text-foreground">
                    {doneButtonText}
                  </Text>
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onPress={onCancel}
                    className="hover:bg-destructive hover:text-background"
                  >
                    <Text className="text-foreground" suppressHighlighting>
                      {cancelButtonText}
                    </Text>
                  </Button>
                  <View className="flex-row gap-2">
                    {formStep > 0 && (
                      <Button variant="secondary" onPress={prevStep}>
                        <Text className="text-foreground" suppressHighlighting>
                          {previousButtonText}
                        </Text>
                      </Button>
                    )}
                    {formStep < formSteps.length - 1 ? (
                      <Button
                        onPress={nextStep}
                        disabled={isNextButtonDisabled}
                      >
                        <Text suppressHighlighting>{nextButtonText}</Text>
                      </Button>
                    ) : (
                      <Button onPress={submitForm}>
                        <Text suppressHighlighting>{submitButtonText}</Text>
                      </Button>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
