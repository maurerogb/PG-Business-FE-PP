"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Label } from "components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "components/ui/form"
import { toast } from "components/ui/use-toast"
import { useEffect, useRef, useState } from "react"


const FormSchema = z.object({
  type: z.enum(["BANK_ACCOUNT", "PAYACCESS_WALLET"], {
    required_error: "You need to select a notification type.",
  }),
})

export function EarningNotification({ data, Notification, setNotification }: any) {
  const [scrub, setStrub] = useState<number>(0)
  // const [prefill, setPrefill] = useState<any>(data?.merchantReceiveEarningsOption)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  useEffect(() => {
    form.setValue("type", data?.merchantReceiveEarningsOption)
  }, [data])


  useEffect(() => {
    setNotification({
      ...Notification,
      merchantReceiveEarningsOption: form.getValues().type,
    })

  }, [scrub])


  function onSubmit(data: z.infer<typeof FormSchema>) { }
  // console.log(data)

  const handleSubmit = (e: any) => {
    e.preventDefault
    setNotification({
      ...Notification,
      merchantReceiveEarningsOption: form.getValues().type,
    })
    setStrub(scrub + 1)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[60%] mb-5 p-[24px] rounded-[10px] flex flex-col gap-8 items-start bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange as any}
              value={field.value}
            >
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <RadioGroupItem onClick={(e) => handleSubmit(e)} value="BANK_ACCOUNT" id="r1" />
                </FormControl>
                <FormLabel>
                  <Label className="text-[14px] font-[400]" htmlFor="r1">
                    Send to my bank account
                  </Label>
                </FormLabel>
              </FormItem>
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <RadioGroupItem onClick={(e) => handleSubmit(e)} value="PAYACCESS_WALLET" id="r2" />
                </FormControl>
                <FormLabel>
                  <Label className="text-[14px] font-[400]" htmlFor="r2">
                    Send to my Payaccess wallet
                  </Label>
                </FormLabel>
              </FormItem>
            </RadioGroup>
          )}
        />

      </form>
    </Form>
  )
}














