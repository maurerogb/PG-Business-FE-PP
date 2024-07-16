"use client"

import React, { useEffect } from 'react'

export default function SimpleModal({ data, setTotalAmount }: any) {

    useEffect(() => {
        if (data) {
            setTotalAmount(data?.amount)
        }
    }, [data])
    return (
        <div className="2xl:w-[55%] w-[70%] flex flex-col items-center py-20 px-[24px] self-center bg-white rounded-[10px] border-[#D6D6D6] border">
            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-[#555555] text-[16px] leading-normal font-[600]">
                    Description
                </p>
                <p className="text-[#555555] text-[16px] leading-normal font-[600]">
                    Enter amount
                </p>

            </div>
            <div className="flex flex-row items-start justify-between w-full pt-4 pb-9 border-b border-dashed border-[#999999]">
                <p className="text-[#115570] text-[20px] leading-normal font-[400] w-[289px] text-start">
                    {data?.invoiceNote}
                </p>
                <p className="text-[#0C394B] text-[24px] leading-normal font-[600]">
                    {
                        `NGN ${data?.amount?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}`
                    }
                </p>
            </div>
            <div className="flex flex-row items-start justify-between w-full pt-6">
                <p className="text-[#555555] 2xl:text-[32px] text-[16px] leading-normal font-[600] w-[289px] text-start">
                    Total
                </p>
                <p className="text-[#555555] 2xl:text-[32px] text-[24px] leading-normal font-[600]">
                    {
                        `NGN ${data?.amount?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}`
                    }
                </p>
            </div>
        </div>
    )
}
