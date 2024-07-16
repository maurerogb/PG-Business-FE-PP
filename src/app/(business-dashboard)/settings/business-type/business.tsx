
"use client"

import { Checkbox } from "components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query"
import { getMerchantDetails } from "api/settings";
import { updateBusinessType } from "api/settings";
import { useToast } from "components/ui/use-toast";
import React, { useEffect, useState } from 'react'
import { useHydrateStore, useUserStore, useMerchantStore } from "store"




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




export default function BusinessType() {
    const merchantDetailStore = useHydrateStore(useMerchantStore, (state) => state.currentMerchant); //getting merchant name from store
    // console.log(merchantDetailStore)
    const getParameters = {
        token,
        merchantCode: merchantDetailStore?.merchantCode
    }

    // console.log("mercahant Code: ", merchantList[0]?.merchantCode)

    const data: any = useQuery(['getMerchantDetails', getParameters], () => getMerchantDetails(getParameters));

    console.log("business type data: ", data?.data?.responseObject[0]?.businessType)

    const [prefill, setPrefill] = useState(data?.data?.responseObject[0]?.businessType)
    const { toast } = useToast();

    useEffect(() => {
        setPrefill(data?.data?.responseObject[0]?.businessType)
        console.log(prefill)
    }, [data?.data?.responseObject[0]?.businessType, data])

    const businessTypeMutation = useMutation({
        mutationFn: updateBusinessType,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;
            if (responseData?.statusCode === "1") {
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Changing Business Type",
                });
            }
            if (responseData?.statusCode === "0") {
                toast({
                    variant: "default",
                    title: "",
                    description: "Business Type Updated",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
            }
        },
        onError: (e) => {
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    const handleSubmit = (e: any) => {
        const value = e.target.value
        let newValues = {
            token: token,
            merchantId: merchantId,
            businessType: value
        };
        // console.log(newValues);
        businessTypeMutation.mutate(newValues as any);
    }
    console.log("prefill: ", prefill)

    return (
        <div className="flex flex-col items-start gap-4 w-[55%]">
            <p className="self-center text-[#0C394B] text-[16px] leading-[150%] font-[600]">Business type</p>
            <RadioGroup
                // defaultValue={"INDIVIDUAL"}
                value={prefill}
                className='p-9 w-full flex flex-col items-start gap-6 rounded-[10px] bg-white shadow-[0px_4px_8px_0px_rgba(241,241,241,0.99)]'
            >
                <div className='flex flex-row items-start gap-2'>
                    {/* <Checkbox id="terms1" className="w-[20px] h-[20px]" /> */}
                    <RadioGroupItem
                        onClick={(e) => handleSubmit(e)}
                        value="REGISTERED_BUSINESS"
                        id="r1"
                        className="w-[20px] h-[20px]"
                    />

                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="r1"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Registered Business
                        </label>
                        {/* <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Requires two factor authtication anything you log in
                        </p> */}
                    </div>
                </div>
                <div className='flex flex-row items-start gap-2'>
                    {/* <Checkbox id="terms1" className="w-[20px] h-[20px]" /> */}
                    <RadioGroupItem
                        onClick={(e) => handleSubmit(e)}
                        value="INDIVIDUAL"
                        id="r2"
                        className="w-[20px] h-[20px]"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="r2"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Individual
                        </label>
                        {/* <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Email my customers for every transactions
                        </p> */}
                    </div>
                </div>
                {/* <div className='flex flex-row items-start gap-2'>
                    <Checkbox id="terms1" className="w-[20px] h-[20px]" />
                    <RadioGroupItem
                        onClick={(e) => handleSubmit(e)}
                        value="NGO"
                        id="r3"
                        className="w-[20px] h-[20px]"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="r3"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            NGO
                        </label>
                        <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Email my customers for every transactions
                        </p>
                    </div>
                </div> */}
            </RadioGroup>
        </div>
    )
}














