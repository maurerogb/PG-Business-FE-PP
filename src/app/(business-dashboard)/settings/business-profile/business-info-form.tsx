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
import { useQuery } from "@tanstack/react-query"
import { getMerchantDetails } from "api/settings"
import { updateBusinessInfo } from "api/settings"
import { countryList } from "utils/countrylist"
import { useHydrateStore, useUserStore, useMerchantStore } from "store"
import { formatMoneyAmount, formatPercentValue, formatQuantity } from "utils/numberFormater"
import { FaBullseye } from "react-icons/fa"
import Image from "next/image";
import ImageModal from "./components/image-modal"




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


// console.log(merchantList[0]?.merchantCode)

const BusinessInfoSchema = z.object({
  businessName: z.string().optional(),
  businessDescription: z.string().optional(),
  businessEmail: z.string().email().optional(),
  phone: z.string().optional(),
  code: z.string().optional(),
  country: z.string().optional(),
  businessState: z.string().optional(),
  businessWebsite: z.string().optional(),
  businessLogoFile: z.custom<File>().optional(),
})
export default function BusinessInfoForm() {
  const userDetail = useHydrateStore(useUserStore, (state) => state.user); //getting merchant name from store
  const merchantDetailStore = useHydrateStore(useMerchantStore, (state) => state.currentMerchant); //getting merchant name from store
  // console.log(merchantDetailStore)
  const { toast } = useToast()
  const router = useRouter()
  const [receipt, setReceipt] = useState(false)
  const [popup, setPopup] = useState(false)
  const [modalData, setModalData] = useState<any>("")
  const [loading, setLoading] = useState(false);
  const [imgModal, setImgModal] = useState<boolean>(false);
  const [inputField, setInputField] = useState<any[]>([{ label: "Customer Email" }])
  const getParameters = {
    token,
    merchantCode: merchantDetailStore?.merchantCode,
  }
  const data: any = useQuery(["getMerchantDetails", getParameters], () => getMerchantDetails(getParameters))

  const prefill = data?.data?.responseObject[0]
  // console.log(prefill)
  // console.log(prefill?.primaryMobile?.split(")")[0].split("(")[1])
  // console.log(prefill?.primaryMobile?.split(")")[1])
  let businessInfoForm = useForm<z.infer<typeof BusinessInfoSchema>>({
    resolver: zodResolver(BusinessInfoSchema),
    // defaultValues: {
    //   businessName: "",
    //   businessDescription: "",
    //   businessEmail: "",
    //   phone: "",
    //   code: undefined,
    //   country: undefined,
    //   businessState: undefined,
    //   businessWebsite: "",
    // },
  })
  const handleModal = (e: any) => { }

  const businessInfoFormMutation = useMutation({
    mutationFn: updateBusinessInfo,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse = (await data.json()) as API.InvoiceStatusReponse
      if (responseData?.statusCode === "1") {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Error Updating Info",
          description: responseData?.message,
        })
      }
      if (responseData?.statusCode === "0") {
        setLoading(false)
        toast({
          variant: "default",
          title: "",
          description: "Business info updated",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
        businessInfoForm.reset()
      }
    },
    onError: (e) => {
      setLoading(false)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      })
    },
  })

  async function onSubmit(values: z.infer<typeof BusinessInfoSchema>) {
    let size: any = businessInfoForm?.getValues("businessLogoFile")?.size
    if (size > 307200) {
      businessInfoForm?.setError("businessLogoFile", {
        type: "manual",
        message: `requred file size should be lesser than 300kb`,
      })
      return
    }
    setLoading(true)
    if (!businessInfoForm?.getValues()?.code) {
      toast({
        variant: "destructive",
        title: `Phone Code:`,
        description: "Select a phone code",
      })
      setLoading(false)
      return
    }
    let newValues = {
      ...values,
      token: token,
      merchantId: merchantId,
      primaryMobile: `(${values.code})${values.phone}`,
    }
    // console.log(newValues);
    businessInfoFormMutation.mutate(newValues as any)
  }
  // const modalRef = useRef<any>();
  // const handleModalSubmit = () => {
  //     modalRef.current.click()
  // }

  // console.log("business logo", businessInfoForm?.getValues("businessLogoFile"))

  return (
    <Form {...businessInfoForm}>
      <form
        onSubmit={businessInfoForm.handleSubmit(onSubmit)}
        className="p-[40px] w-[60%] rounded-[24px] flex flex-col items-end bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >
        <FormField
          // disabled
          control={businessInfoForm.control}
          name="businessName"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Business Name</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  disabled
                  type="text"
                  className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder={prefill?.businessName}
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <FormField
          control={businessInfoForm.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Business Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={prefill?.businessDescription}
                  className="placeholder:text-black disabled:opacity-100 resize-none border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  {...field}
                />
              </FormControl>
              {/* </div> */}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={businessInfoForm.control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Business Email</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  type="email"
                  className="placeholder:text-black disabled:opacity-100 before:border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder={prefill?.businessEmail}
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start w-full gap-2 mt-6">
          <label htmlFor="phone" className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">
            Phone Number
          </label>
          <div className="flex flex-row items-end w-full gap-2">
            <FormField
              control={businessInfoForm.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-[30%]">
                  {/* <div className="flex flex-col w-full gap-2"> */}
                  {/* <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">

                                        Phone Number
                                    </FormLabel> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-[6px] min-h-[46px] bg-[#F2FAFD] border-none w-full">
                        <SelectValue className="placeholder:text-black disabled:opacity-100" defaultValue={field.value} placeholder={`${prefill?.primaryMobile?.split(")")[0].split("(")[1] || "+234"}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={"+234"}>
                      <SelectItem value="+234">+234</SelectItem>
                      <SelectItem value="+233">+233</SelectItem>
                      <SelectItem value="+212">+212</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* </div> */}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <FormField
              control={businessInfoForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full ">
                  {/* <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Qty</FormLabel> */}
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      pattern="[0-9]*"
                      title="Input is only number"
                      className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                      placeholder={prefill?.primaryMobile?.split(")")[1]}
                      {...field}
                      onInput={(event) => formatQuantity(event)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={businessInfoForm.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2">
                    <SelectValue defaultValue={field.value} placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryList.map(country => <SelectItem key={country} className="py-3 " value={country}>
                    {country}
                  </SelectItem>)}
                </SelectContent>
              </Select>
              {/* </div> */}

              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={businessInfoForm.control}
          name="businessState"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2">
                    <SelectValue className="placeholder:text-black disabled:opacity-100" defaultValue={field.value} placeholder={prefill?.businessState} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Minna">Minna</SelectItem>
                  <SelectItem value="Kano">Kano</SelectItem>
                </SelectContent>
              </Select>
              {/* </div> */}

              <FormMessage className="self-end" />
            </FormItem>
          )}
        />

        <FormField
          control={businessInfoForm.control}
          name="businessWebsite"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Business website</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  type="text"
                  className="placeholder:text-black disabled:opacity-100 border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder={prefill?.businessWebsite}
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <FormField
          control={businessInfoForm.control}
          name="businessLogoFile"
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              <FormDescription className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Business Logo</FormDescription>
              {prefill?.businessLogo ?
                <div onClick={() => setImgModal(true)} className="h-[48px] w-[48px] flex flex-col items-center justify-center self-start overflow-hidden cursor-pointer border border-[#0000008e] rounded-sm">
                  <Image height={58} width={58} src={`http://137.184.47.182:8081/fileuploads/${prefill?.businessLogo}`} alt="business logo" />
                </div>
                :
                ""}
              <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">
                  {/* {prefill?.businessLogo && !businessInfoForm?.getValues("businessLogoFile") ? prefill?.businessLogo : (businessInfoForm?.getValues("businessLogoFile") ? businessInfoForm?.getValues("businessLogoFile")?.name : "Choose File")} */}
                  Choose File
                </p>
              </FormLabel>


              <FormControl>
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  type="file"
                  className="hidden"
                  placeholder="Enter identification number"
                  // {...field}
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="my-[32px] min-h-[48px] font-[700] w-full hover:bg-[#1D8EBB] hover:opacity-[0.4] self-center"
          type="submit"
        // onClick={(e) => console.log(loading)}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {imgModal ? <ImageModal imgModal={imgModal} setImgModal={setImgModal} data={prefill?.businessLogo} /> : ""}
      </form>
    </Form>
  )
}



// "http://137.184.47.182:8081/fileuploads"