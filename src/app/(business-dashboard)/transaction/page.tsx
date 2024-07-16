"use client"

import { Metadata } from "next"
import * as React from "react"
import { Button } from "components/ui/button"
import { MdContactSupport } from "react-icons/md"
import EmptyState from "./components/EmptyState"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { LuChevronDown } from "react-icons/lu"
import { MdPrint } from "react-icons/md"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllInvoice } from "api/invoice"
import TransactionTable from "./components/transaction-table"
import { getAllTransaction } from "api/transaction"
import { formatMoneyAmount } from "utils/numberFormater"
import TransactionView from "./components/transaction-view"
import PrintTransactionTable from "./components/print-transactions"
import RaiseComplainForm from "./components/raise-complain"




const dropOptions: any[] = [
  { name: "POS", value: "pos" },
  { name: "USSD", value: "ussd" },
  { name: "Web", value: "web" },
  { name: "Bank Transfer", value: "bank" },
]


const transactionFilterNames: any[] = [
  {
    title: "Pending",
    value: "PENDING",
    id: "0"
  },
  {
    title: "Sucessful",
    value: "SUCCESSFUL",
    id: "1"
  },
  {
    title: "Failed",
    value: "FAILED",
    id: "2"
  },
]

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""

if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}


const Transaction = () => {

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  console.log(componentRef?.current)
  var request: API.TSearchRequest = {
    // endDate: "",
    // orderRef: "",
    // merchantCode: "",
    // startDate: "",
    // switchTransactionRef: "",
    // terminalCode: "",
    // transactionStatus: "",
  }

  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [row, setRow] = useState<string>("5")
  const [page, setPage] = useState<string>("0")
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState("")
  const [complainData, setComplainData] = useState()
  const [isComplainOpen, setComplain] = useState<boolean>(false)

  const GetParameters = { currentPageNumber: page, merchantId: merchantId, rowPerPage: row, request: {}, token }
  const data: any = useQuery(["getAllInvoice", GetParameters], () => getAllTransaction(GetParameters))

  console.log(date2);

  return (
    <div className="relative flex flex-col w-full h-full">

      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Transactions</p>

      {/* //----------Transaction filters start----------------- */}
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row items-start gap-9">

          {/* //--------------Channels------------------------------------- */}

          <Select
            // onValueChange={(value) => setRow(value)}
            value={row}
          >
            <SelectTrigger className="w-fit rounded-[8px] flex flex-row items-center justify-center gap-[10px] bg-[#D6F5FF33] border-[#EAF9FF] font-[400] text-[16px] text-[#02425C] leading-[136.5%]">
              All Channels
            </SelectTrigger>
            <SelectContent>
              {
                dropOptions.map(({ name, value }, id) => {
                  return <SelectItem value={value} key={id} className={`hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]`}>
                    {name}
                  </SelectItem>
                })
              }
            </SelectContent>
          </Select>

          {/* //--------------Date------------------------------------- */}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("bg-[#D6F5FF33] border-[#EAF9FF] w-fit flex flex-row items-center gap-3 pl-3 text-left font-normal", !date2 && "text-muted-foreground")}
              >
                {date2 ? format(date2, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date2}
                onSelect={setDate2}
                // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* //--------------Filter------------------------------------- */}
        <div className="flex flex-row items-start gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-[#D3EEF9] border border-[#D3EEF9] border-solid h-[45px] flex flex-row items-center gap-[10px] text-[14px] font-bold text-[#666666] leading-[150%]"
              >
                Filter
                <LuChevronDown className="mt-[2px] text-[24px] text-[#666666]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[298px] p-[22px]">
              <form className="flex flex-col w-full">
                <div className="flex flex-col space-y-1.5 mb-[24px]">
                  <Label htmlFor="status" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                    Transaction Status
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="status"
                      className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                    >
                      <SelectValue placeholder="Show all" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="p-[6px]">
                      {transactionFilterNames.map(({ title, value, id }) => {
                        return (
                          <SelectItem className="cursor-pointer hover:text-[#48B8E6]" key={id} value={value}>{title}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-start mb-[24px]">
                  <label htmlFor="amount" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                    Amount
                  </label>
                  <input
                    placeholder="Amount"
                    id="amount"
                    type="amount"
                    className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                    onChange={(event) => formatMoneyAmount(event)}
                  />
                </div>
                <div className="flex flex-col items-start gap-[8px] w-full">
                  <label htmlFor="date" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                    Time range
                  </label>
                  <div id="date" className="flex flex-row items-center gap-[3px] w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span className="text-[#000000] text-[16px] leading-normal font-[400]">Start Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-auto p-2 space-y-2">
                        <div className="border rounded-md">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date1 ? (
                            format(date1, "PPP")
                          ) : (
                            <span className="text-[#000000] text-[16px] leading-normal font-[400]">End Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-auto p-2 space-y-2">
                        <div className="border rounded-md">
                          <Calendar mode="single" selected={date1} onSelect={setDate1} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button className="mt-[27px] self-center rounded-[8px] w-[85%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal">
                  Filter
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* {data?.data?.responseObject?.list.length ? 
          <Button className="rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal">
            Download
          </Button> */}
          <Button
            onClick={() => handlePrint()}
            className="rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[5px] bg-[#48B8E6] font-bold text-white leading-normal"
          >
            {/* Download */}
            Print
            <MdPrint className="text-[20px]" /> 
          </Button>
          :<></>

        </div>

      </div>
      {/* //----------Transaction filters end----------------- */}

      {isComplainOpen ? <RaiseComplainForm complainData={complainData} handleModalPOSpopup={setComplain} /> : ""}

      <div className="hidden">
        <PrintTransactionTable Transactionref={componentRef} transactionTableData={data?.data?.responseObject} />
      </div>


      {isModalOpen ? <TransactionView modalData={modalData} setModalOpen={setModalOpen} /> : ""}

      {data?.data?.responseObject?.list.length ? (
        <div className="w-full mt-[35px] self-center">
          <TransactionTable setModalOpen={setModalOpen} setComplain={setComplain} setComplainData={setComplainData} setModalData={setModalData} setPage={setPage} page={page} row={row} setRow={setRow} transactionTableData={data?.data?.responseObject} />
        </div>
      ) : (
        <div className="w-[602px] mt-[132px] self-center">
          <EmptyState />
        </div>
      )}
    </div>
  )
}

export default Transaction
