"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
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
import { HiOutlineCloudUpload } from "react-icons/hi";
import { cn } from "lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createTerminaRequest } from "api/POS-terminal";
import { formatQuantity } from "utils/numberFormater"
import { createTicket } from "api/dispute";


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



const raiseComplainSchema = z.object({
    ticketMessage: z.string(),
    attachmentImage: z.custom<File>().optional(),
});
export default function RaiseComplainForm({ handleModalPOSpopup, complainData, setIsDataUpdated }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    let raiseComplainForm = useForm<z.infer<typeof raiseComplainSchema>>({
        resolver: zodResolver(raiseComplainSchema),

    });




    const raiseComplainFormMutation = useMutation({
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
                raiseComplainForm.reset();
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


    async function onSubmit(values: z.infer<typeof raiseComplainSchema>) {
        setLoading(true)
        // console.log(values);
        let newValues = {
            ...values,
            disputeAmount: complainData?.disputeAmount,
            issueCategory: "INVOICE",
            orderRef: complainData?.orderRef,
            merchantId: complainData?.merchantId,
            token
        };
        // console.log(newValues);
        raiseComplainFormMutation.mutate(newValues as any);
    }



    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[10vh] fixed top-0 left-0 z-10">
            <Form {...raiseComplainForm}>
                <form
                    onSubmit={raiseComplainForm.handleSubmit(onSubmit)}
                    className="flex flex-col items-center xl:w-[30%] lg:w-[45%] w-1/2 bg-white rounded-lg px-6 pb-10 pt-8"
                >
                    <div className="flex flex-col items-start gap-2 relative w-full mb-5">
                        <MdClose
                            onClick={() => handleModalPOSpopup(false)}
                            className="absolute top-0 right-0 text-[24px] text-[#F61212] cursor-pointer"
                        />
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[700]">Raise Complain</p>
                        <p className="text-[#5C5F61] text-[16px] leading-none font-[400]">Send a message to raise complain</p>
                    </div>
                    <FormField
                        control={raiseComplainForm.control}
                        name="ticketMessage"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full mb-4">
                                {/* <div className="flex flex-row items-center justify-end w-full gap-4"> */}
                                <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={5}
                                        placeholder="Give description of dispute"
                                        className="resize-none rounded-[6px] shadow-none w-full p-2 border-[#A1CBDE] bg-transparent"
                                        {...field}
                                    />
                                </FormControl>
                                {/* </div> */}

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={raiseComplainForm.control}
                        name="attachmentImage"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormDescription className="text-[#0C394B] text-[16px] leading-normal font-[400]">Attachments</FormDescription>
                                <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                                    <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                                    <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">{raiseComplainForm.getValues("attachmentImage") ? raiseComplainForm.getValues("attachmentImage")?.name : "Choose File"}</p>
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
                        className="mt-[32px] min-h-[48px] font-[700] w-[60%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        {loading ? "Sending..." : "Send Complain"}
                    </Button>

                </form>

            </Form>
        </div>

    );
}






























