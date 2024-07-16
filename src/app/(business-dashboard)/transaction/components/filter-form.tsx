"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import * as zod from "zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { LuCalendar } from "react-icons/lu"
import { cn } from "lib/utils"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Typography } from "components/ui/Typography"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Calendar } from "components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { toast } from "components/ui/use-toast"

const filterFormSchema = zod.object({
  startDate: zod.date({
    required_error: "A start date is required.",
  }),
  endDate: zod.date({
    required_error: "An end date is required.",
  }),
  status: zod.string({
    required_error: "Set status. ",
  }),
  transactionType: zod.string({
    required_error: "Set transaction type.",
  }),

  receiptNumber: zod.string(),
  posNumber: zod.string(),
})

export default function FilterForm() {
  const filterForm = useForm<zod.infer<typeof filterFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(filterFormSchema),
  })

  //   const updateMerchantBioDataMutation = useMutation({
  //     mutationFn: updateMerchantBioData,
  //     onSuccess: () => {
  //       return null
  //     },
  //     onMutate: () => {
  //       return null
  //     },
  //   })

  const onSubmit = (values: zod.infer<typeof filterFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...filterForm}>
      <form onSubmit={filterForm.handleSubmit(onSubmit)} className="flex flex-col space-y-6 border-gray-10 rounded-r pr-[15px]">
        <div className="flex flex-col items-end gap-2">

  
            <FormField
            control={filterForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="item flex w-full flex-col">
                <FormLabel className="text-[14px] font-semibold leading-normal text-[#333333]">Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex flex-row items-center justify-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Start date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange as any}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="item flex w-full flex-col">
                <FormLabel className="w-full text-[#555555]"></FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex flex-row items-center justify-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>End date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange as any}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="status"
          control={filterForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-semibold leading-normal text-[#333333]">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Successful" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Successful">Successful</SelectItem>
                  <SelectItem value="POS Transaction">POS Transaction</SelectItem>
                  <SelectItem value="Web Transaction">Web Transaction</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="transactionType"
          control={filterForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-semibold leading-normal text-[#333333]">
                Transaction Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Account">All Account</SelectItem>
                  <SelectItem value="POS Transaction">POS Transaction</SelectItem>
                  <SelectItem value="Web Transaction">Web Transaction</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
{/* 
        <FormField
          name="receiptNumber"
          control={filterForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-semibold leading-normal text-[#333333]">Receipt number</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="posNumber"
          control={filterForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-semibold leading-normal text-[#333333]">POS ID</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="flex w-full flex-row items-center justify-center gap-3">
          <Button
            className="h-[48px] self-center border border-[#23AAE1] bg-transparent text-[#23AAE1] hover:bg-[#23AAE1] hover:text-[white]"
            type="button"
          >
            Cancel
          </Button>
          <Button className="h-[48px] self-center" type="submit">
            Apply Filter
          </Button>
        </div>
      </form>
    </Form>
  )
}
