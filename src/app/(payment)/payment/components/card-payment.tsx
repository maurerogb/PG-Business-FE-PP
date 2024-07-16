

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { LuChevronDown } from "react-icons/lu";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { Calendar } from "components/ui/calendar";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Textarea } from "components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { payWithCard } from "api/payment"
import { useRouter, useSearchParams } from "next/navigation";
import VerifyModal from "./email-verification-modal/modal";


// let merchantList: any
// let token = ""
// let subject = ""
// let merchantId: any = ""


// if (
//     typeof window !== "undefined" &&
//     typeof window.localStorage !== "undefined"
// ) {
//     token = window.localStorage.getItem("token") as any
//     subject = window.localStorage.getItem("subject") as any
//     merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
//     merchantId = merchantList[0].id ? merchantList[0]?.id : null
// }



const PasswordSchema = z.object({
    cardNumber: z.string().min(19, "Invalid Card Number"),
    expiringDate: z.string().min(5, "Invalid"),
    cvv: z.string().min(3, "Invalid"),
    pin: z.string().min(4, "Invalid"),
})



function getDateFormatted() {
    const inputString = new Date().toISOString();
    const resultString = inputString.replace(/[^a-zA-Z0-9]/g, '');
    return resultString;
}

export default function CardPayment({ amount, email }: any) {

    const [verifyModal, setVerifyModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [orderRef1, setOrderRef] = useState("")
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const merchantCode = searchParams?.get("merchantCode");
    const invoiceNumber = searchParams?.get("invoiceNumber");

    function getRandomNumber() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const character = characters.charAt(randomIndex);
            result += character;
        }
        setOrderRef(result)
        return result;
    }
    // console.log(getRandomNumber())


    let cardPayment = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            cardNumber: undefined,
            expiringDate: undefined,
            cvv: undefined,
            pin: undefined
        },
    });

    const formatExpiryDate = (event: any) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        // Add a leading zero if a single digit is entered (excluding 0 and 1)
        if (value.length === 1 && value !== '0' && value !== '1') {
            value = '0' + value;
        }
        const formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');

        input.value = formattedValue;

        if (value.length === 2) {
            // Automatically move focus to the year part after entering the month
            input.setSelectionRange(3, 3);
        }
    }


    const formatCardNumber = (event: any) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

        // Add hyphens after every four digits
        // const formattedValue = value.replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/, '$1-$2-$3-$4'); 

        const formattedValue = value.replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/, '$1-$2-$3-$4-$5');

        input.value = formattedValue;
    }
    const formatCvv = (event: any) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        input.value = value;
    }

    const formatPin = (event: any) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        input.value = value;
    }

    const cardPaymentMutation = useMutation({
        mutationFn: payWithCard,
        onSuccess: async (data) => {
            const responseData: API.PaymentStatusReponse = (await data.json()) as API.PaymentStatusReponse;
            console.log("response: ", responseData)
            if (responseData?.statusCode === "1") {
                setLoading(false)

                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Making Payment",
                });
            }
            if (responseData?.statusCode === "00" || "0") {
                setLoading(false)

                toast({
                    variant: "default",
                    title: "",
                    description: responseData?.responseObject?.plainTextSupportMessage,
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                cardPayment.reset();
                setVerifyModal(true)

            }
        },
        onError: (e) => {
            setLoading(false)
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    async function onSubmit(values: z.infer<typeof PasswordSchema>) {
        setLoading(true)
        // console.log(values);
        let newValues = {
            // orderRef: `${getRandomNumber()}${invoiceNumber}${getDateFormatted()}`,
            customData: {
                merchantCode,
                invoiceNumber
            },
            orderRef: `${getRandomNumber()}`,
            merchantCode,
            redirectUrl: "http://test.com",
            currencyCode: "NGN",
            amount,
            terminalCode: "6H39FUDB",
            channel: "WEB",
            cardDetails: {
                pan: values?.cardNumber.split("-").join(""),
                // pan: "5060990580000217499",
                expDate: values?.expiringDate.split("/").reverse().join(""),
                // expDate: "5003",
                cvv: values?.cvv,
                pin: values?.pin
            },
            customerId: "test",
        }
        console.log(newValues)

        cardPaymentMutation.mutate(newValues as any);
    }



    return (
        <Form {...cardPayment}>
            <form
                onSubmit={cardPayment.handleSubmit(onSubmit)}
                className="w-full px-20 flex flex-col items-center bg-white pb-20"
            >
                <p className="text-[#000000] text-[14px] leading-[145%] font-[400] mb-7">Please provide your bank details</p>
                <FormField
                    control={cardPayment.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            {/* <div className="w-full flex flex-row items-center justify-end gap-4"> */}
                            <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[400]">
                                Card Number
                            </FormLabel>
                            <FormControl className="w-full bg-[red]">
                                <Input
                                    maxLength={19}
                                    type="text"
                                    className="border-[#BBBBBB] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 text-[#666666] text-[16px] leading-[136.5%] font-[400]"
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    {...field}
                                    onInput={(event) => formatCardNumber(event)}
                                />
                            </FormControl>
                            {/* </div> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full flex flex-row items-start gap-[17px]">
                    <FormField
                        control={cardPayment.control}
                        name="expiringDate"
                        render={({ field }) => (
                            <FormItem className="w-full mt-6">
                                {/* <div className="w-full flex flex-row items-center justify-end gap-4"> */}
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[400]">
                                    Expiring date
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        maxLength={5}
                                        type="text"
                                        className="border-[#BBBBBB] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 text-[#666666] text-[16px] leading-[136.5%] font-[400]"
                                        placeholder="MM/YY"
                                        {...field}
                                        onInput={(event) => formatExpiryDate(event)}
                                    />
                                </FormControl>
                                {/* </div> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={cardPayment.control}
                        name="cvv"
                        render={({ field }) => (
                            <FormItem className="w-full mt-6">
                                {/* <div className="w-full flex flex-row items-center justify-end gap-4"> */}
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[400]">
                                    CVV
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        maxLength={3}
                                        type="text"
                                        className="border-[#BBBBBB] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 text-[#666666] text-[16px] leading-[136.5%] font-[400]"
                                        placeholder="XXX"
                                        {...field}
                                        onInput={(event) => formatCvv(event)}
                                    />
                                </FormControl>
                                {/* </div> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={cardPayment.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[23px]">
                            {/* <div className="w-full flex flex-row items-center justify-end gap-4"> */}
                            <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[400]">
                                PIN
                            </FormLabel>
                            <FormControl className="w-full bg-[red]">
                                <Input
                                    maxLength={4}
                                    type="password"
                                    className="border-[#BBBBBB] rounded-[6px] min-h-[46px] shadow-none bg-white w-full p-2 text-[#666666] text-[16px] leading-[136.5%] font-[400]"
                                    placeholder="XXXX"
                                    {...field}
                                    onInput={(event) => formatPin(event)}
                                />
                            </FormControl>
                            {/* </div> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button
                    disabled={loading}
                    className="mt-[52px] min-h-[48px] font-[700] w-[225px] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    type="submit"
                // onClick={(e) => handleModal(e)}
                >
                    {loading ? "Loading..." : "Pay now"}
                </Button>
                {
                    verifyModal ? <VerifyModal setVerifyModal={setVerifyModal} email={email} orderRef={orderRef1} merchantCode={merchantCode} /> : ""
                }

            </form>

        </Form>
    );
}




