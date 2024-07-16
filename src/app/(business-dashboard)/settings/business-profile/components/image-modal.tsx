"use client";

import { ScrollArea } from "components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { HiOutlineCloudUpload } from "react-icons/hi"
import { Textarea } from "components/ui/textarea"
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
import { cn } from "lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createTicket } from "api/dispute";
import { formatQuantity, formatMoneyAmount } from "utils/numberFormater"
import Image from "next/image";


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



export default function ImageModal({ data, imgModal, setImgModal }: any) {
    const { toast } = useToast();
    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-50">

            <div className="flex flex-col items-center h-[50vh] xl:w-[30%] lg:w-[45%] w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col items-start gap-2 relative w-full bg-[#fff] px-6 py-5">
                    <MdClose
                        onClick={() => setImgModal(false)}
                        className="absolute top-4 right-4 text-[26px] text-[#000] cursor-pointer"
                    />
                </div>
                <ScrollArea className="w-full">
                    <div className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-center w-full bg-white px-6 py-8">
                            <Image height={150} width={150} className="" src={`http://137.184.47.182:8081/fileuploads/${data}`} alt="business logo" />
                        </div>
                    </div>
                </ScrollArea>
            </div>

        </div>

    );
}





























