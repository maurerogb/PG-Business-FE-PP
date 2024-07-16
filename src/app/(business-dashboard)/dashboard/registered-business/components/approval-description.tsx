import React from "react";

import { Typography } from "components/ui/Typography";
import { Button } from "components/ui/button";
import ReviewDetails from "./review-details";

import InformationFrame from "./information-frame";
import PersonalInformation from "./personal-information";
import BusinessInformation from "./business-information";
import AccountInformation from "./account-information";
import Link from "next/link";
type Props = {};

export default function ApprovalDescription(props: any) {
  return (
    <div>
      <ReviewDetails props={props} />

      {/* form display section */}
      <div className=" w-full inline-flex flex-col items-start justify-start gap-6 px-10 pt-6 pb-10 bg-white border rounded-lg border-slate-200">
        <div className="flex flex-row items-center justify-between w-full">
          <Typography className="text-2xl text-black font-bold leading-normal grow shrink basis-0 font-CenturyGothic">
            Review Information
          </Typography>

          <Button className="text-center text-white text-sm font-bold font-['Century Gothic'] self-stretch px-8 py-2.5 bg-sky-400 rounded justify-center items-center inline-flex">
            <Link key={"/"} href='/dashboard'>
              Done
            </Link>

          </Button>
        </div>
        <div className="self-stretch h-px border border-gray-200"></div>
        <div className="flex flex-col items-start justify-start space-y-3 ">

          <InformationFrame title="Business Information">
            <BusinessInformation />
          </InformationFrame>

        </div>
      </div>
    </div>
  );
}
