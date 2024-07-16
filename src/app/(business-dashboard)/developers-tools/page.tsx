"use client"


import { getMerchantByCode } from "api/developers-tools"
import { useQuery } from "@tanstack/react-query"
import { ScrollArea } from "components/ui/scroll-area";
import ApiConfiguration from "./components/api-config";
import MerchantCredentials from "./components/merchant-credentials";
import WebHook from "./components/web-hook";
import DeveloperAuth from "./components/auth-modal"
import { useState } from "react"



let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""
let merchantCode: any = ""

if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
  merchantCode = merchantList[0]?.merchantCode
}

// console.log(merchantCode)

export default function DevelopersTools() {
  const GetParameters = { merchantCode, token }
  const data: any = useQuery(['getMerchantByCode', GetParameters], () => getMerchantByCode(GetParameters));
  const [authenticate, setAuthenticate] = useState<boolean>(false)
  const [isKeyOpen, setKey] = useState<boolean>(false)

  // console.log(data?.data?.responseObject[0])

  return <main className="relative w-full h-full flex flex-col">

    <p className="text-[#177196] text-[36px] font-[600] leading-normal mb-[40px] mt-[24px]">Developers Tools</p>
    <ScrollArea className="w-full pr-2">
      <div className="w-full flex flex-col items-center gap-4 pb-20 ">
        <ApiConfiguration isKeyOpen={isKeyOpen} setAuthenticate={setAuthenticate} />
        <MerchantCredentials data={data?.data?.responseObject[0]} />
        <WebHook data={data?.data?.responseObject[0]} />
      </div>
    </ScrollArea>
    {authenticate ? <DeveloperAuth isOpen={authenticate} setOpen={setAuthenticate} setKey={setKey} /> : ""}
  </main>;
}
