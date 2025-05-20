// ReservationStep.tsx — Handles reservation steps including "Next" functionality

"use client";

import React, { useState } from "react";
import { useReservationForm } from "~/hooks/use-reservation-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import SummaryStep from "./summary";

const steps = [
  "Customer Info",
  "Event Details",
  "Menu Selection",
  "Review Selection",
  "Summary",
];

const ReservationStep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formHook = useReservationForm();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 formHook={formHook} />;
      case 1:
        return <Step2 formHook={formHook} />;
      case 2:
        return <Step3 formHook={formHook} />;
      case 3:
        return <Step4 formHook={formHook} />;
      case 4:
        return (
          <SummaryStep
            reservation={formHook.getValues()}
            menus={formHook.menusMap} // You must provide this from context or props
            selectedPackage={formHook.selectedPackage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservation Form</h1>
        <p className="text-gray-500">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow-md mb-6">{renderStep()}</div>

      <div className="flex justify-between">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        <button
          onClick={nextStep}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 2 ? "Review" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ReservationStep;
