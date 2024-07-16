"use client"
import React from 'react'
import { HiMiniReceiptRefund } from "react-icons/hi2"
import { Button } from "components/ui/button"
import Link from "next/link"


const EmptyState = () => {
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='mb-[18px] bg-[#BFEFFF33] rounded-[11px] w-[114px] h-[109px] flex flex-row items-center justify-center'>
                <HiMiniReceiptRefund className='text-[81px] text-[#177196]' />
            </div>
            <p className='text-[#07222D] text-center text-[16px] leading-[125%] font-[700] mb-[10px]'>
                No Refund</p>
            <p className='text-[#555555] text-center text-[16px] leading-[136.5%] font-[400] mb-[18px]'>

                there are no refund for this yet. please try again letter
            </p>
            {/* <Button
                asChild
                className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
                <Link href={"/generate-invoice"}>Generate Invoice</Link>

            </Button> */}
        </div>
    )
}

export default EmptyState