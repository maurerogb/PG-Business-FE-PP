"use client"

import React, { useState } from 'react'
import Security from './security'
import Payment from './payment'
import { getMerchantSetting } from "api/settings"
import { useQuery } from "@tanstack/react-query"
import { Label } from "components/ui/label";
import { Switch } from "components/ui/switch";

export default function page() {
    const [mode, setMode] = useState<boolean>(false)

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

    const GetParameters = { merchantId, token }
    const data: any = useQuery(['getMerchantSetting', GetParameters], () => getMerchantSetting(GetParameters));
    return (
        <div className="flex flex-col items-start w-full gap-8 pl-8">
            <div className="flex flex-row items-center gap-2 mb-4">
                <Label
                    htmlFor="modes"
                    className="inline-block text-[13px] font-semibold text-primary-70"
                >
                    {mode === false ? "Test mode" : "Live mode"}
                </Label>
                <Switch
                    checked={mode}
                    onCheckedChange={() => setMode(!mode) as any}
                    id="modes"
                    className="inline-block data-[state=checked]:bg-primary-70"
                />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Security</p>
                <Security data={data?.data?.responseObject} />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Payment</p>
                <Payment data={data?.data?.responseObject} />
            </div>

        </div>
    )
}
