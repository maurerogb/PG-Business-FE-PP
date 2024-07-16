import { parseISO,format } from "date-fns";
import {  parse } from "path";
import React from "react";

type Props = {
  data: any
};

export default function PersonalInformation({data}: Props) {
  return (
    <div>
      <div className="flex flex-col items-start justify-start w-full gap-6">
        <div className="inline-flex items-start justify-start w-full gap-6 mb-6">
          <div className="flex items-start justify-between w-full gap-24 ">
            <div className="flex-col justify-start items-start gap-0.5 inline-fle">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                First Name
              </div>
              <div className="h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
            {data?.firstName}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Last Name
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                {data?.lastName}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Contact Phone Number
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.mobileNumber}
              </div>
            </div>
          </div>


        </div>

        <div className="inline-flex items-start justify-start w-full gap-6 mb-6">
          <div className="flex items-start justify-between w-full gap-24 ">
            <div className="flex-col justify-start items-start gap-0.5 inline-fle">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Gender/Sex
              </div>
              <div className="h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
              {data?.gender}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
              Date of Brith
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
              { data?.dateOfBirth }
              {/* format(parseISO(data?.dateOfBirth), 'LLLL d, yyyy')} */}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Email Address
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.emailAddress}
              </div>
            </div>
          </div>


        </div>

        <div className="inline-flex items-start justify-start w-full gap-6 mb-6">
          <div className="flex items-start justify-between w-full gap-24 ">
            <div className="flex-col justify-start items-start gap-0.5 inline-fle">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Document Type
              </div>
              <div className="h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
              {data?.identificationDocument.replace("_", " ")}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
              Document ID
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
              {data?.identificationNumber}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Upload
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.identificationDocumentPath}
              </div>
            </div>
          </div>


        </div>
        {/* <div className="inline-flex items-start justify-start w-full gap-6 mb-6 ">
          <div className="flex items-start justify-between ">
            <div className="flex items-start justify-start pr-7 gap-80">
              <div className="self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Gender
                </div>
                <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  {data.gender}
                </div>
              </div>
              
            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
              Date of Brith
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
              {format(parseISO(data.dateOfBirth), 'LLLL d, yyyy')}
              </div>
            </div>
              <div className="self-stretch flex-col justify-start items-start gap-0.5 px-6 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Date of Brith
                </div>
                <div className="w-40 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  23/04/1999
                </div>
              </div>
              
            </div>
          </div>
        </div> */}
      </div>

      
    </div>
  );
}
