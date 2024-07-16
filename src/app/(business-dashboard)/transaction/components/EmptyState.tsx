"use client"
import React from 'react'
import { FaRegFolder } from "react-icons/fa"
import { Button } from "components/ui/button"
import Link from "next/link"


const EmptyState = () => {
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='mb-[18px] bg-[#BFEFFF33] rounded-[11px] w-[114px] h-[109px] flex flex-row items-center justify-center'>
                <FaRegFolder className='text-[66px] text-[#177196]' />
            </div>
            <p className='text-[#07222D] text-center text-[16px] leading-[125%] font-[700] mb-[10px]'>
                You have no transactions in the last few days, but you can change that.</p>
            <p className='text-[#555555] text-center text-[16px] leading-[136.5%] font-[400] mb-[18px]'>

                create a payment link or send them invoices.
            </p>

        </div>
    )
}

export default EmptyState