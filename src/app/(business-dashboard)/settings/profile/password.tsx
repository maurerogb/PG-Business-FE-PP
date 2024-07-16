"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { updateUserPassword } from "api/settings"
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



const PasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Password must contain more than 8 characters").max(50, "Password must not be above 50 characters"),
    newPassword: z
      .string().refine((value) => value.length >= 8 && value.length <= 50, {
        message: 'Password must be between 8 and 50 characters',
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine((value) => !/123/.test(value), {
        message: 'Password should not contain the sequence "123"',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase character',
      })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase character',
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string().min(8, "Password must contain more than 8 characters").max(50, "Password must not be above 50 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  })

export default function PasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [receipt, setReceipt] = useState(false)
  const [popup, setPopup] = useState(false)
  const [modalData, setModalData] = useState<any>("")
  // const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState<any[]>([{ label: "Customer Email" }])

  let passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const handleModal = (e: any) => { }

  const passwordFormMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse = (await data.json()) as API.InvoiceStatusReponse
      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error Updating Password",
        })
        return
      }
      if (responseData?.statusCode === "00" || "0") {
        toast({
          variant: "default",
          title: "",
          description: "Password Updated Successfully",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
        passwordForm.reset()
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

  async function onSubmit(values: z.infer<typeof PasswordSchema>) {
    let newValues = {
      password: passwordForm.getValues("currentPassword"),
      newPassword: passwordForm.getValues("newPassword"),
      token,
    }
    console.log(newValues)

    passwordFormMutation.mutate(newValues as any)
  }
  // const modalRef = useRef<any>();
  // const handleModalSubmit = () => {
  //     modalRef.current.click()
  // }

  return (
    <Form {...passwordForm}>
      <form
        onSubmit={passwordForm.handleSubmit(onSubmit)}
        className="w-[550px] p-[40px] rounded-[24px] flex flex-col items-end bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >
        <FormField
          control={passwordForm.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Current password</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  type="password"
                  className="border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">New password</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  type="password"
                  className="border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={passwordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
              <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">Confirm password</FormLabel>
              <FormControl className="w-full bg-[red]">
                <Input
                  type="password"
                  className="border-[#D6D6D6] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 "
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              {/* </div> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          // disabled={loading}
          className="mt-[32px] min-h-[48px] font-[700] w-[225px] hover:bg-[#1D8EBB] hover:opacity-[0.4] self-end"
          type="submit"
        // onClick={(e) => handleModal(e)}
        >
          Change Password
        </Button>
      </form>
    </Form>
  )
}
