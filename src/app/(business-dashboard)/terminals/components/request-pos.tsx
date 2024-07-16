"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
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
import { cn } from "lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createTerminaRequest } from "api/POS-terminal";
import { formatQuantity } from "utils/numberFormater"

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
    terminalBrand: z.string(),
    terminalType: z.string(),
    quantity: z.string(),

});
export default function TerminalForm({ handleModalPOSpopup }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    let terminalForm = useForm<z.infer<typeof terminalSchema>>({
        resolver: zodResolver(terminalSchema),
        defaultValues: {
            terminalBrand: undefined,
            terminalType: undefined,
            quantity: undefined,
        },
    });

    useEffect(() => {
        if (terminalForm.getValues("terminalType") === "WEB") {
            terminalForm.setValue("quantity", "1")
        }
    }, [terminalForm.getValues("terminalType")])


    const handleQuantity = (event: any) => {
        if (terminalForm.getValues("terminalType") === "WEB") {
            event.target.value = "1"
        }
        formatQuantity(event)
    }


    const terminalFormMutation = useMutation({
        mutationFn: createTerminaRequest,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;
            console.log("terminal status code: ", responseData?.statusCode)
            if (responseData?.statusCode === "715" || responseData?.statusCode === "1") {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Creating Invoice",
                });
            }
            else if (responseData?.statusCode === "0" || "ACCEPTED") {
                setLoading(false)
                toast({
                    variant: "default",
                    title: "Success...",
                    description: "Terminal Request Sent",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                terminalForm.reset();
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
            quantity: Number(values?.quantity),
            token,
            merchantId
        };
        console.log(newValues);
        terminalFormMutation.mutate(newValues as any);
    }


    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-10">
            <Form {...terminalForm}>
                <form
                    onSubmit={terminalForm.handleSubmit(onSubmit)}
                    className="flex flex-col items-center xl:w-[30%] lg:w-[45%] w-1/2 bg-white rounded-lg px-6 pb-10 pt-8"
                >
                    <div className="flex flex-col items-start gap-2 relative w-full mb-5">
                        <MdClose
                            onClick={() => handleModalPOSpopup(false)}
                            className="absolute top-0 right-0 text-[24px] text-[#F61212] cursor-pointer"
                        />
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[700]">Request POS Terminal</p>
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[400]">Complete and enter the following form below  </p>
                    </div>
                    <FormField
                        control={terminalForm.control}
                        name="terminalBrand"
                        render={({ field }) => (
                            <FormItem className="w-full mb-3">
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Terminal Brand</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select terminal brand" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="TELPO">TELPO</SelectItem>
                                        <SelectItem value="INDECO">INDECO</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={terminalForm.control}
                        name="terminalType"
                        render={({ field }) => (
                            <FormItem className="w-full mb-3">
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Terminal Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select terminal type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="POS">POS</SelectItem>
                                        <SelectItem value="ATM">ATM</SelectItem>
                                        <SelectItem value="WEB">WEB</SelectItem>
                                        <SelectItem value="MOBILE">MOBILE</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={terminalForm.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full ">
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                                    Quantity
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                                        placeholder="Enter Quantity"
                                        {...field}
                                        onInput={(event) => handleQuantity(event)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        className="mt-[32px] min-h-[48px] font-[700] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Loading..." : "Continue"}
                    </Button>

                </form>

            </Form>
        </div>

    );
}






























