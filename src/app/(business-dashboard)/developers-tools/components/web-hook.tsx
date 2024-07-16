
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { LuCopy } from "react-icons/lu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { updateMerchantWebhookandCallbackUrl } from "api/developers-tools";




let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""
let businessName: any = ""

if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
) {
    token = window.localStorage.getItem("token") as any
    subject = window.localStorage.getItem("subject") as any
    merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
    merchantId = merchantList[0].id ? merchantList[0]?.id : null
    businessName = merchantList[0].businessName
}


const WebHookSchema = z.object({
    webHookUrl: z.string(),
    callbackUrl: z.string(),
    // payItemId: z.string(),
});

export default function WebHook({ data }: any) {
    const router = useRouter();
    const { toast } = useToast();
    const webHookForm = useForm<z.infer<typeof WebHookSchema>>({
        resolver: zodResolver(WebHookSchema),
        defaultValues: {
            webHookUrl: data?.webhookUrl,
            callbackUrl: data?.callbackUrl,
            // payItemId: "",
        },
    });

    useEffect(() => {
        webHookForm.setValue("webHookUrl", data?.webhookUrl)
        webHookForm.setValue("callbackUrl", data?.callbackUrl)
    }, [data?.webhookUrl, data?.callbackUrl])

    const handleCopyToClipboard = (e: any) => {
        if (e.target.id === "webHookUrl") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = webHookForm.getValues("webHookUrl");
            // Append the input element to the DOM (it doesn't need to be visible)
            document.body.appendChild(tempInput);

            // Select the text inside the input element
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Remove the temporary input element
            document.body.removeChild(tempInput);
            toast({
                variant: "default",
                title: "Copied",
                description: `${webHookForm.getValues("webHookUrl")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        } else if (e.target.id === "callbackUrl") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = webHookForm.getValues("callbackUrl");

            // Append the input element to the DOM (it doesn't need to be visible)
            document.body.appendChild(tempInput);

            // Select the text inside the input element
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Remove the temporary input element
            document.body.removeChild(tempInput);
            toast({
                variant: "default",
                title: "Copied",
                description: `${webHookForm.getValues("callbackUrl")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        }

        // else if (e.target.id === "payItemId") {
        //     // Create a temporary input element
        //     const tempInput = document.createElement("input");
        //     tempInput.value = webHookForm.getValues("payItemId");

        //     // Append the input element to the DOM (it doesn't need to be visible)
        //     document.body.appendChild(tempInput);

        //     // Select the text inside the input element
        //     tempInput.select();

        //     // Copy the selected text to the clipboard
        //     document.execCommand("copy");

        //     // Remove the temporary input element
        //     document.body.removeChild(tempInput);
        //     toast({
        //         variant: "default",
        //         title: "Copied",
        //         description: `${webHookForm.getValues("payItemId")}`,
        //         className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        //     });
        // }

    };

    const webHookMutation = useMutation({
        mutationFn: updateMerchantWebhookandCallbackUrl,
        onSuccess: async (data) => {
            const responseData: API.StatusReponse =
                (await data.json()) as API.StatusReponse;

            if (responseData?.statusCode === "1") {

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error updating webhook",
                });
            } else if (responseData?.statusCode === "0") {
                toast({
                    variant: "default",
                    title: "Success",
                    description: "Webhook updated",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                if (typeof window) {
                    router.push(`/developers-tools`);
                }

            } else {

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error updating webhook",
                });
            }
        },

        onError: (e) => {

            console.log(e)
            toast({
                variant: "destructive",
                title: "error",
                description: `${e}`,
            });
        },
    });

    async function onSubmit(values: z.infer<typeof WebHookSchema>) {
        console.log(values)
        const requestData = {
            webhookUrl: webHookForm.getValues("webHookUrl"),
            callbackUrl: webHookForm.getValues("callbackUrl"),
            token,
            merchantId,
        }
        // console.log(requestData)
        webHookMutation.mutate(requestData);
    }

    return (
        <Form {...webHookForm}>
            <form
                onSubmit={webHookForm.handleSubmit(onSubmit)}
                className="w-[55%] rounded-[20px] bg-white border-[2px] py-[30px] p-[20px] border-[#EEF8FF] flex flex-col items-center"
            >

                <div className=" w-full flex flex-col items-center gap-2 mb-6">
                    <p className="text-[#0C394B] text-[16px] font-[700] leading-6">
                        {`Web hook for ${data?.businessName}`}
                    </p>

                    <p className="text-[#0C394B] text-[14px] font-[400] leading-5">
                        Add a web hook endpoint
                    </p>

                </div>

                <FormField
                    control={webHookForm.control}
                    name="webHookUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5">Test webhook URL</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="webHookUrl"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={webHookForm.control}
                    name="callbackUrl"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Live Callback URL</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="callbackUrl"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="mt-[24px] rounded-[8px] w-[40%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
                >
                    Save changes
                </Button>
                {/* <FormField
                    control={webHookForm.control}
                    name="payItemId"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Pay Item ID</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="payItemId"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

            </form>
        </Form>
    );
}
