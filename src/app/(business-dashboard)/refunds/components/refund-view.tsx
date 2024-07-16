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
import { VscCommentUnresolved } from "react-icons/vsc";
import { cn } from "lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createTerminaRequest } from "api/POS-terminal";
import { formatQuantity } from "utils/numberFormater"
import { ScrollArea } from "components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getDisputeDetails } from "api/dispute"
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useReactToPrint } from 'react-to-print';
// import PrintTransactionView from "./print-recipt";


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



export default function RefundView({ modalData, setModalOpen }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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

    const GetParameters = { merchantId: modalData?.merchantId, ticketNumber: modalData?.ticketNumber, token }
    const data: any = useQuery(["getDisputeDetails", GetParameters], () => getDisputeDetails(GetParameters))

    // console.log("dispute detail view data: ", data?.data?.responseObject);
    let fillData = data?.data?.responseObject

    const reciptValue: any[] = [
        {
            id: "0",
            title: "Ticket Number",
            value: fillData?.transactionTicket?.ticketNumber
        },
        {
            id: "1",
            title: "Date / Time",
            // value: "tunde"
            value: (fillData?.transactionTicket?.createdAt ? dateFormatter(fillData?.transactionTicket?.createdAt) : "") + `, ${fillData?.transactionTicket?.createdAt.split("-")[0]} / ${timeFormatter(fillData?.transactionTicket?.createdAt)}`
        },
        {
            id: "2",
            title: "Dispute Message",
            value: fillData?.transactionTicket?.ticketMessage
        },
        {
            id: "3",
            title: "Ticket Category",
            value: fillData?.transactionTicket?.ticketCategory
        },
        {
            id: "4",
            title: "Marchant ID",
            value: String(fillData?.transactionTicket?.merchantId).padStart(8, '0')

        },
    ]




    // const terminalFormMutation = useMutation({
    //     mutationFn: createTerminaRequest,
    //     onSuccess: async (data) => {
    //         const responseData: API.InvoiceStatusReponse =
    //             (await data.json()) as API.InvoiceStatusReponse;
    //         console.log("terminal status code: ", responseData?.statusCode)
    //         if (responseData?.statusCode === "715" || responseData?.statusCode === "1") {
    //             setLoading(false)
    //             toast({
    //                 variant: "destructive",
    //                 title: "",
    //                 description: "Error Creating Invoice",
    //             });
    //         }
    //         else if (responseData?.statusCode === "0" || "ACCEPTED") {
    //             setLoading(false)
    //             toast({
    //                 variant: "default",
    //                 title: "Success...",
    //                 description: "Terminal Request Sent",
    //                 className:
    //                     "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
    //             });
    //             terminalForm.reset();
    //             setModalOpen(false)
    //         }
    //     },
    //     onError: (e) => {
    //         console.log(e);
    //         setLoading(false)
    //         toast({
    //             variant: "destructive",
    //             title: `${e}`,
    //             description: "error",
    //         });
    //     },
    // });




    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-[10]">
            <ScrollArea className="bg-white lg:w-[45%] w-[60%] h-[85vh] rounded-[14px] pb-10">
                <div className="w-full flex flex-col items-center bg-white rounded-[14px] px-14 pb-[80px] pt-10 relative">
                    <MdClose onClick={() => setModalOpen(false)} className="text-[22px] absolute top-6 right-6 cursor-pointer" />
                    <div className="flex flex-col items-center gap-3 mb-[43px]">
                        <div className="mb-[10px] w-16 h-14 rounded-[11px] bg-[#FFF6EF] flex flex-col items-center justify-center">
                            <VscCommentUnresolved className="text-[24px] text-[#F38020]" />
                        </div>
                        <p className="text-[#0C394B] text-[18px] font-[700] leading-normal">
                            Dispute Amount
                        </p>
                        <p className="text-[#0C394B] text-[18px] font-[700] leading-normal">
                            {`${fillData?.transaction?.payAccessCurrency === "NGN" ? "₦" : ""} ${fillData?.transactionTicket ? fillData?.transactionTicket?.disputeAmount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                            }) : '00.00'}`}
                        </p>
                        {/* <p className="text-[#0C394B] text-[14px] font-[600] leading-normal">
                            To
                        </p> */}
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
                                    {fillData?.transaction?.merchantName}
                                    {/* <span className="text-[16px] font-[600]">{`${fillData?.channel} Transaction`}</span>, {fillData?.merchantName} Current Account */}
                                </p>
                                {/* <p className="text-[#0C394B] text-[14px] font-[400] leading-normal">
                                    0101902055
                                </p> */}
                            </div>
                        </div>

                        {
                            reciptValue.map(({ id, title, value }) => {
                                return (
                                    <div key={id} className="py-3 border-b border-solid border-[#E5E7EB] flex flex-row items-center gap-3 justify-between w-full">
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
                                Ticket Status
                            </p>
                            {
                                fillData?.transactionTicket?.ticketStatus === "CLOSED" ?
                                    <p className="text-[#16A34A] text-[14px] font-[500] leading-5">
                                        Closed
                                    </p> :
                                    ""
                            }
                            {
                                fillData?.transactionTicket?.ticketStatus === "OPEN" ?
                                    <p className="text-[#D6A12E] text-[14px] font-[500] leading-5">
                                        Opened
                                    </p> :
                                    ""
                            }
                            {
                                fillData?.transactionTicket?.ticketStatus === "AWAITING_OTP_VALIDATION" ?
                                    <p className="text-[#C61010] text-[14px] font-[500] leading-5">
                                        Processing
                                    </p> :
                                    ""
                            }


                        </div>
                    </div>
                    {/* <Button
                        disabled={loading}
                        className="mt-[32px] min-h-[48px] rounded-[8px] font-[700] w-[80%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Loading..." : "Share Receipt"}
                    </Button>
                    <Button
                        onClick={() => handlePrint()}
                        disabled={loading}
                        variant={"outline"}
                        className="mt-[16px] min-h-[48px] rounded-[8px] text-[#23AAE1] border-[#23AAE1] font-[700] w-[80%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Loading..." : "Download Receipt"}
                    </Button>
                    <Button
                        disabled={loading}
                        variant={"ghost"}
                        className="mt-[16px] rounded-[8px] min-h-[48px] text-[#23AAE1] font-[700] w-[80%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Loading..." : "Report a problem"}
                    </Button> */}

                    <div className="hidden">
                        {/* <PrintTransactionView reciptRef={componentRef} modalData={modalData} /> */}
                    </div>
                </div>
            </ScrollArea>


        </div>

    );
}






























