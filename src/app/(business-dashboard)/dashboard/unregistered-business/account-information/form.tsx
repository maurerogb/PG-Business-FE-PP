"use client"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as zod from "zod"

// import { updateBusinessBankData } from "api/registration";
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { updateMerchantBusinessBankAccountData } from "api/merchant-management"
import { useHydrateStore, useMerchantStore, useUserStore } from "store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { numberFormat } from "utils/numberFormater"
import { getMerchantDetails } from "api/settings"

type AccountInfoFormProps = {
  prevStep?: () => void
  nextStep?: () => void
}

let data: any = {}

const accInfoFormSchema = zod.object({
  merchantId: zod.number(),
  businessBvn: zod.string(),
  businessBankName: zod.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  businessAccountNumber: zod.string().min(11, {
    message: "Account number should be at least 11 characters.",
  }),

  businessAccountName: zod.string().min(6, {
    message: "Last name must be at least 2 characters.",
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
export default function AccountInformationForm(props: AccountInfoFormProps) {
  const getParameters = {
    token,
    merchantCode: merchantList[0]?.merchantCode,
  }
  if (data == undefined) {
    data = useQuery(["getMerchantDetails", getParameters], () => getMerchantDetails(getParameters))

    console.log("personal ", JSON.stringify(data?.data?.responseObject[0]))
  }

  // if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  //   token = localStorage.getItem("token") as string
  // }
  const { toast } = useToast()
  const currentMerchant = useHydrateStore(useMerchantStore, (state) => state.currentMerchant)

  const merchantDetails = data?.data?.responseObject[0]

  const acctInfoForm = useForm<zod.infer<typeof accInfoFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(accInfoFormSchema),
  })
  const handleChange = (event: any) => {
    const result = event.target.value.replace(/\D/g, "")

    setValue(result)
  }
  const updateMerchantBusinessBankAccountMutation = useMutation({
    mutationFn: (values: API.UpdateMerchantBankAccountDataDTO) => updateMerchantBusinessBankAccountData(values, token),
    onSuccess: async (data) => {
      const responseData: API.StatusReponse = (await data.json()) as API.StatusReponse

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      } else if (responseData?.statusCode === "0" && typeof window) {
        acctInfoForm.reset()

        props.nextStep && props.nextStep()

        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      }
    },

    onError: (e: any) => {
      toast({
        variant: "destructive",
        title: "",
        description: e,
      })
    },
  })


  useEffect(() => {
    if(merchantDetails){
    const { businessBvn, businessBankName, businessAccountNumber, businessAccountName } = merchantDetails as API.MerchantDetails
    return acctInfoForm.reset({
      businessBvn,
      businessBankName,
      businessAccountNumber,
      businessAccountName,
    } as any)
  }
  })

  useEffect(() => {
    if (currentMerchant?.id) {
      acctInfoForm.setValue("merchantId", currentMerchant?.id)
    }   
  }, [currentMerchant?.id])

  const [value, setValue] = useState("")

  const onSubmit = (values: zod.infer<typeof accInfoFormSchema>) => {
    updateMerchantBusinessBankAccountMutation.mutate(values as any)
  }
 // console.log("currentMerchant > ", currentMerchant?.businessName)

  return (
    <Form {...acctInfoForm}>
      <form onSubmit={acctInfoForm.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        {/* merchant id field is hidden but it's value is sent to the api */}
        <FormField
          control={acctInfoForm.control}
          name="merchantId"
          defaultValue={currentMerchant?.id}
          render={({ field }) => (
            <FormItem className="hidden w-full">
              <FormLabel className="text-sm font-normal text-gray-50">Merchant ID</FormLabel>
              <FormControl>
                <Input type="number" icon="show" className="min-h-[48px]" placeholder="Enter phone number" {...field} value={currentMerchant?.id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessBvn"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>BVN</FormLabel>
              <FormControl>
                <Input
                  title="Input is only number"
                  pattern="[0-9]*"
                  maxLength={11}
                  onInput={(event) => numberFormat(event)}
                  placeholder="Enter BVN"
                  {...field}
                />
              </FormControl>

              <FormDescription>To get your BVN dial *565*0# on your registered mobile number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-row gap-[44px]">
          <FormField
            name="businessBankName"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="firstbank">First Bank</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="businessAccountNumber"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input onInput={(event) => numberFormat(event)} pattern="[0-9]*" maxLength={11} placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="businessAccountName"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={updateMerchantBusinessBankAccountMutation.isLoading}
          className="w-56 h-12 p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-sm font-bold mx-auto"
          type="submit"
          size="default"
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
