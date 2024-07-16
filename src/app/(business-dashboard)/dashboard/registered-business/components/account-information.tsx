import React from "react";

type Props = {};

export default function AccountInformation({}: Props) {
  return (
    <div className="flex flex-col items-start justify-start h-52 gap-7">
      <div className="h-px border border-zinc-400"></div>
      <div className="flex flex-col items-start justify-start h-32 gap-10">
        <div className="inline-flex items-start self-stretch justify-start gap-24">
          <div className="inline-flex flex-col items-start justify-start gap-2">
            <div className="text-slate-500 text-sm font-normal font-['Averta']">
              BVN
            </div>
            <div className="text-gray-700 text-base font-semibold font-['Averta'] leading-snug">
              2345677980
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-2">
            <div className="text-slate-500 text-sm font-normal font-['Averta']">
              Bank Name
            </div>
            <div className="text-gray-700 text-base font-semibold font-['Averta'] leading-snug">
              Oluwatobi groups
            </div>
          </div>
        </div>
        <div className="inline-flex items-start self-stretch justify-start gap-24">
          <div className="inline-flex flex-col items-start justify-start gap-2">
            <div className="text-slate-500 text-sm font-normal font-['Averta']">
              Account Number
            </div>
            <div className="text-gray-700 text-base font-semibold font-['Averta'] leading-snug">
              2309576328
            </div>
          </div>
        </div>
      </div>
      I
    </div>
  );
}
