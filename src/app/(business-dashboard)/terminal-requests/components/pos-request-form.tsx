"use client"

import { ScrollArea } from "components/ui/scroll-area"
import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { Button } from "components/ui/button"
import { useToast } from "components/ui/use-toast"
import { number, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
// import { NumericFormat, PatternFormat } from "react-number-format"
import { Input } from "components/ui/input"
import { numberFormat } from "utils/numberFormater"
import { useMutation } from "@tanstack/react-query"
import { terminalRequest } from "api/pos"
import { useRouter } from "next/navigation";

const terminalTypes = [
  {
    cost: 20000,
    terminalName: "PAX A910",
  },
  { cost: 20000, terminalName: "PAX A910S" },
  { cost: 0, terminalName: "INDECO" },
  { cost: 10000, terminalName: "TPO900" },
]

const posSchem = z.object({
  quantity: z.number(),
  headerName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // iAgree: z.boolean(),
})

const POSRequestForm = ({ handleModalPOSpopup }: any) => {
  const { toast } = useToast()
  const [merchantId, setMerchantId] = useState<number>(0)
  const [business, setBusiness] = useState("")
  const [terminal, setTerminal] = useState("")
  const [cost, setCost] = useState<number>()
  const router = useRouter();
  const posForm = useForm<z.infer<typeof posSchem>>({
    resolver: zodResolver(posSchem),
  })

  // terminalBrand: z.string(),
  const merchantLst = JSON.parse(localStorage.getItem("merchantList") as any) as API.MerchantList

  console.log(JSON.stringify(merchantLst))

  const onBusinessChange = (e: any) => {
    const bname = e.target.value
    setBusiness(bname)
    const id = merchantLst.find((l) => l.businessName === bname)?.id || 0
    setMerchantId(id)
  }

  const posFormMutation = useMutation({
    mutationFn: terminalRequest,
    onSuccess: async (data) => {
      const responseData: API.Reponse = (await data.json()) as API.Reponse

      if(responseData?.statusCode === "403"){
        localStorage.clear()
        router.push("/login");
      }

      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Invoice Created",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
        posForm.reset()
        setTerminal("")
        setCost(0)
        //setMerchantId(0)
        //setBusiness("")
        handleModalPOSpopup()
      }

    },
    onError: (e) => {
      console.log(e)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      })
    },
  })

  const handleSubmitClick = (value: any) => {
    const data: API.TerminalsRequest = {
      ...value,
      merchantId: merchantId,
      terminalBrand: terminal,
      terminalType: "POS"      
    }
    posFormMutation.mutate(data)
  }

  const onTerminalChange = (e: any) => {
    const term = terminalTypes.find((l) => l.terminalName === e.target.value)
    setCost(term?.cost)
    setTerminal(term?.terminalName || "")
  }

  return (
    <div className="z-10 w-full h-full  fixed top-0 left-0 flex flex-col items-center bg-[#828B8E85] ">
      <ScrollArea className="w-full h-full ">
        <div className="flex flex-col items-center w-full  h-full pb-0 mt-[50px]">
          <div className="relative rounded-[25px] w-[650px] bg-[#fff] px-[25px] pt-[28px] pb-[30px] flex flex-col ">
            <div className="w-full mt-0 mb-3">
              <div className="flex flex-col    w-full pb-3  ">
                <MdClose
                  onClick={() => handleModalPOSpopup()}
                  className="absolute top-[24px] right-[26px] text-[20px] text-[#F61212] cursor-pointer"
                />
                <div className="flex flex-col items-start w-full">
                  <p className="text-[16px] text-[#5C5F61] font-[700] leading-normal">Request POS Terminal</p>

                  <p className=" text-[#177196]    leading-normal">Complete and enter the following form below</p>
                </div>
              </div>
            </div>

            {JSON.stringify(posForm.getValues)}
            <Form {...posForm}>
              <div className=" w-full  items-center z-20 mb-6 gap-5">
                <form>
                  {/* <FormField   /> */}

                  <div className="mb-6">
                    <div>
                      <label className=".text-gray-400 ">Business Name</label>
                    </div>
                    <select
                      className="w-full p-3 border   border-blue-400 rounded-[5px] focus-visible:border-blue-400 "
                      onChange={(event: any) => onBusinessChange(event)}
                    >
                      <option value="">Select Business...</option>
                      {merchantLst?.map((item) => {
                        return (
                          <option value={item.businessName} key={item.id}>
                            {item.businessName}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="mb-6">
                    <div>
                      <label className="">Terminals Type</label>
                    </div>
                    <select
                      onChange={(event: any) => onTerminalChange(event)}
                      className="w-full p-3 border   border-blue-400 rounded-[5px] focus-visible:border-blue-400 "
                    >
                      <option value="">Select Terminals...</option>
                      {terminalTypes.map((item) => {
                        return <option value={item.terminalName}>{item.terminalName}</option>
                      })}
                    </select>
                  </div>

                  <div className="mb-6">
                    <FormField
                      name="headerName"
                      control={posForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Slip Header Name</FormLabel>
                          <FormControl>
                            <Input title="Input is only number" placeholder="Enter  Header Name" value={business} />
                          </FormControl>

                          {/* <FormDescription>To get your BVN dial *565*0# on your registered mobile number.</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <PatternFormat format="+234 (####) ### ####" allowEmptyFormatting mask="_" />; */}
                  <div>
                    <label className="">Cost</label>
                  </div>
                  {/* <NumericFormat
                    className="w-full p-3 border mb-5 border-blue-400 rounded-[5px] focus-visible:border-blue-400  "
                    value={cost}
                    allowLeadingZeros
                    thousandSeparator=","
                  /> */}

                  <FormField
                    name="quantity"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Quantity</FormLabel>
                        <FormControl>
                          <Input title="Input is only number" onInput={(event) => numberFormat(event)} placeholder="Enter Quantity" {...field} />
                        </FormControl>

                        {/* <FormDescription>To get your BVN dial *565*0# on your registered mobile number.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </div>

              <div className="flex flex-col items-center w-full gap-3 pt-1">
                <Button
                  onClick={() => handleSubmitClick(posForm.getValues())}
                  className="min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default POSRequestForm
