"use client";

import { useStepper } from "headless-stepper";
import React, { useMemo } from "react";
import { cn } from "lib/utils";

import ApprovalForm from "./approval-description"; 
// import BusinessInformationForm from "./business-information-form";
import BusinessRegistrationKYCForm from "./business-registration-kyc";
import PersonalInformationForm from "./personal-information-form";
import BusinessInformationForm from "../../unregistered-business/business-information/form";
import AccountInformationForm from "../../unregistered-business/account-information/form";

function Stepper() {
  const steps = useMemo(
    () => [
      {
        label: "Step 0",
        title: "Business Registration KYC",
        description:
          "Upload documents, input bank details  and indicate your color(s)",
      },
      {
        label: "Step 1",
        title: "Business Information",
        description: "Provide the required API documentations",
      },
      {
        label: "Step 2",
        title: "Personal Information",
        description:
          "Upload documents, input bank details  and indicate your color(s) ",
      },
      {
        label: "Step 3",
        title: "Account Information",
        description: "Register on Interswitch Developer Console",
      },
      {
        label: "Step 4",
        title: "Review Details",
        description: "Register on Interswitch Developer Console",
      },
    ],
    [],
  );

  const { state, stepperProps, stepsProps, prevStep, nextStep } = useStepper({
    steps,
  });

  return (
    <div className="pb-5 space-y-1">
      <nav className="w-full" {...stepperProps}>
        <ol className="flex flex-row  py-6 space-x-10 bg-white">
          {stepsProps?.map((step, index) => (
            <li className="mr-2" key={index}>
              <a
                className="flex flex-col space-y-4 cursor-pointer group focus:outline-0"
                {...step}
              >
                <div className="flex flex-row items-center space-x-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-none bg-primary-50 font-CenturyGothic text-base text-white transition-colors ease-in-out group-focus:ring-2
                     group-focus:ring-primary-50 group-focus:ring-offset-2 
                      ${state?.currentStep === index
                        ? "bg-white text-white ring-2 ring-primary-50 ring-offset-2 group-focus:ring-primary-50 "
                        : ""
                      }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={cn(
                      "flex w-[130px] h-[1.5px] ",
                      state?.totalSteps === index + 1
                        ? "bg-none"
                        : "bg-gray-200 ",
                    )}
                  ></span>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm font-semibold font-CenturyGothic text-primary-50">
                    {steps[index].title}
                  </span>
                  <span className="w-48 font-CenturyGothic text-[12px] text-gray-40">
                    {steps[index].description}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="bg-white">
        <div className="max-w-[950px] px-4 ">
          {state.currentStep === 0 ? (
            <div className="flex items-center">
              <div className="w-full p-5 border border-gray-300 rounded-lg">
                <BusinessRegistrationKYCForm prevStep={prevStep} nextStep={nextStep} />
              </div>
            </div>
          ) : state.currentStep === 1 ? (
            <div className="flex items-center mb-32">
              <div className="w-full p-5 border border-gray-300 rounded-lg">
                <BusinessInformationForm prevStep={prevStep} nextStep={nextStep} />
              </div>
            </div>
          ) : state.currentStep === 2 ? (
            <div className="flex items-center ">
              <div className="w-full p-5 border border-gray-300 rounded-lg">
                <PersonalInformationForm prevStep={prevStep} nextStep={nextStep} />
              </div>
            </div>
          )
            : state.currentStep === 3 ? (
              <div className="flex items-center ">
                <div className="w-full p-5 border border-gray-300 rounded-lg">

                  <AccountInformationForm prevStep={prevStep} nextStep={nextStep} />
                </div>
              </div>
            )
              : state.currentStep === 4 ? (
                <div className="flex items-center  ">
                  <div className="w-full p-5 border border-gray-300 rounded-lg">
                    <ApprovalForm prevStep={prevStep} nextStep={nextStep} />
                  </div>
                </div>
              )
                : (
                  <></>
                )}
        </div>
      </div>


      <pre style={{ backgroundColor: "#f2f2f2" }}>
        {/* {JSON.stringify(state, null, 2)} */}
        {/* {JSON.stringify(progressProps, null, 2)} */}
      </pre>
    </div>
  );
}

export default Stepper;
