"use client"

import { Metadata } from "next";
import EmptyState from "./components/EmptyState";
import { Button } from "components/ui/button"
import { MdContactSupport } from "react-icons/md";
import { useState } from "react";
import POSRequestForm from "./components/pos-request-form";
import { z } from "zod"
import TerminalForm from "./components/request-pos";
import POSTable from "./components/table";
import { useQuery } from "@tanstack/react-query"
import { getTerminals } from "api/POS-terminal"
import ViewTransactions from "./components/view-transactions";
// export const metadata: Metadata = {
//   title: "Get Started",
//   description: "Business page as it should be",
// };




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
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<any>()


  const GetParameters = { currentPageNumber: page, merchantId, rowCount: row, token }
  const data: any = useQuery(['getTerminals', GetParameters], () => getTerminals(GetParameters));

  console.log("terminals: ", data?.data?.responseObject)

  const handleModalPOSpopup = () => {
    console.log("testing");
    setPopup((value) => !value);
  }



  return (
    <div className="relative w-full h-full flex flex-col">

      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Terminals</p>


      {/* <div className="flex flex-row items-start justify-end w-full">
        {
          data?.data?.responseObject?.list.length ?
            <Button
              onClick={() => setPopup(true)}
              className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
              Request POS Terminal
            </Button> : ""
        }
      </div> */}
      {isModalOpen ? <ViewTransactions modalData={modalData} handleModalPOSpopup={setModalOpen} /> : ""}


      {popup ?
        <TerminalForm handleModalPOSpopup={setPopup} />
        :
        ""}
      {
        data?.data?.responseObject?.list.length ?
          <div className="w-full mt-[35px] self-center">
            <POSTable setModalData={setModalData} setModalOpen={setModalOpen} setPage={setPage} page={page} row={row} setRow={setRow} terminalTableData={data?.data?.responseObject} />
          </div> :
          <div className="w-[602px] mt-[132px] self-center">
            <EmptyState handleModalPOSpopup={handleModalPOSpopup} />
          </div>
      }

    </div>
  )
}

