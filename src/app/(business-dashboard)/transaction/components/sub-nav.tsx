"use client"

import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography"
import * as React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { LuChevronDown, LuSearch } from "react-icons/lu"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { toast } from "components/ui/use-toast"
import FilterForm from "./filter-form"
import { ScrollArea } from "components/ui/scroll-area"

const FormSchema = z.object({
  username: z.string(),
})

const SubNav = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

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

  return (
    <div className="flex w-full flex-row items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex flex-row items-center gap-3 border-none bg-transparent p-[0px] text-[16px] font-[600] leading-6 text-[#333333] shadow-none outline-none hover:bg-transparent">
            All Account
            <LuChevronDown className="text-[24px] text-[#333333]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" px-[16px] py-[22px]">
          <div className="flex flex-col items-start gap-[11px]">
            <Typography level={"p"} className="cursor-pointer text-[16px] font-normal leading-5 text-[#333333]">
              All Account
            </Typography>
            <Typography level={"p"} className="cursor-pointer text-[16px] font-normal leading-5 text-[#333333]">
              POS Transaction
            </Typography>
            <Typography level={"p"} className="cursor-pointer text-[16px] font-normal leading-5 text-[#333333]">
              Web Transaction
            </Typography>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="ml-[35px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row items-center gap-3 border-none bg-transparent p-[0px] text-[16px] font-[600] leading-6 text-[#333333] shadow-none outline-none hover:bg-transparent">
              Filter
              <LuChevronDown className="text-[24px] text-[#333333]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[320px] py-[42px] pl-[15px] pr-[8px]">
            <ScrollArea>
              <FilterForm />
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-[149px] h-[40px] w-[389px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-[40px] space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex flex-row items-center">
                      <LuSearch className="absolute left-[12px] text-[24px] text-[#5F738C]" />
                      <Input
                        className="rounded-[4px] border-[0.5px] border-[#FDE6D2] bg-[#F9FAFB] pl-[44px] text-[12px] leading-4 tracking-[0.4px] text-[#848F9F]"
                        placeholder="Search by name, email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SubNav
