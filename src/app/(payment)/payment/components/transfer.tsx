

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { updateUserPassword } from "api/settings"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { LuChevronDown, LuCopy } from "react-icons/lu";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { Calendar } from "components/ui/calendar";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Textarea } from "components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

// let merchantList: any
// let token = ""
// let subject = ""
// let merchantId: any = ""


// if (
//     typeof window !== "undefined" &&
//     typeof window.localStorage !== "undefined"
// ) {
//     token = window.localStorage.getItem("token") as any
//     subject = window.localStorage.getItem("subject") as any
//     merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
//     merchantId = merchantList[0].id ? merchantList[0]?.id : null
// }



export default function Transfer() {
    const { toast } = useToast();
    const testRef = useRef<any>();
    const testRef2 = useRef<any>();
    // console.log("testRef: ", testRef?.current?.textContent)


    const handleCopyToClipboard = (RefType: any) => {
        // Create a temporary input element
        const tempInput = document.createElement("input");
        tempInput.value = RefType === "testRef" ? testRef?.current?.textContent : testRef2?.current?.textContent;

        // Append the input element to the DOM (it doesn't need to be visible)
        document.body.appendChild(tempInput);

        // Select the text inside the input element
        tempInput.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);
        toast({
            variant: "default",
            title: "Copied",
            description: `${RefType === "testRef" ? testRef?.current?.textContent : testRef2?.current?.textContent}`,
            className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        });
    };



    return (
        <div className="w-full flex flex-col items-center pb-[104px]">
            <div className="flex flex-col items-center w-[70%] pb-[40px]">
                <p className="text-[#000000] text-[14px] leading-[145%] font-[400] mb-6">
                    Transfer NGN 150,000.00 to Payaccess Checkout
                </p>
                <div className="bg-[#BFEFFF33] w-full rounded-[4px] px-[31px] py-[25px] flex flex-col gap-4 mb-[40px]">
                    <div className="flex flex-col items-start gap-2 w-full">
                        <p className="text-[#555555] text-[14px] leading-[145%] font-[400]">Bank Name</p>
                        <p className="text-[#555555] text-[16px] leading-[150%] font-[600]">Payaccess paygo</p>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <p className="text-[#555555] text-[14px] leading-[145%] font-[400]">
                            Account Number
                        </p>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p ref={testRef2} className="text-[#555555] text-[16px] leading-[150%] font-[600]">2134563221</p>
                            <LuCopy onClick={() => handleCopyToClipboard("testRef2")} className="text-[24px] text-[#000000] cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <p className="text-[#555555] text-[14px] leading-[145%] font-[400]">
                            Amount
                        </p>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p ref={testRef} className="text-[#555555] text-[16px] leading-[150%] font-[600]">
                                NGN 150,000.00
                            </p>
                            <LuCopy onClick={() => handleCopyToClipboard("testRef")} className="text-[24px] text-[#000000] cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 w-full">
                    <Button
                        // disabled={loading}
                        className="min-h-[48px] font-[700] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        I have sent the money
                    </Button>
                    <Button
                        variant={"outline"}
                        // disabled={loading}
                        className="min-h-[48px] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700] border-[#48B8E6]"
                    >
                        Change payment method
                    </Button>
                    <Button
                        variant={"ghost"}
                        // disabled={loading}
                        className="min-h-[48px] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
                    >
                        Cancel payment
                    </Button>
                </div>
            </div>

            <div className="w-full border-t border-dashed border-[#999999] flex flex-col items-center gap-4 pt-[24px]">
                <p className="text-[#000000] text-[14px] leading-[145%] font-[400]">
                    Search for Payaccess paygo on your bank app.use this account for this transaction only
                </p>
                <p className="text-[#1D8EBB] text-[16px] leading-[136.5%] font-[400]">
                    Expires in 24  min
                </p>

            </div>
        </div>
    )
}
