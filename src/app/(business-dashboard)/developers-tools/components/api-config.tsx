
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
import { getMerchantKeys } from "api/developers-tools"
import { generateNewMerchantKeys } from "api/developers-tools"
import { useQuery } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "api/login";
import { values } from "lodash";

const ApiConfigurationSchema = z.object({
    secretKey: z.string(),
    publicKey: z.string(),
});


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

export default function ApiConfiguration({ isKeyOpen, setAuthenticate }: any) {
    const router = useRouter();
    const pathName = usePathname()
    const [secretKey1, setSecretKey] = useState<string | undefined>("")
    const [publicKey1, setPublicKey] = useState<string | undefined>("")
    // const [loading, setLoading] = useState<boolean>(false)
    console.log(merchantId)
    const GetParameters = { merchantId, token }
    const data: any = useQuery(['getMerchantKeys', GetParameters], () => getMerchantKeys(GetParameters));

    const prefill = data?.data?.responseObject
    // console.log("devloper api: ", data)

    const { toast } = useToast();

    let apiConfiguration = useForm<z.infer<typeof ApiConfigurationSchema>>({
        resolver: zodResolver(ApiConfigurationSchema),
        defaultValues: {
            publicKey: data?.data?.responseObject?.publicKey,
            secretKey: data?.data?.responseObject?.secretKey,
        }

    });



    useEffect(() => {
        apiConfiguration.setValue("publicKey", data?.data?.responseObject?.publicKey)
        apiConfiguration.setValue("secretKey", data?.data?.responseObject?.secretKey)
    }, [data?.data?.responseObject?.publicKey, data?.data?.responseObject?.secretKey])

    const handleCopyToClipboard = (e: any) => {
        if (e.target.id === "secretKey") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = apiConfiguration.getValues("secretKey");
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
                description: `${apiConfiguration.getValues("secretKey")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        } else if (e.target.id === "publicKey") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = apiConfiguration.getValues("publicKey");

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
                description: `${apiConfiguration.getValues("publicKey")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        }

    };
    // console.log(apiConfiguration.watch("publicKey"))

    const apiConfigMutation = useMutation({
        mutationFn: generateNewMerchantKeys,
        onSuccess: async (data) => {
            const responseData: API.StatusReponse =
                (await data.json()) as API.StatusReponse;

            if (responseData?.statusCode === "1") {

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error generating new keys",
                });
            } else if (responseData?.statusCode === "0") {

                toast({
                    variant: "default",
                    title: "Success",
                    description: "New keys generated",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                // setLoading(true)


            } else {

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error Generating new keys",
                });
            }
        },

        onError: (e) => {

            console.log(e)
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    const handleGenerateNewKeys = () => {
        const requestData = {
            token,
            merchantId,
            apiMode: "TEST"
        }
        console.log(requestData)
        apiConfigMutation.mutate(requestData);
    }



    return (
        <Form {...apiConfiguration}>
            <form
                // onSubmit={apiConfiguration.handleSubmit(onSubmit)}
                className="w-[55%] rounded-[20px] bg-white border-[2px] py-[30px] p-[20px] border-[#EEF8FF] flex flex-col items-center"
            >

                <div className=" w-full flex flex-col items-center gap-2 mb-6">
                    <p className="text-[#0C394B] text-[16px] font-[700] leading-6">
                        API Configuration (Test mode)
                    </p>
                    <p className="text-[#0C394B] text-[14px] font-[400] leading-5">
                        Test Mode
                    </p>

                </div>

                <FormField
                    control={apiConfiguration.control}
                    name="secretKey"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5">Test Secret Key</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        type={isKeyOpen ? "text" : "password"}
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                        placeholder="Copy Link"
                                        {...field}
                                        value={data?.data?.responseObject?.secretKey}
                                    />
                                    {isKeyOpen ? <LuCopy
                                        id="secretKey"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    /> : ""}
                                    {!isKeyOpen ? <LuCopy
                                        onClick={() => setAuthenticate(true)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    /> : ""}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p onClick={handleGenerateNewKeys} className="cursor-pointer text-[#CA6B1B] text-[12px] font-[700] leading-normal mt-[10px] self-start">
                    Generates new Secret key
                </p>


                <FormField
                    control={apiConfiguration.control}
                    name="publicKey"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Test Public Key</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type={isKeyOpen ? "text" : "password"}
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                        value={data?.data?.responseObject?.publicKey}

                                    />
                                  
                                    {isKeyOpen ? <LuCopy
                                        id="publicKey"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    /> : ""}
                                    {!isKeyOpen ? <LuCopy
                                        onClick={() => setAuthenticate(true)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    /> : ""}
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />

            </form>
        </Form>
    );
}
