"use client"

import { Button } from "components/ui/button"
import { useEffect, useState } from "react"
import { LuChevronDown } from "react-icons/lu"
import { IoSearchSharp } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Label } from "components/ui/label"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { addDays, format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover"
import { useToast } from "components/ui/use-toast";
import EmptyState from "./components/empty-state"
import InvoiceTable from "../generate-invoice/components/table"
import { getAllInvoice } from "api/invoice"
import { useQuery } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query";
import { filterInvoices } from "api/invoice";


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


export default function Invoice() {
  const GetIntialRowParameter = { currentPageNumber: 0, merchantId: merchantId, rowPerPage: 1, emptyObject: {}, token }
  const getRowValue: any = useQuery(['getAllInvoice', GetIntialRowParameter], () => getAllInvoice(GetIntialRowParameter as any));
  console.log("Data to get row numbers: ", getRowValue?.data?.responseObject?.totalCount)

  // const [data, setData] = useState<any>(null)
  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [row, setRow] = useState<string>(getRowValue?.data?.responseObject?.totalCount?.toString() || "500")
  const [page, setPage] = useState<string>("0")
  const [search, setSearch] = useState<string>("")
  const [invoiceStatus, setInvoiceStatus] = useState<string>("")
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const { toast } = useToast();
  const [filter, setFilter] = useState<any>()
  // const [tableDataResponse, setTable] = useState<any>()
  const GetParameters = { currentPageNumber: page, merchantId: merchantId, rowPerPage: row, emptyObject: {}, token }
  const data: any = useQuery(['getAllInvoice', GetParameters], () => getAllInvoice(GetParameters));

  const [searchResults, setSearchResults] = useState<any>(() => filter ? filter : data?.data?.responseObject);

  console.log(data)
  useEffect(() => {
    setSearchResults(() => filter ? filter : data?.data?.responseObject)
  }, [data?.data?.responseObject, filter])

  const filterMutation = useMutation({
    mutationFn: filterInvoices,
    onSuccess: async (data: any) => {
      const responseData: API.InvoiceStatusReponse =
        (await data.json()) as API.InvoiceStatusReponse;

      if (responseData?.statusCode === "1") {

        toast({
          variant: "destructive",
          title: "",
          description: "Error Filtering Invoice",
        });
      }

      if (responseData?.statusCode === "0") {
        setFilter({ list: responseData?.responseObject, totalCount: responseData?.responseObject?.length } as any)
        toast({
          variant: "default",
          title: "Invoice Filter Success",
          description: responseData?.responseObject?.length === 0 ? "No match found" : "Invoice Filtered",
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });

      }
    },

    onError: (e) => {

      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });


  const handleFilter = (e: any) => {
    e?.preventDefault();
    setPage("0")
    const requestData = {
      invoiceStatus,
      emailAddress,
      startDate: date?.toISOString().split("T")[0],
      endDate: date1?.toISOString().split("T")[0],
      merchantId,
      token
    }
    // console.log(requestData)
    filterMutation.mutate(requestData as any);

  }


  // console.log(data?.data?.responseObject?.list)
  // console.log(merchantId)
  // console.log("search result: ", searchResults)

  // useEffect(() => {
  //   if (searchResults?.totalCount === 0) {
  //     console.log("search not available")
  //     if (filter?.totalCount !== 0 && filter?.totalCount !== undefined) {
  //       console.log("filter set: ", filter?.totalCount)
  //       setSearchResults(filter)
  //     } else if (data?.data?.responseObject?.totalCount !== 0) {
  //       console.log("data set")

  //       setSearchResults(data?.data?.responseObject)
  //     }
  //   }
  // })
  const handleSearch = () => {
    if (search === "" || search.length === 0) {
      setSearchResults(data?.data?.responseObject)
      return
    }
    if (!filter || filter?.totalCount === 0) {
      const filteredResults = data?.data?.responseObject?.list.filter((item: any) => {
        const { customerName, customerEmail, id } = item;
        const searchLower = search.toLowerCase();

        return (
          customerName.toLowerCase().includes(searchLower) ||
          customerEmail.toLowerCase().includes(searchLower) ||
          id.toString().includes(searchLower)
        );
      });
      setSearchResults({ list: filteredResults, totalCount: filteredResults?.length } as any)
    } else {
      const filteredResults = filter?.list?.filter((item: any) => {
        const { customerName, customerEmail, id } = item;
        const searchLower = search.toLowerCase();

        return (
          customerName.toLowerCase().includes(searchLower) ||
          customerEmail.toLowerCase().includes(searchLower) ||
          id.toString().includes(searchLower)
        );
      });
      setSearchResults({ list: filteredResults, totalCount: filteredResults?.length } as any)

    }

  };

  const handleEnterSearch = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }


  return (<div className="relative w-full h-full flex flex-col">

    <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Invoice</p>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-[18px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="outline-[#D3EEF9] border border-[#D3EEF9] border-solid h-[45px] flex flex-row items-center gap-[10px] text-[14px] font-bold text-[#666666] leading-[150%]">
              Filter
              <LuChevronDown className="mt-[2px] text-[24px] text-[#666666]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[298px] p-[22px]">
            <form className="w-full flex flex-col">

              <div className="flex flex-col space-y-1.5 mb-[24px]">
                <Label htmlFor="status" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Invoice Status</Label>
                <Select
                  onValueChange={setInvoiceStatus}
                  value={invoiceStatus}
                >
                  <SelectTrigger id="status" className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]">
                    <SelectValue placeholder="Show all" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-[101px] p-[6px]">
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="NOTPAID">Not paid</SelectItem>
                    <SelectItem value="REVOKE">Revoke</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-start mb-[24px]">
                <label htmlFor="email" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Email Address</label>
                <input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Email" id="email" type="email" className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]" />
              </div>
              <div className="flex flex-col items-start gap-[8px] w-full">
                <label htmlFor="date" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Time range</label>
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

                        {date ? format(date, "PPP") : <span className="text-[#000000] text-[16px] leading-normal font-[400]">Start Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      <div className="rounded-md border">
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

                        {date1 ? format(date1, "PPP") : <span className="text-[#000000] text-[16px] leading-normal font-[400]">End Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      <div className="rounded-md border">
                        <Calendar mode="single" selected={date1} onSelect={setDate1} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

              </div>
              <Button
                onClick={(e) => handleFilter(e)}
                className="mt-[27px] self-center rounded-[8px] w-[85%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
              >
                Filter
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-1 rounded-[8px] border border-solid border-[#D6F5FFD9] bg-[#F3FCFF] w-[450px] h-[45px] relative">
          <input value={search} onKeyPress={(event: any) => handleEnterSearch(event)} onChange={(e => setSearch(e.target.value))} type="text" placeholder="Search Invoice ID, customer email or name" className="placeholder:text-[#49454F] placeholder:text-[16px] placeholder:leading-[24px] placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent" />
          <IoSearchSharp onClick={handleSearch} className="absolute right-[23px] top-[8.75px] cursor-pointer text-[26px] text-[#49454F]" />
        </div>
      </div>
      {
        data?.data?.responseObject?.list.length ?
          <Button
            asChild
            className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
          >
            <Link href={"/generate-invoice"}>Generate Invoice</Link>
          </Button> : ""
      }

    </div>
    {
      data?.data?.responseObject?.list.length ?
        <div className="w-full mt-[35px] self-center">
          <InvoiceTable setPage={setPage} page={page} row={row} setRow={setRow} invoiceTableData={searchResults} />
        </div> :
        <div className="w-[602px] mt-[132px] self-center">
          <EmptyState />
        </div>
    }


  </div>)
}








// filter ? filter : data?.data?.responseObject