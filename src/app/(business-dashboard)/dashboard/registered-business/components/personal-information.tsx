import React from "react";

type Props = {};

export default function PersonalInformation({}: Props) {
  return (
    <div>
      <div className="flex flex-col items-start justify-start w-full gap-6">
        <div className="inline-flex items-start justify-start w-full gap-6">
          <div className="flex items-start justify-between w-full gap-24 ">
            <div className="flex-col justify-start items-start gap-0.5 inline-fle">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                First Name
              </div>
              <div className="h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                Goodness
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Last Name
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                Oluwatobi
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Contact Phone Number
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                (+234) 802 345 0003
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex items-start justify-between gap-6 ">
          <div className="flex items-start justify-between ">
            <div className="flex items-start justify-start pr-7 gap-80">
              <div className="self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Gender
                </div>
                <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  Female
                </div>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Date of Brith
                </div>
                <div className="w-40 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  23/04/1999
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start self-stretch justify-start gap-2 h-28">
        <div className="w-20 h-6 text-slate-500 text-sm font-normal font-['Century Gothic']">
          Uploads
        </div>
        <div className="inline-flex items-start justify-start h-20 gap-36">
          <div className="inline-flex flex-col items-start justify-start gap-2">
            <div className="inline-flex items-center justify-center gap-2 w-60">
              <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex">
                <div className="relative flex flex-col items-start justify-start w-5 h-5" />
              </div>
              <div className="w-52 text-gray-700 text-base font-bold font-['Century Gothic'] leading-none">
                img_001.png
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 w-60">
              <div className="relative w-6 h-6" />
              <div className="w-16 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                ID.PDF
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
