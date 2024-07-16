"use client"

import { Metadata } from "next";
import EmptyState from "./components/EmptyState";
import { Button } from "components/ui/button"
import { useEffect, useState } from "react";
import POSRequestForm from "./components/pos-request-form";
import { z } from "zod"
import TerminalForm from "./components/request-pos";
import POSTable from "./components/table";
import { useQuery } from "@tanstack/react-query"
import { getTerminalRequests } from "api/POS-terminal"
import { useRouter } from "next/navigation";






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



const posSchem = z.object({
  quantity: z.number(),
  terminalBrand: z.string(),
  merchantId: z.number(),
  terminalType: z.string(),
  iAgree: z.boolean(),
})
export default function POS() {
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [row, setRow] = useState<string>("5")
  const [page, setPage] = useState<string>("0")
  const [search, setSearch] = useState<string>("")
  const [invoiceStatus, setInvoiceStatus] = useState<string>("")
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [filter, setFilter] = useState<any>()
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const GetParameters = { currentPageNumber: page, merchantId, rowCount: row, token }
  const data: any = useQuery(['getTerminalRequest', GetParameters], () => getTerminalRequests(GetParameters));

  console.log("terminal request: ", data?.data?.responseObject)

  const handleModalPOSpopup = () => {
    console.log("testing");
    setPopup((value) => !value);
  }

  useEffect(() => {
    console.log("data......", isDataUpdated)
    if (isDataUpdated) {
      router.push(`/terminal-requests`)
      // router.refresh()
    }
  }, [isDataUpdated])


  return (
    <div className="relative w-full h-full flex flex-col">


      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Terminal Requests</p>


      <div className="flex flex-row items-start justify-end w-full">
        {
          data?.data?.responseObject?.list.length ?
            <Button
              onClick={() => setPopup(true)}
              className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
              Request POS Terminal
            </Button> : ""
        }
      </div>


      {popup ?
        <TerminalForm setIsDataUpdated={setIsDataUpdated} handleModalPOSpopup={setPopup} />
        :
        ""}
      {
        data?.data?.responseObject?.list.length ?
          <div className="w-full mt-[35px] self-center">
            <POSTable setPage={setPage} page={page} row={row} setRow={setRow} terminalTableData={data?.data?.responseObject} />
          </div> :
          <div className="w-[602px] mt-[132px] self-center">
            <EmptyState handleModalPOSpopup={handleModalPOSpopup} />
          </div>
      }

    </div>
  )
}

