import React from "react";
import PersonalInformationForm from "./personal-information-form";
import BusinessInformationForm from "../../unregistered-business/business-information/form";
import AccountInformationForm from "../../unregistered-business/account-information/form";

type Props = {};

export default function BusinessInformation({ }: Props) {
  return (
    <div>
      <div className="flex flex-col w-full items-start justify-start gap-6 ">
        <div className="h-px border border-zinc-400"></div>
        <PersonalInformationForm />
        <BusinessInformationForm />
        <AccountInformationForm />

      </div>
    </div>
  );
}
