"use client";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { LuChevronsRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ScrollArea, ScrollBar } from "components/ui/scroll-area"
import { IoMdCheckmark } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
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
import { createTerminaRequest } from "api/POS-terminal";
import { formatQuantity } from "utils/numberFormater"
import { useQuery } from "@tanstack/react-query"
import { getTerminalsTransactions } from "api/POS-terminal"

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



export default function ViewTransactions({ modalData, handleModalPOSpopup }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()
    const [date1, setDate1] = useState<Date>()
    const [date2, setDate2] = useState<Date>()
    const [row, setRow] = useState<any>("5")
    const [page, setPage] = useState<any>("0")
    const [popup, setPopup] = useState(false);



    const GetParameters = { pageNumber: page, terminalCode: modalData, rowCount: row, token }
    const data: any = useQuery(["getTerminalsTransactions", GetParameters], () => getTerminalsTransactions(GetParameters))
    console.log("get terminals transactions: ", data?.data?.responseObject)
    let settlementsTableData = data?.data?.responseObject

    const heading = ["Merchant code", "Merchant Name", "Channel", "Service Type", "Order Ref", "Amount", "Date", "Status"]//================table heading creator========================
    // const router = useRouter();
    const handlePageNumber = (option: any) => {
        if (option === "next") {
            if (page < Math.ceil(settlementsTableData?.totalCount / row) - 1) {
                // console.log("next: ", page)
                setPage(Number(page) + 1)
            } else {
                return;
            }
        }
        else if (option === "prev") {
            if (page > 0) {
                // console.log("prev: ", page)
                setPage(Number(page) - 1)
            } else {
                return;
            }

        }
    }
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





    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-10">
            <div className="relative flex flex-col items-center w-[80%] bg-white rounded-lg px-6 pb-10 pt-16">
                <MdClose onClick={() => handleModalPOSpopup(false)} className="text-[22px] cursor-pointer absolute top-6 right-7" />
                <ScrollArea className="2xl:w-full w-[75vw] rounded-[8px]">
                    <div className="w-full flex flex-col 2xl:items-center items-start">
                        <div className="2xl:w-full w-[1600px]">
                            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                                {
                                    heading.map((value, id) => {
                                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                                    })

                                }
                            </div>


                            <ScrollArea className='w-full h-[400px]'>
                                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                                    {settlementsTableData?.list?.map(({ merchantCode, merchantName, channel, serviceType, orderRef, payAccessCurrency, amount, updatedAt, transactionStatus }: any, idx: React.Key | null | undefined) => {
                                        return (
                                            <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center justify-between w-full h-[44px]'>

                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantCode}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantName}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{channel}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{serviceType}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{orderRef}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{payAccessCurrency === "NGN" ? "₦" : ""}{" "}{amount}</p>
                                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`${dateFormatter(updatedAt)}, ${timeFormatter(updatedAt)}`}</p>
                                                <div className='flex flex-col items-center w-[20%]'>
                                                    {transactionStatus === "PENDING" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                        {"Pending"}
                                                        <IoMdCheckmark className="text-[16px]" />
                                                    </p>}
                                                    {transactionStatus === "PENDING_CONFIRMATION" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                        {"Pending"}
                                                        <IoMdCheckmark className="text-[16px]" />
                                                    </p>}
                                                    {transactionStatus === "SUCCESS" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                        {"Success"}
                                                        <IoMdCheckmark className="text-[16px]" />
                                                    </p>}
                                                    {transactionStatus === "AWAITING_OTP_VALIDATION" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                        {"Processing"}
                                                        <IoMdCheckmark className="text-[16px]" />
                                                    </p>}
                                                    {transactionStatus === "DELETED" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                        {"Deleted"}
                                                        <IoMdCheckmark className="text-[16px]" />
                                                    </p>}
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div >

                    <ScrollBar orientation="horizontal" />
                </ScrollArea >

                <div className='w-full h-10 mb-6 flex flex-row items-center gap-12 justify-end bg-white pr-[20px]'>

                    <div className='flex flex-row items-center w-[155px]'>
                        <span className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-full flex flex-row items-center'>{`Rows per page: ${row}`}</span>
                        <Select
                            onValueChange={(value) => setRow(value)}
                            value={row}
                        >
                            <SelectTrigger className='w-fit border-none shadow-none' >
                                {/* <MdKeyboardArrowDown className={`text-[22px]`} /> */}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value={settlementsTableData?.totalCount}>All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-[70px] flex flex-row items-center'>
                        {`${(((Number(page) + 1) - 1) * Number(row)) + 1}-${(Number(page) + 1) * Number(settlementsTableData?.list?.length)} of ${settlementsTableData?.totalCount}`}
                    </p>
                    <div className='flex flex-row items-center gap-12 w-[90px]'>
                        <LuChevronLeft onClick={() => handlePageNumber("prev")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                        <LuChevronRight onClick={() => handlePageNumber("next")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                    </div>


                </div>

            </div>
        </div>

    );
}






























