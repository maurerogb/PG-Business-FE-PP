"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { LuChevronDown } from "react-icons/lu"
import { format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { FiPlus } from "react-icons/fi"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Textarea } from "components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
// import { getMerchantSetting } from "../../../../../api/settings"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "api/settings"

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

const PersonalSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: "Only alphabetic characters are allowed.",
  }),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: "Only alphabetic characters are allowed.",
  }),
  gender: z.string(),
  email: z.string().email(),
  phone: z.string(),
  code: z.string(),
})
export default function PersonalForm({ setVerifyModal, setEmail, email }: any) {
  const { toast } = useToast()
  const router = useRouter()
  const [receipt, setReceipt] = useState(false)
  const [popup, setPopup] = useState(false)
  const [modalData, setModalData] = useState<any>("")
  // const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState<any[]>([{ label: "Customer Email" }])

  const data: any = useQuery(["getMerchantSetting", token], () => getUserInfo(token))
  console.log(data, 'data');

  const prefill = data?.data?.responseObject

  let personalForm = useForm<z.infer<typeof PersonalSchema>>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      email: "",
      phone: "",
      code: "+234",
    },
  })
  const handleModal = (e: any) => { }

  // const personalFormMutation = useMutation({
  //     mutationFn: ,
  //     onSuccess: async (data) => {
  //         const responseData: API.InvoiceStatusReponse =
  //             (await data.json()) as API.InvoiceStatusReponse;
  //         if (responseData?.statusCode === "1") {
  //             toast({
  //                 variant: "destructive",
  //                 title: "",
  //                 description: "Error Creating Invoice",
  //             });
  //         }
  //         if (responseData?.statusCode === "0") {
  //             toast({
  //                 variant: "default",
  //                 title: "",
  //                 description: "Invoice Created",
  //                 className:
  //                     "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
  //             });
  //             personalForm.reset();
  //             if (typeof window) {
  //                 router.push(`/invoice`);
  //             }
  //         }
  //     },
  //     onError: (e) => {
  //         console.log(e);
  //         toast({
  //             variant: "destructive",
  //             title: `${e}`,
  //             description: "error",
  //         });
  //     },
  // });

  async function onSubmit(values: z.infer<typeof PersonalSchema>) {
    console.log(values)
    // let newValues = {
    //     ...values,
    //     amount: values?.amount?.toString(),
    //     dueDate: values?.dueDate?.toISOString().split("T")[0],
    //     additionalCustomerEmailAddress: [
    //         values?.email1,
    //         values?.email2,
    //         values?.email3,
    //     ]?.toString(),
    //     token: token,
    //     subject: subject,
    //     merchantId: merchantId
    // };
    // console.log(newValues);
    // simpleFormMutation.mutate(newValues as any);
  }
  // const modalRef = useRef<any>();
  // const handleModalSubmit = () => {
  //     modalRef.current.click()
  // }

  return (
    <Form {...personalForm}>
      <form
        onSubmit={personalForm.handleSubmit(onSubmit)}
        className="w-[550px] p-[40px] rounded-[24px] flex flex-col items-end bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >



        <FormField
          // disabled
          control={personalForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">First Name</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  disabled
                  type="text"
                  className="disabled:opacity-100 border-[#D6D6D6] placeholder:text-black rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2"
                  {...field}
                  value={prefill?.firstName}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          // disabled
          control={personalForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Last Name</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  disabled
                  type="text"
                  className="border-[#D6D6D6] placeholder:text-black disabled:opacity-100 rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2"
                  placeholder={prefill?.lastName}
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <FormField
          // disabled
          control={personalForm.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled
                    className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2"
                  >
                    <SelectValue defaultValue={field.value} placeholder={prefill?.gender} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {/* </div> */}

              <FormMessage className="self-end" />
            </FormItem>
          )}
        />

        <FormField
          // disabled
          control={personalForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Email address</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  disabled
                  type="email"
                  className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder={prefill?.emailAddress}
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="self-end" />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center w-full gap-[10px] my-6">
          <FormField
            // disabled
            control={personalForm.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex flex-row items-center w-full gap-4">
                  <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Phone Number</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        disabled
                        className="placeholder:text-black disabled:opacity-100 rounded-[6px] min-h-[46px] bg-[#F2FAFD] border-none w-[84px]"
                      >
                        <SelectValue defaultValue={field.value} placeholder="+234" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={"+234"}>
                      <SelectItem value="+234">+234</SelectItem>
                      <SelectItem value="percentage2">Percentage</SelectItem>
                      <SelectItem value="percentage3">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            // disabled
            control={personalForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full ">
                {/* <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Qty</FormLabel> */}
                <FormControl>
                  <Input
                    disabled
                    type="tel"
                    pattern="[0-9]*"
                    title="Input is only number"
                    className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                    placeholder={prefill?.mobileNumber}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/*
                <Button
                    disabled
                    className="mt-[32px] min-h-[48px] font-[700] w-[225px] hover:bg-[#1D8EBB] hover:opacity-[0.4] self-end"
                    type="submit"
                // onClick={(e) => handleModal(e)}
                >
                    Save Change
                </Button> */}
      </form>
    </Form>
  )
}
