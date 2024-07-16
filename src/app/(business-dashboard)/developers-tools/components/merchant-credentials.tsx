
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
import { loginApi } from "api/login";

const MerchantCredentialSchema = z.object({
    merchantCode: z.string(),
    // clientId: z.string(),
    // payItemId: z.string(),
});

export default function MerchantCredentials({ data }: any) {
    const router = useRouter();
    const { toast } = useToast();
    const merchantCredentials = useForm<z.infer<typeof MerchantCredentialSchema>>({
        resolver: zodResolver(MerchantCredentialSchema),
        defaultValues: {
            merchantCode: data?.merchantCode,
            // clientId: "",
            // payItemId: "",
        },
    });
    // console.log(data?.merchantCode)


    useEffect(() => {
        merchantCredentials.setValue("merchantCode", data?.merchantCode)
    }, [data?.merchantCode])


    const handleCopyToClipboard = (e: any) => {
        if (e.target.id === "merchantCode") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = merchantCredentials.getValues("merchantCode");
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
                description: `${merchantCredentials.getValues("merchantCode")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        }
        // else if (e.target.id === "clientId") {
        //     // Create a temporary input element
        //     const tempInput = document.createElement("input");
        //     tempInput.value = merchantCredentials.getValues("clientId");

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
        //         description: `${merchantCredentials.getValues("clientId")}`,
        //         className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        //     });
        // }

        // else if (e.target.id === "payItemId") {
        //     // Create a temporary input element
        //     const tempInput = document.createElement("input");
        //     tempInput.value = merchantCredentials.getValues("payItemId");

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
        //         description: `${merchantCredentials.getValues("payItemId")}`,
        //         className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        //     });
        // }

    };

    // const loginMutation = useMutation({
    //     mutationFn:,
    //     onSuccess: async (data) => {
    //         const responseData: API.LoginResponse =
    //             (await data.json()) as API.LoginResponse;

    //         if (!responseData?.subject && !responseData?.token) {
    //             setLoading(false)
    //             toast({
    //                 variant: "destructive",
    //                 title: "",
    //                 description: "Error Signin in",
    //             });
    //         } else if (responseData?.token && responseData?.token) {
    //             setLoading(false)

    //             toast({
    //                 variant: "default",
    //                 title: "",
    //                 description: "Signin successful",
    //                 className:
    //                     "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
    //             });

    //             localStorage.setItem("subject", responseData?.subject as string);
    //             localStorage.setItem(
    //                 "merchantList",
    //                 JSON.stringify(responseData?.merchantList),
    //             );
    //             localStorage.setItem("token", responseData?.token as string);

    //             if (typeof window) {
    //                 router.push(`/dashboard`);
    //             }
    //             merchantCredentials.reset();
    //         } else {
    //             setLoading(false)

    //             toast({
    //                 variant: "destructive",
    //                 title: "",
    //                 description: "Error Signin in",
    //             });
    //         }
    //     },

    //     onError: (e) => {
    //         setLoading(false)

    //         toast({
    //             variant: "destructive",
    //             title: `${e}`,
    //             description: "error",
    //         });
    //     },
    // });

    async function onSubmit(values: z.infer<typeof MerchantCredentialSchema>) {
        // setLoading(true)
        // loginMutation.mutate(values);
    }

    return (
        <Form {...merchantCredentials}>
            <form
                onSubmit={merchantCredentials.handleSubmit(onSubmit)}
                className="w-[55%] rounded-[20px] bg-white border-[2px] py-[30px] p-[20px] border-[#EEF8FF] flex flex-col items-center"
            >

                <div className=" w-full flex flex-col items-center gap-2 mb-6">
                    <p className="text-[#0C394B] text-[16px] font-[700] leading-6">
                        Merchant Credentials
                    </p>
                    <p className="text-[#0C394B] text-[14px] font-[400] leading-5">
                        Test Mode
                    </p>

                </div>

                <FormField
                    control={merchantCredentials.control}
                    name="merchantCode"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5">Merchant Code</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        value={data?.merchantCode}
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="merchantCode"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={merchantCredentials.control}
                    name="clientId"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Client ID</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="clientId"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                {/* <FormField
                    control={merchantCredentials.control}
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
