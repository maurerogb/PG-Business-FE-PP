"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { toast } from "components/ui/use-toast";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select a business to display.",
    })
    .email(),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
});

export default function Dashboard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="flex w-[493px] flex-col items-start justify-center rounded-[6px] bg-[#fff] p-6">
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-[24px]">
                  <FormLabel className="text-[14px] font-[400] leading-[145%] text-[#555555] ">
                    Select existing business
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="h-[48px] rounded-[10px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        Goodness oil&gas
                      </SelectItem>
                      <SelectItem value="m@google.com">
                        Goodness oil&gas
                      </SelectItem>
                      <SelectItem value="m@support.com">
                        Goodness oil&gas
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-[400] leading-[145%] text-[#555555] ">
                    Business name{" "}
                  </FormLabel>
                  <FormControl className="h-[48px] rounded-[10px]">
                    <Input placeholder="Enter business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-[24px] flex flex-col items-center">
        <Button className="h-[48px] w-[388px] bg-[#23AAE1] text-[16px] font-[600] leading-[150%] text-[#fff]">
          Create account
        </Button>
        <Button className="mt-[20px] h-[48px] w-[388px] bg-transparent text-[16px] font-[600] leading-[150%] text-[#23AAE1] shadow-none hover:text-[#fff]">
          Cancel
        </Button>
      </div>
    </>
  );
}
