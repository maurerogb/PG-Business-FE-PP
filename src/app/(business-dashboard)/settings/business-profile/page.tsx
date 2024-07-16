"use client"

import React, { useState } from 'react'
import BusinessInfoForm from './business-info-form'
import AccountInfoForm from './account-info'
import { Button } from "components/ui/button"
import Link from "next/link"
import { useEffect } from "react";
import { useHydrateStore, useUserStore } from "store"







export default function page() {

  const userDetail = useHydrateStore(useUserStore, (state) => state.user);

  // console.log(userDetail)



  return (
    <div className="flex flex-col items-start w-full pl-8">
    
      <div className="flex flex-row items-center justify-between w-full gap-1 pr-8">
        <p className="text-[#115570] text-[20px] leading-[125%] font-[600]">
          {`Business profile for ${userDetail?.primaryBusinessName}`}
        </p>
        <Button
          asChild
          className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
        >
          <Link href={"/dashboard/update-about-business/page-one"}>Add new business</Link>
        </Button>
      </div>
      <div className="self-center flex flex-col items-center gap-4 mt-[45px] w-full">
        <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Business information</p>
        <BusinessInfoForm />
      </div>
      <div className="self-center flex flex-col items-center gap-4 mt-[51px] w-full">
        <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Account information</p>
        <AccountInfoForm />
      </div>
    </div>
  )
}
