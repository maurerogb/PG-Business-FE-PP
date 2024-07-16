"use client"

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'


export default function NavComponent() {
    const pathName = usePathname()
    // console.log("pathName: ", pathName)
    return (
        <div className="flex flex-row items-end">
            <Link href={"/settings/profile"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/profile" || pathName === "/settings" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Profile
            </Link>
            <Link href={"/settings/business-profile"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/business-profile" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Business Profile
            </Link>
            <Link href={"/settings/business-type"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/business-type" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Business Type
            </Link>
            <Link href={"/settings/security"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/security" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Security
            </Link>
            <Link href={"/settings/notification"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/notification" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Notification
            </Link>
            <Link href={"/settings/device"} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${pathName === "/settings/device" ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
                Device
            </Link>
        </div>
    )
}
