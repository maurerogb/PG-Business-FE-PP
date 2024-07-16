// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Get Started",
//   description: "Business page as it should be",
// };

// export default function Settlement() {
//   return <main>coming soon</main>;
// }

"use client"

import * as React from "react"
import { Button } from "components/ui/button"
import EmptyState from "./components/EmptyState"
import { zodResolver } from "@hookform/resolvers/zod"
import { LuChevronDown } from "react-icons/lu"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Form, FormControl, FormField, FormItem } from "components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import RefundTable from "./components/refund-table"
import { listTransactionTickets } from "api/dispute"
import RefundView from "./components/refund-view"

const channel = [
  { label: "Processing", value: "1" },
  { label: "Processed", value: "2" },
  { label: "Pending", value: "3" },
  { label: "Failed", value: "4" },
] as const

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
})

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

// export function transactionForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   })

const Refund = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [row, setRow] = useState<string>("5")
  const [page, setPage] = useState<string>("0")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<any>()

  const GetParameters = { currentPageNumber: page, request: {}, merchantId: merchantId, rowPerPage: row, token }
  const data: any = useQuery(["listTransactionTickets", GetParameters], () => listTransactionTickets(GetParameters))


  return (
    <div className="relative flex flex-col w-full h-full">


      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Refund</p>

      <Form {...form}>
        <form className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between w-full gap-[18px]">
              <div className=" inline-flex  items-center justify-center gap-[10px] ">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? channel.find((language) => language.value === field.value)?.label : "Select channel"}
                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." className="h-9" />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {channel.map((ch) => (
                                <CommandItem
                                  value={ch.label}
                                  key={ch.value}
                                  onSelect={() => {
                                    form.setValue("language", ch.value)
                                  }}
                                >
                                  {ch.label}
                                  <CheckIcon className={cn("ml-auto h-4 w-4", ch.value === field.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {/* <FormLabel>Date of birth</FormLabel> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange as any}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="inline-flex items-center justify-center flex-right">
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
                  <DropdownMenuContent align="start" className="w-[298px] p-[22px]">
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
                          <SelectContent position="popper" className="w-[101px] p-[6px]">
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Not paid">Not paid</SelectItem>
                            <SelectItem value="Revoke">Revoke</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col items-start mb-[24px]">
                        <label htmlFor="email" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                          Amount
                        </label>
                        <input
                          placeholder="Amount"
                          id="email"
                          type="email"
                          className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[8px] mb-[24px] w-full">
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
                      <div className="flex flex-col items-start mb-[24px]">
                        <label htmlFor="email" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                          Transaction Reference
                        </label>
                        <input
                          placeholder="Transaction Reference"
                          id="email"
                          type="email"
                          className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                        />
                      </div>
                      <Button className="mt-[27px] self-center rounded-[8px] w-[85%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal">
                        Filter
                      </Button>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </form>
      </Form>
      {
        modalOpen ?
          <RefundView setModalOpen={setModalOpen} modalData={modalData} />
          :
          ""
      }

      {data?.data?.responseObject?.list.length ? (
        <div className="w-full mt-[35px] self-center">
          <RefundTable setModalData={setModalData} setModalOpen={setModalOpen} setPage={setPage} page={page} row={row} setRow={setRow} invoiceTableData={data?.data?.responseObject} />
        </div>
      ) : (
        <div className="w-[602px] mt-[132px] self-center">
          <EmptyState />
        </div>
      )}
    </div>
  )
}

export default Refund
