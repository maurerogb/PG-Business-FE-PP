"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select"
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { MdClose } from "react-icons/md";
import { LuFolder } from "react-icons/lu";
import { cn } from "lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createTerminaRequest } from "api/POS-terminal";
import { formatQuantity } from "utils/numberFormater"
import { ScrollArea } from "components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getTransactionDetails } from "api/transaction"
import { AiOutlineConsoleSql } from "react-icons/ai";


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



export default function PrintTransactionView({ modalData, reciptRef }: any) {

    <style type="text/css" media="print">
        {"@media print{@page {size: portrait}}"}
    </style>
    const dateFormatter = (dateString: any) => {
        const dateObject = new Date(dateString);

        // Formatting the date as "month day"
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        console.log(formattedDate);
        return formattedDate;

    }
    const timeFormatter = (dateString: any) => {
        console.log("dateString: ", dateString)
        const dateObject = new Date(dateString);
        // Extracting hours, minutes, and seconds
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? 'pm' : 'am';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        // Format minutes with two digits
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Creating a time string in h:mm a format
        const timeString = `${formattedHours}:${formattedMinutes}${amOrPm}`;
        console.log(timeString);
        return timeString;

    }
    // ${ dateFormatter(fillData?.updatedAt) }, 

    const GetParameters = { orderRef: modalData, merchantCode: merchantList[0]?.merchantCode, token }
    const data: any = useQuery(["getAllInvoice", GetParameters], () => getTransactionDetails(GetParameters))

    console.log("view data: ", data?.data?.responseObject);
    let fillData = data?.data?.responseObject

    const reciptValue: any[] = [
        {
            id: "0",
            title: "Narration",
            value: "Transaction"
        },
        {
            id: "1",
            title: "Date / Time",
            // value: 
            value: (fillData?.updatedAt ? dateFormatter(fillData?.updatedAt) : "") + `, ${fillData?.updatedAt.split("-")[0]}, ${timeFormatter(fillData?.updatedAt)}`
        },
        {
            id: "2",
            title: "Transaction reference",
            value: fillData?.transactionRef
        },
        {
            id: "3",
            title: "Transaction Type",
            value: fillData?.serviceType?.toLowerCase().split("_").join(" ")
        },
        {
            id: "4",
            title: "Marchant ID",
            value: String(fillData?.merchantId).padStart(8, '0')

        },
    ]






    return (
        <div ref={reciptRef} className="w-full pt-5 flex flex-col items-center">
            <div className="bg-white w-[70%] rounded-[14px] pb-10">
                <div className="w-full flex flex-col items-center bg-white rounded-[14px] px-14 pb-[80px] pt-10 relative">
                    <div className="flex flex-col items-center gap-3 mb-[43px]">
                        <div className="mb-[10px] w-16 h-14 rounded-[11px] bg-[#FFF6EF] flex flex-col items-center justify-center">
                            <LuFolder className="text-[24px] text-[#F38020]" />
                        </div>
                        <p className="text-[#0C394B] text-[18px] font-[700] leading-normal">
                            {`${fillData?.payAccessCurrency === "NGN" ? "₦" : ""} ${fillData?.amount ? fillData?.amount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                            }) : '00.00'}`}
                        </p>
                        <p className="text-[#0C394B] text-[14px] font-[600] leading-normal">
                            To
                        </p>
                        <p className="text-[#0C394B] text-[18px] font-[400] leading-normal">
                            {fillData?.merchantName}
                        </p>
                    </div>

                    <div className="flex flex-col items-center w-full gap-2">
                        <div className="py-3 border-b border-solid border-[#E5E7EB] flex flex-row items-center justify-between w-full">
                            <p className="text-[#9CA3AF] text-[16px] font-[500] leading-5">
                                From
                            </p>
                            <div className="flex flex-col items-end gap-2">
                                <p className="text-[#0C394B] text-[14px] font-[400] leading-5">
                                    <span className="text-[16px] font-[600]">{`${fillData?.channel} Transaction`}</span>, {fillData?.merchantName} Current Account
                                </p>
                                <p className="text-[#0C394B] text-[14px] font-[400] leading-normal">
                                    0101902055
                                </p>
                            </div>
                        </div>

                        {
                            reciptValue.map(({ id, title, value }) => {
                                return (
                                    <div key={id} className="py-3 border-b border-solid border-[#E5E7EB] flex flex-row items-center justify-between w-full">
                                        <p className="text-[#9CA3AF] text-[16px] font-[500] leading-5">
                                            {title}
                                        </p>
                                        <p className="text-[#0C394B] text-[14px] font-[500] leading-5">
                                            {value}
                                        </p>

                                    </div>
                                )
                            })
                        }

                        <div className="py-3 border-b border-solid border-[#E5E7EB] flex flex-row items-center justify-between w-full">
                            <p className="text-[#9CA3AF] text-[16px] font-[500] leading-5">
                                Status
                            </p>
                            {
                                fillData?.transactionStatus === "SUCCESS" ?
                                    <p className="text-[#16A34A] text-[14px] font-[500] leading-5">
                                        Successful
                                    </p> :
                                    ""
                            }
                            {
                                fillData?.transactionStatus === "PENDING" ?
                                    <p className="text-[#D6A12E] text-[14px] font-[500] leading-5">
                                        Pending
                                    </p> :
                                    ""
                            }
                            {
                                fillData?.transactionStatus === "AWAITING_OTP_VALIDATION" ?
                                    <p className="text-[#C61010] text-[14px] font-[500] leading-5">
                                        Processing
                                    </p> :
                                    ""
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
}






























