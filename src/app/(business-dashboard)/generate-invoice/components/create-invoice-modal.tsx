"use client"
import React, { useState } from "react"
import { Label } from "components/ui/label"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import SimpleForm from "./simple-form"
import StandardForm from "./standard-form"

export const CreateInvoice = () => {
  const [toggle, setToggle] = useState(0)
  return (
    <div className="overflow-hidden w-full rounded-[16px] border border-solid border-[#DADADA] bg-[#E4F8FF33]">
      <div className=" w-full bg-[#177196] px-[148px] py-[30px] flex flex-col items-center gap-8">
        <p className="text-[#FFFFFF] text-[16px] font-[400] leading-normal">What kind of invoice will you like to create</p>

        <RadioGroup defaultValue={"Simple / Open invoice"} className="flex flex-row items-start justify-between w-full">
          <div className="w-[223px] flex flex-col items-start">
            <div className="flex items-start space-x-2">
              <RadioGroupItem
                onClick={() => setToggle(0)}
                className={`h-[26px] w-[26px] text-[white]  ${!toggle ? "bg-[#ED7F04] border-none" : "border-[white]"}`}
                value="Simple / Open invoice"
                id="r1"
              />
              <Label className="text-[#FFFFFF] text-[14px] font-[600] leading-normal " htmlFor="r1">
                Simple / Open invoice
              </Label>
            </div>
            <p className="text-[#FFFFFF] text-[12px] font-[400] leading-normal pl-[34px]">Set amount, descriptions and get payment form customer</p>
          </div>
          <div className="w-[223px] flex flex-col items-start">
            <div className="flex items-start space-x-2">
              <RadioGroupItem
                onClick={() => setToggle(1)}
                className={`h-[26px] w-[26px] text-[white]  ${toggle ? "bg-[#ED7F04] border-none" : "border-[white]"}`}
                value="Standard invoice"
                id="r2"
              />
              <Label className="text-[#FFFFFF] text-[14px] font-[600] leading-normal " htmlFor="r2">
                Standard invoice
              </Label>
            </div>
            <p className="text-[#FFFFFF] text-[12px] font-[400] leading-normal pl-[34px]">
              Set Item quantity, tax etc and invoice a customer PDF , and transfer link.
            </p>
          </div>
        </RadioGroup>
      </div>
      <div className="py-[36px] px-[109px]">{toggle ? <StandardForm /> : <SimpleForm />}</div>
    </div>
  )
}
