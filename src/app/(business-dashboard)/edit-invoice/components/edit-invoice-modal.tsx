"use client"

import React, { useState } from "react"
import { Label } from "components/ui/label"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import SimpleForm from "./simple-form"
import StandardForm from "./standard-form"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query"
import { getInvoiceDetails, getInvoiceBreakdown } from "api/invoice";



let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}


export const EditInvoiceModal = () => {

  const [toggle, setToggle] = useState(0)

  const searchParams = useSearchParams();
  const invoiceIdValue = searchParams?.get("id");

  // console.log(invoiceIdValue, merchantId, token)

  const requestData = {
    token, merchantId, invoiceId: invoiceIdValue
  }


  const detailData: any = useQuery(['getMerchantSetting', requestData], () => getInvoiceDetails(requestData));
  // const breakDownData: any = useQuery(['getInvoiceBreakdown', requestData], () => getInvoiceBreakdown(requestData));

  // console.log("deatil Data: ", detailData?.data?.responseObject)
  let prefill = detailData?.data?.responseObject?.invoiceDetails
  


  return (
    <div className="overflow-hidden w-full rounded-[16px] border border-solid border-[#DADADA] bg-[#E4F8FF33]">
      <div className=" w-full bg-[#177196] px-[148px] py-[30px] flex flex-col items-center">
        <p className="text-[#FFFFFF] text-[20px] font-[700] leading-normal mb-4">Edit Invoice Saved as Draft</p>
        {
          prefill?.invoiceType === "SIMPLE" ?
            <div className="w-full flex flex-col items-center">
              <p className="text-[#FFFFFF] text-[16px] font-[400] leading-normal">
                Simple / Open invoice
              </p>
              <p className="text-[#FFFFFF] text-[14px] font-[400] leading-normal">
                Set amount, descriptions and get payment form customer
              </p>
            </div>
            :

            <div className="w-full flex flex-col items-center">
              <p className="text-[#FFFFFF] text-[16px] font-[400] leading-normal">
                Standard invoice
              </p>
              <p className="text-[#FFFFFF] text-[14px] font-[400] leading-normal">
                Set Item quantity, tax etc and invoice a customer PDF , and transfer link.
              </p>
            </div>
        }


      </div>
      <div className="py-[36px] px-[109px]">{prefill?.invoiceType === "SIMPLE" ? <SimpleForm preFillData={prefill} /> : < StandardForm preFillData={prefill} />}</div>
    </div>
  )
}
