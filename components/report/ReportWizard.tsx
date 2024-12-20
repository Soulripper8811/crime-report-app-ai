"use client";

import { useState } from "react";
import ReportForm from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

const ReportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);
  const handleStepComplete = (data: any) => {
    setReportData({ ...reportData, ...data });
    if (currentStep === 2) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
      {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
    </div>
  );
};

export default ReportWizard;
