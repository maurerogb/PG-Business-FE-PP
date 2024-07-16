import React from "react"

import { DescriptionItem } from "../../components/description-item"

type Props = {
  data: any,

}

export default function AccountInformation({data}: Props) {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-6">
        <div className="inline-flex items-start justify-start w-full gap-6 mb-6">
          <div className="flex items-start justify-between w-full gap-24 ">
            <div className="flex-col justify-start items-start gap-0.5 inline-fle">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                BVN
              </div>
              <div className="h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                {data?.businessBvn}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Bank Name
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                {data?.businessBankName}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Account Name
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.businessAccountName}
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                Account Number
              </div>
              <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.businessAccountNumber}
              </div>
            </div>
          </div>


        </div>
        </div>
  )
}
