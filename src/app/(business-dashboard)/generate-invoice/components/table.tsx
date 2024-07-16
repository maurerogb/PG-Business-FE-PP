"use client"


import React, { useState } from 'react'
import { IoMdCheckmark } from "react-icons/io"
import { LuChevronsRight } from "react-icons/lu"
import { SlOptions } from "react-icons/sl"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "components/ui/button"
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { deleteInvoice } from "api/invoice";



import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import { ScrollArea } from 'components/ui/scroll-area'
import { RiArrowDropDownFill } from "react-icons/ri"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import DeletePopup from './delete-popup'



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


const InvoiceTable = ({ invoiceTableData, row, setRow, setPage, page }: any) => {

    console.log("rowperpage: ", row)
    console.log("page: ", page)
    console.log("available row per page: ", invoiceTableData?.list?.length)
    // console.log(invoiceTableData)

    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | undefined | null>("")
    const [deletePopup, setPopup] = useState<boolean>(false)
    const heading = ["Invoice No.", "Date", "Customer Name", "Amount", "Status", "option"]
    const router = useRouter();
    const handlePageNumber = (option: any) => {
        if (option === "next") {
            if (page < Math.ceil(invoiceTableData?.totalCount / row) - 1) {
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
    const handleView = (id: any) => {
        if (typeof window) {
            router.push(`/invoice-details?id=${id}`);
        }
    }



    const deleteInvoiceMutation = useMutation({
        mutationFn: deleteInvoice,
        onSuccess: async (data: any) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;

            if (responseData?.statusCode === "1") {
                setPopup(false)
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Deleting Invoice",
                });
            }

            if (responseData?.statusCode === "0") {
                setPopup(false)
                toast({
                    variant: "default",
                    title: "",
                    description: "Invoice Deleted",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });

                if (typeof window) {
                    router.push(`/invoice`);
                }
            }
        },

        onError: (e) => {
            setPopup(false)
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });


    // console.log(invoiceTableData?.list)
    const handleDelete = (id: string) => {
        const requestData = {
            token,
            merchantId,
            invoiceId: id
        }
        // console.log(requestData)
        deleteInvoiceMutation.mutate(requestData as any);

    }

    const handleDeletePopup = (id: string) => {
        setDeleteId(id)
        setPopup(true)
    }
    return (
        <div className='flex flex-col items-center relative'>
            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                {
                    heading.map((value, id) => {
                        if (value === "option") {
                            return (

                                <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[5%] font-raleway'>

                                </p>
                            )
                        } else {
                            return (
                                <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>
                                    {value}
                                </p>
                            )
                        }
                    })

                }
            </div>
            <ScrollArea className='w-full h-[400px]'>

                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                    {invoiceTableData?.list?.map(({ id, amount, customerName, InvoiceNo, invoiceStatus, dueDate }: any, idx: React.Key | null | undefined) => {
                        return <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full h-[44px]'>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`PAY${String(id).padStart(8, '0')}`}</p>
                            {!dueDate ?
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>
                                    N/A
                                </p>
                                :
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] w-[20%] text-center font-raleway'>
                                    {dueDate}
                                </p>
                            }
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>
                                {customerName ? customerName : "N/A"}
                            </p>

                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>
                                {`₦ ${amount?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}`}
                            </p>

                            <div className='flex flex-col items-center w-[20%]'>
                                {invoiceStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Pending"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "DRAFT" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#115570] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Draft"}
                                    <LuChevronsRight className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "PAID" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Paid"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "NOTPAID" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Not paid"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "DELETED" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Deleted"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                            </div>
                            <div className='w-[5%] flex flex-row items-center justify-start gap-[20px]'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className='outline-none border-none'>
                                            <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
                                        </Button>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
                                        <div className='w-full flex flex-col items-center gap-2'>
                                            {invoiceStatus === "DELETED" ? "" : <p onClick={() => handleView(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                View
                                            </p>}
                                            {/* <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Download
                                            </p> */}
                                            {invoiceStatus === "DELETED" ? "" : <p onClick={() => handleDeletePopup(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Delete
                                            </p>}
                                            {/* {invoiceStatus === "DELETED" ? "" : <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Revokell
                                            </p>} */}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>

                        </div>
                    })}
                </div>
            </ScrollArea>

            <div className='w-full h-10 mb-6 flex flex-row items-center gap-12 justify-end bg-white pr-[20px]'>

                <div className='flex flex-row items-center w-[155px]'>
                    <span className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-full flex flex-row items-center'>{`Rows per page: ${row === "500" ? "All" : row}`}</span>
                    <Select
                        onValueChange={(value) => setRow(value)}
                        value={row}
                    >
                        <SelectTrigger className='w-fit border-none shadow-none' >
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value={invoiceTableData?.totalCount}>All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-[70px] flex flex-row items-center'>
                    {`${(((Number(page) + 1) - 1) * Number(row)) + 1}-${(Number(page) + 1) * Number(invoiceTableData?.list?.length)} of ${invoiceTableData?.totalCount}`}
                </p>
                <div className='flex flex-row items-center gap-12 w-[90px]'>
                    <LuChevronLeft onClick={() => handlePageNumber("prev")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                    <LuChevronRight onClick={() => handlePageNumber("next")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                </div>


            </div>
            {
                deletePopup ? <DeletePopup setPopup={setPopup} deleteId={deleteId} handleDelete={handleDelete} /> : ""
            }


        </div>
    )
}

export default InvoiceTable

















