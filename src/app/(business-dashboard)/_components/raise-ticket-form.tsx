"use client";

import { ScrollArea } from "components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { HiOutlineCloudUpload } from "react-icons/hi"
import { Textarea } from "components/ui/textarea"
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
import { createTicket } from "api/dispute";
import { formatQuantity, formatMoneyAmount } from "utils/numberFormater"

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



const raiseTicketSchema = z.object({
    disputeAmount: z.string(),
    issueCategory: z.string(),
    orderRef: z.string(),
    merchantId: z.string(),
    ticketMessage: z.string(),
    attachmentImage: z.custom<File>().optional(),

});
export default function RaiseTicketForm({ handleModalPOSpopup, setIsDataUpdated }: any) {

    const categoryList = ["BVN", "PAYMENT", "SETTLEMENT", "AUDIT_LOG", "TRANSACTIONS", "DISPUTES", "INVOICE", "REFUNDS"]//--------------dispute category array. 
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    let raiseTicketForm = useForm<z.infer<typeof raiseTicketSchema>>({
        resolver: zodResolver(raiseTicketSchema),
        // defaultValues:{

        // }
    });




    const raiseTicketFormMutation = useMutation({
        mutationFn: createTicket,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;
            setLoading(false)
            if (responseData?.statusCode === "1") {

                toast({
                    variant: "destructive",
                    title: "Error...",
                    description: "Error Raising Ticket",
                });
            }
            else if (responseData?.statusCode === "701") {

                toast({
                    variant: "destructive",
                    title: "Warning...",
                    description: "Ticket exist for this dispute.",
                });
            }
            else if ((responseData?.statusCode === "0") || (responseData?.statusCode === "ACCEPTED")) {

                toast({
                    variant: "default",
                    title: "Success...",
                    description: "A ticket has been successfully raised",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                raiseTicketForm.reset();
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

    async function onSubmit(values: z.infer<typeof raiseTicketSchema>) {
        setLoading(true)
        // console.log(values);
        let newValues = {
            ...values,
            disputeAmount: Number(values?.disputeAmount?.replace(/,/g, '')),
            merchantId: Number(values?.merchantId?.replace(/,/g, '')),
            token
        };
        // console.log(newValues);
        raiseTicketFormMutation.mutate(newValues as any);
    }


    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-50">

            <div className="flex flex-col items-center h-[80vh] xl:w-[30%] lg:w-[45%] w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col items-start gap-2 relative w-full bg-[#177196] px-6 py-5">
                    <MdClose
                        onClick={() => handleModalPOSpopup(false)}
                        className="absolute top-4 right-4 text-[26px] text-[#fff] cursor-pointer"
                    />
                    <p className="text-[#fff] text-[18px] leading-normal font-[700]">Provide a request or complain </p>
                    <p className="text-[#fff] text-[16px] leading-normal font-[400]">We are always ready to listen and resolves your issues. </p>
                </div>
                <ScrollArea className="w-full">
                    <div className="w-full flex flex-col items-center">
                        <Form {...raiseTicketForm}>
                            <form
                                onSubmit={raiseTicketForm.handleSubmit(onSubmit)}
                                className="flex flex-col items-center w-full bg-white px-6 py-8"
                            >
                                <FormField
                                    control={raiseTicketForm.control}
                                    name="disputeAmount"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-4">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                                                Dispute Amount
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                                                    placeholder="Enter Dispute Amount"
                                                    {...field}
                                                    onInput={(event) => formatMoneyAmount(event)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={raiseTicketForm.control}
                                    name="merchantId"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-4">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                                                Merchant ID
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                                                    placeholder="Enter Merchant ID"
                                                    {...field}
                                                    onInput={(event) => formatQuantity(event)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={raiseTicketForm.control}
                                    name="ticketMessage"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col w-full mb-4">
                                            {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Give description of dispute"
                                                    className="resize-none rounded-[6px] shadow-none w-full p-2 border-[#A1CBDE] min-h-[48px] bg-transparent"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* </div> */}

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={raiseTicketForm.control}
                                    name="issueCategory"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col w-full mb-4">
                                            {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-[#A1CBDE] rounded-[6px] min-h-[46px] shadow-none bg-transparent w-full p-2">
                                                        <SelectValue defaultValue={field.value} placeholder="Category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categoryList.map((value, id) => <SelectItem key={id} className="py-3 " value={value}>
                                                        {value}
                                                    </SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            {/* </div> */}

                                            <FormMessage className="" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={raiseTicketForm.control}
                                    name="orderRef"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-4">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                                                Order Reference
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                                                    placeholder="Enter Order Reference"
                                                    {...field}
                                                // onInput={(event) => handleQuantity(event)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={raiseTicketForm.control}
                                    name="attachmentImage"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormDescription className="text-[#0C394B] text-[16px] leading-normal font-[400]">Attachments</FormDescription>
                                            <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                                                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                                                <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">{raiseTicketForm.getValues("attachmentImage") ? raiseTicketForm.getValues("attachmentImage")?.name : "Choose File"}</p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    accept=".jpg, .jpeg, .png"
                                                    type="file"
                                                    className="hidden"
                                                    placeholder="Enter identification number"
                                                    // {...field}
                                                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={loading}
                                    className="my-[32px] min-h-[48px] font-[700] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                                >
                                    {loading ? "Submitting..." : "Submit Request"}
                                </Button>

                            </form>

                        </Form>
                    </div>
                </ScrollArea>
            </div>

        </div>

    );
}






























