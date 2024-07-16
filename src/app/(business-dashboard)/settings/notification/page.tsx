"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "components/ui/button"
import { TransactionNotification } from './transaction'
import { TransferNotification } from './transfer'
import { EarningNotification } from './earning'
import { EnableNotification } from './enable'
import { useToast } from "components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updateNotification } from "api/settings";
import { useQuery } from "@tanstack/react-query"
import { getMerchantSetting } from "api/settings"





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




export default function page() {
    const { toast } = useToast();

    const GetParameters = { merchantId, token }
    const data: any = useQuery(['getMerchantSetting', GetParameters], () => getMerchantSetting(GetParameters));
    const [Notification, setNotification] = useState<any>({
        transactionNotificationByEmail: data?.data?.responseObject?.transactionNotificationByEmail,
        customerNotificationByEmail: data?.data?.responseObject?.customerNotificationByEmail,
        transferNotificationByEmailForCredit: data?.data?.responseObject?.transferNotificationByEmailForCredit,
        transferNotificationByEmailForDebit: data?.data?.responseObject?.transferNotificationByEmailForDebit,
        merchantReceiveEarningsOption: data?.data?.responseObject?.merchantReceiveEarningsOption,
        enableNotificationForTransfer: data?.data?.responseObject?.enableNotificationForTransfer,
        enableNotificationForInvoicing: data?.data?.responseObject?.enableNotificationForInvoicing,
        enableNotificationForPaymentLink: data?.data?.responseObject?.enableNotificationForPaymentLink,
        enableNotificationForSettlement: data?.data?.responseObject?.enableNotificationForSettlement,

    })

    // useEffect(() => {
    //     setNotification(
    //         {
    //             ...Notification,
    //             transactionNotificationByEmail: data?.data?.responseObject?.transactionNotificationByEmail,
    //             customerNotificationByEmail: data?.data?.responseObject?.customerNotificationByEmail,
    //             transferNotificationByEmailForCredit: data?.data?.responseObject?.transferNotificationByEmailForCredit,
    //             transferNotificationByEmailForDebit: data?.data?.responseObject?.transferNotificationByEmailForDebit,
    //             merchantReceiveEarningsOption: data?.data?.responseObject?.merchantReceiveEarningsOption,
    //             enableNotificationForTransfer: data?.data?.responseObject?.enableNotificationForTransfer,
    //             enableNotificationForInvoicing: data?.data?.responseObject?.enableNotificationForInvoicing,
    //             enableNotificationForPaymentLink: data?.data?.responseObject?.enableNotificationForPaymentLink,
    //             enableNotificationForSettlement: data?.data?.responseObject?.enableNotificationForSettlement,
    //         }
    //     )
    // }, [])


    // console.log("data for notification: ", Notification)

    const settingsMutation = useMutation({
        mutationFn: updateNotification,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;

            if (responseData?.statusCode === "1" || responseData?.statusCode === "701") {
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error updating notification settings",
                });
            }

            if (responseData?.statusCode === "0") {
                toast({
                    variant: "default",
                    title: "",
                    description: "Notification Settings updated",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });


            }
        },

        onError: (e) => {
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });


    const handleNotificationUpdate = () => {
        const values = {
            transactionNotificationByEmail: Notification.transactionNotificationByEmail || data?.data?.responseObject?.transactionNotificationByEmail || false,
            customerNotificationByEmail: Notification.customerNotificationByEmail || data?.data?.responseObject?.customerNotificationByEmail || false,
            transferNotificationByEmailForCredit: Notification.transferNotificationByEmailForCredit || data?.data?.responseObject?.transferNotificationByEmailForCredit || false,
            transferNotificationByEmailForDebit: Notification.transferNotificationByEmailForDebit || data?.data?.responseObject?.transferNotificationByEmailForDebit || false,
            merchantReceiveEarningsOption: Notification.merchantReceiveEarningsOption || data?.data?.responseObject?.merchantReceiveEarningsOption,
            enableNotificationForTransfer: Notification.enableNotificationForTransfer || data?.data?.responseObject?.enableNotificationForTransfer || false,
            enableNotificationForInvoicing: Notification.enableNotificationForInvoicing || data?.data?.responseObject?.enableNotificationForInvoicing || false,
            enableNotificationForPaymentLink: Notification.enableNotificationForPaymentLink || data?.data?.responseObject?.enableNotificationForPaymentLink || false,
            enableNotificationForSettlement: Notification.enableNotificationForSettlement || data?.data?.responseObject?.enableNotificationForSettlement || false,
            merchantId: merchantId,
            token: token,
        }
        settingsMutation.mutate(values as any)
        console.log("notifications value: ", values)
    }

    return (
        <div className="flex flex-col items-center w-full gap-8 pl-8">
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                    Transaction Notification
                </p>
                <TransactionNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                    Transfer Notification
                </p>
                <TransferNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                    How do you want to get your earnings.
                </p>
                <EarningNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                    Enable Notifications
                </p>
                <EnableNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
            </div>
            <Button
                onClick={() => handleNotificationUpdate()}
                className="mb-10 rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
                Update
            </Button>

        </div>
    )
}
