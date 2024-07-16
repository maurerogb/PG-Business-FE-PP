"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "components/ui/form"
import { toast } from "components/ui/use-toast"

const FormSchema = z.object({
  transfer: z.boolean().default(false).optional(),
  invoice: z.boolean().default(false).optional(),
  paymentLink: z.boolean().default(false).optional(),
  settlement: z.boolean().default(false).optional(),
})

export function EnableNotification({ data, Notification, setNotification }: any) {

  const [scrub, setStrub] = useState<number>(0)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  // console.log(data)

  useEffect(() => {
    form.setValue("settlement", data?.enableNotificationForSettlement || false)
    form.setValue("paymentLink", data?.enableNotificationForPaymentLink || false)
    form.setValue("invoice", data?.enableNotificationForInvoicing || false)
    form.setValue("transfer", data?.enableNotificationServicesForTransfer || false)
  }, [data])


  // useEffect(() => {
  //   console.log("Notification data update: ", Notification)
  // }, [Notification])


  useEffect(() => {

    setNotification({
      ...Notification,
      enableNotificationForSettlement: form.getValues("settlement"),
      enableNotificationForPaymentLink: form.getValues("paymentLink"),
      enableNotificationForInvoicing: form.getValues("invoice"),
      enableNotificationForTransfer: form.getValues("transfer"),
    })

  }, [scrub])




  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  const handleUpdate = () => {
    setNotification({
      ...Notification,
      enableNotificationForSettlement: form.getValues("settlement"),
      enableNotificationForPaymentLink: form.getValues("paymentLink"),
      enableNotificationForInvoicing: form.getValues("invoice"),
      enableNotificationForTransfer: form.getValues("transfer"),
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
          name="transfer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange as any}
                  onClick={() => {
                    handleUpdate()
                  }}
                  className="w-[20px] h-[20px]"
                />
              </FormControl>

              <FormLabel className="text-[14px] font-[400]">Transfer</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoice"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange as any}
                  onClick={() => {
                    handleUpdate()
                  }}
                  className="w-[20px] h-[20px]"
                />
              </FormControl>

              <FormLabel className="text-[14px] font-[400]">Invoice</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentLink"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange as any}
                  onClick={() => {
                    handleUpdate()
                  }}
                  className="w-[20px] h-[20px]"
                />
              </FormControl>

              <FormLabel className="text-[14px] font-[400]">Payment Link</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="settlement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange as any}
                  onClick={() => {
                    handleUpdate()
                  }}
                  className="w-[20px] h-[20px]"
                />
              </FormControl>

              <FormLabel className="text-[14px] font-[400]">Settlement</FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
