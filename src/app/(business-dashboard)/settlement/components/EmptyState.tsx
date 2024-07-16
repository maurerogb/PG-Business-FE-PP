"use client"
import React from 'react'
import { LuInbox } from "react-icons/lu"
import { Button } from "components/ui/button"
import Link from "next/link"


const EmptyState = () => {
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='mb-[18px] bg-[#BFEFFF33] rounded-[11px] w-[114px] h-[109px] flex flex-row items-center justify-center'>
                <LuInbox className='text-[74px] text-[#23AAE1]' />
            </div>
            <p className='text-[#07222D] text-center text-[20px] leading-[125%] font-[700] mb-[10px]'>
                No Settlement Recorded
            </p>
            <p className='text-[#555555] w-[418px] text-center text-[16px] leading-[136.5%] font-[400] mb-[18px]'>
                When you start receiving payment, you will have your settlement record here
            </p>
            {/* <Button
                className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
                Run Settlements

            </Button> */}
        </div>
    )
}

export default EmptyState