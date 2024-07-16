"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { toast } from "components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useHydrateStore, useUserStore, useMerchantStore } from "store"
import { getMerchantDetails } from "api/settings";


const items = [
  {
    id: "small-scale",
    label: "Small scale business",
    description: "Create a store and sell my product",
  },
  {
    id: "payment-gateway-1",
    label: "Invocing",
    description: "Raise Invioce for customer to payment for services/goods ",
  },
  {
    id: "payment-gateway-2",
    label: "E-Commerce Platform",
    description: "For sales collection on E-Commerce site",
  },
  {
    id: "payment-gateway-3",
    label: "School Collection ",
    description: "For collection students fees and other payments",
  },
] as const;
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
const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function StepThreeForm() {
  const merchantDetailStore = useHydrateStore(useMerchantStore, (state) => state.currentMerchant); //getting merchant name from store
  const router = useRouter();
  // console.log(merchantDetailStore?.merchantCode)
  const getParameters = {
    token,
    merchantCode: merchantDetailStore?.merchantCode,
  }
  const data: any = useQuery(["getMerchantDetails", getParameters], () => getMerchantDetails(getParameters))


  // console.log("personal ", JSON.stringify(data?.data?.responseObject[0]?.businessType))
  const businessType = data?.data?.responseObject[0]?.businessType

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (businessType == undefined) {
      if (businessType === "INDIVIDUAL")
        router.push("/dashboard/unregistered-business")
      else {
        router.push("/dashboard/registered-business")
      }
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex flex-col space-y-8 w-[904px]"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="flex flex-row flex-wrap w-full gap-10 p-0 space-x-0 space-y-0 mb-14">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row p-0 ">
                        <FormControl>
                          <Checkbox
                            className="hidden"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
                                );
                            }}
                          />
                        </FormControl>

                        <FormLabel
                          className={`flex px-6 py-6 rounded-lg space-x-2 hover:cursor-pointer ${field.value?.includes(item.id)
                            ? "bg-primary-10"
                            : "bg-[#F5FCFF] "
                            }`}
                        >
                          <span className="p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z"
                                fill="#48B8E6"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
                                fill="#48B8E6"
                              />
                            </svg>
                          </span>
                          <div className="flex flex-col items-start flex-1 space-y-2 w-[330px]">
                            <span className="block text-sm font-semibold leading-4 text-[#353F50] ">
                              {item.label}
                            </span>
                            <FormDescription className="block text-[12px] font-semibold leading-4 text-[#5F738C]">
                              {item.description}
                            </FormDescription>
                          </div>
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-[448px] px-2.5 py-4 mx-auto font-bold text-sm h-[48px]"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
