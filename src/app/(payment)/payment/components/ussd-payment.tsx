

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



export default function UssdPayment() {
    const { toast } = useToast();
    const [bank, setBank] = useState<string | null>(null)
    const [bankName, setBankName] = useState<string>("GTBank")

    const testRef = useRef<any>();
    // console.log("testRef: ", testRef?.current?.textContent)


    const handleCopyToClipboard = () => {
        // Create a temporary input element
        const tempInput = document.createElement("input");
        tempInput.value = testRef?.current?.textContent

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
            description: `${testRef?.current?.textContent}`,
            className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        });
    };



    return (
        <div className="w-[80%] flex flex-col items-center pb-[50px]">
            {bank ?
                <div className="w-full flex flex-col items-center">
                    <p className="text-[#2A2A2A] text-center text-[16px] leading-[136.5%] font-[400] mb-6">
                        Dial the code below to complete this transaction with GTBank's 737
                    </p>
                    <p ref={testRef} className="text-[#CA6B1B] text-center text-[24px] leading-[147%] font-[600] mb-4">
                        *737*44*56*34567#
                    </p>
                    <p onClick={() => handleCopyToClipboard()} className="text-[#666666] hover:text-[#000000] cursor-pointer text-center text-[12px] leading-[147%] font-[600] mb-11">
                        Click to copy
                    </p>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <Button
                            // disabled={loading}
                            className="min-h-[48px] font-[700] w-[50%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                        >
                            I have sent the money
                        </Button>
                        <Button
                            variant={"ghost"}
                            // disabled={loading}
                            className="min-h-[48px] w-[50%] hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
                        >
                            Cancel payment
                        </Button>
                    </div>
                </div>
                : ""

            }
            <div className="w-full flex flex-col items-center">
                <p className="text-[#2A2A2A] text-center text-[14px] leading-[145%] font-[400] mb-6">
                    Choose your bank to start payment
                </p>

                <Select
                    onValueChange={setBankName}
                    value={bankName}

                >
                    <SelectTrigger className="mb-12 px-4 py-2 outline-[#A1CBDE] w-[70%] rounded-[8px] border border-[#D6D6D6] h-[51px]">
                        <SelectValue placeholder="GT Bank" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-[80%] p-[6px]">
                        <SelectItem value="GTBank">GT Bank</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    // disabled={loading}
                    className="min-h-[48px] font-[700] w-[50%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                    Choose
                </Button>

            </div>
        </div>
    )
}

