"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { LuChevronDown } from "react-icons/lu";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { Calendar } from "components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select"
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { MdClose } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { runSettlements } from "api/settlements";
import { formatQuantity } from "utils/numberFormater"
import { currencies } from "utils/currency";

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
) {
    token = window.localStorage.getItem("token") as any
    subject = window.localStorage.getItem("subject") as any
    merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
    merchantId = merchantList[0].id ? merchantList[0]?.id : null
}



const terminalSchema = z.object({
    payAccessCurrency: z.string(),
    settlementDate: z.date({
        required_error: "Due date is required.",
    })
});
export default function RunSettlementsForm({ handleModalPOSpopup }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    let runSettlementsForm = useForm<z.infer<typeof terminalSchema>>({
        resolver: zodResolver(terminalSchema),
        defaultValues: {
            payAccessCurrency: undefined,
            settlementDate: undefined
        },
    });




    const runSettlementsFormMutation = useMutation({
        mutationFn: runSettlements,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;
            console.log("terminal status code: ", responseData?.statusCode)
            if (responseData?.statusCode === "715" || responseData?.statusCode === "1") {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error Running Settlements",
                });
            }
            else if (responseData?.statusCode === "0" || "ACCEPTED") {
                setLoading(false)
                toast({
                    variant: "default",
                    title: "Success...",
                    description: "Settlements ran successfully",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                runSettlementsForm.reset();
                handleModalPOSpopup(false)
            }
        },
        onError: (e) => {
            console.log(e);
            setLoading(false)
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    async function onSubmit(values: z.infer<typeof terminalSchema>) {
        setLoading(true)
        // console.log(values);
        let newValues = {
            ...values,
            settlementDate: runSettlementsForm.getValues("settlementDate")?.toISOString().split("T")[0],
            settlementStatus: null,
            token,
        };
        console.log(newValues);
        runSettlementsFormMutation.mutate(newValues as any);
    }


    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-10">
            <Form {...runSettlementsForm}>
                <form
                    onSubmit={runSettlementsForm.handleSubmit(onSubmit)}
                    className="flex flex-col items-center xl:w-[30%] lg:w-[45%] w-1/2 bg-white rounded-lg px-6 pb-10 pt-8"
                >
                    <div className="flex flex-col items-start gap-2 relative w-full mb-5">
                        <MdClose
                            onClick={() => handleModalPOSpopup(false)}
                            className="absolute top-0 right-0 text-[24px] text-[#F61212] cursor-pointer"
                        />
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[700]">Run Settlement</p>
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[400]">Complete and enter the following form below  </p>
                    </div>
                    <FormField
                        control={runSettlementsForm.control}
                        name="payAccessCurrency"
                        render={({ field }) => (
                            <FormItem className="w-full mb-5">
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-1/2">
                                        {
                                            currencies.map(({ name }, id) => {
                                                return (

                                                    <SelectItem disabled={name !== "NGN"} className="w-1/2" key={id} value={name}>{name}</SelectItem>

                                                )
                                            })
                                        }

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={runSettlementsForm.control}
                        name="settlementDate"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                                    Settlement Date
                                </FormLabel>
                                <Popover>
                                    <FormControl>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "border-[#A1CBDE] min-h-[48px] bg-transparent w-full flex flex-row items-center justify-between font-normal",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <LuChevronDown className="text-[24px] text-[#2F3437]" />
                                            </Button>
                                        </PopoverTrigger>
                                    </FormControl>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange as any}
                                            disabled={(date) => date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        className="mt-[32px] min-h-[48px] font-[700] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Loading..." : "Send"}
                    </Button>

                </form>

            </Form>
        </div>

    );
}






























