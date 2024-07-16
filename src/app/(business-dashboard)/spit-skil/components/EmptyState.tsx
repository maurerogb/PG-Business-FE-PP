"use client"
import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5"
import { Button } from "components/ui/button"
import Link from "next/link"


const EmptyState = () => {
    return (
        <div className='flex flex-col items-center w-full bg-white border-[#BFEFFFF5] border-[1px] rounded-[10px] py-[30px] px-[60px]'>
            <div className='mb-[18px] bg-[#BFEFFF33] rounded-[100px] w-[106px] h-[106px] flex flex-row items-center justify-center'>
                <IoNotificationsOutline className='text-[70px] text-[#177196]' />
            </div>
            <p className='text-[#07222D] text-center text-[16px] leading-[125%] font-[700] mb-[10px]'>
                This features is coming soon
            </p>
            <p className='text-[#555555] text-center text-[16px] leading-[136.5%] font-[400] mb-[18px]'>
                This feature is not available yet we will notify you once is ready for delivery
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