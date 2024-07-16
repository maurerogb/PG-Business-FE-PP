"use client"
import React, { useState } from "react";
import { ScrollArea } from "components/ui/scroll-area";
import Image from "next/image";
import defaultLogo from "assets/img/invoice/default.png";
import { Button } from "components/ui/button";
import { FiEdit } from "react-icons/fi"
import payaccessLogo from "assets/img/payaccess-logo.png"
import { LuCreditCard, LuTrendingUp, LuTrendingDown, LuCornerLeftUp } from "react-icons/lu";
import { getMerchantDetailGuest } from "../../../api/payment"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation";
import SimpleModal from "./components/simple-modal";
import StandardModal from "./components/standard-modal";
// import payaccessLogo from "assets/img/payaccess-logo.png"



// let merchantList: any
// let token = ""
// let subject = ""
// let merchantId: any = ""

// if (
//   typeof window !== "undefined" &&
//   typeof window.localStorage !== "undefined"
// ) {
//   token = window.localStorage.getItem("token") as any
//   subject = window.localStorage.getItem("subject") as any
//   merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
//   merchantId = merchantList[0].id ? merchantList[0]?.id : null
// }



export default function PaymentForm() {
    const router = useRouter();
    const [toggle, setToggle] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const searchParams = useSearchParams();
    const invoiceNumber = searchParams?.get("invoiceNumber");
    const merchantCode = searchParams?.get("merchantCode");
    // console.log(invoiceNumber, merchantCode)
    const GetParameters = { invoiceNumber, merchantCode }
    const data: any = useQuery(['getMerchantDetailGuest', GetParameters], () => getMerchantDetailGuest(GetParameters));
    console.log("data: ", data?.data?.responseObject)
    const handlePaymentPage = () => {
        if (typeof window) {
            router.push(
                `/payment?invoiceNumber=${invoiceNumber}&merchantCode=${merchantCode}&grandAmount=${totalAmount}`
            )
        }
    }

    // console.log()

    return (
        <div className="flex flex-col w-full h-full bg-[white]">

            <ScrollArea>
                <div className="flex flex-col w-full py-16 items-center pb-[250px]">
                    <div className="flex flex-col items-center gap-6 w-full mb-10 ">
                        {/* <Image src={defaultLogo} alt="default" /> */}
                        {
                            data?.data?.responseObject?.businessLogo ?
                                <Image height={58} width={58} src={`http://137.184.47.182:8081/fileuploads/${data?.data?.responseObject?.businessLogo}`} alt="business logo" />
                                :
                                <Image height={58} width={58} src={defaultLogo} alt="default" />
                        }

                        <p className="text-center text-[20px] text-[#CA6B1B] font-[600] leading-normal w-full">
                            Invoice No: {invoiceNumber}
                        </p>

                        <p className="text-center text-[24px] text-[#115570] font-[600] leading-[28px] w-full">
                            {data?.data?.responseObject?.businessName} requested for payment
                        </p>

                    </div>

                    {
                        data?.data?.responseObject?.invoiceType === "STANDARD" ?
                            <StandardModal setTotalAmount={setTotalAmount} data={data?.data?.responseObject} />
                            :
                            <SimpleModal setTotalAmount={setTotalAmount} data={data?.data?.responseObject} />
                    }



                    <Button
                        onClick={() => handlePaymentPage()}
                        className="mt-14 min-h-[48px] p-3 font-[700] 2xl:w-[15%] w-[20%] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    >
                        Proceed to payment
                    </Button>

                    <div className="border-b border-dashed border-[#999999] w-[60%] my-10"></div>
                    <div className="flex flex-col gap-2 items-center">
                        <Image height={23.9} width={29} src={payaccessLogo} alt="payaccess logo" />
                        <p className="text-[#23AAE1] text-[14px] leading-normal font-[600]">
                            Powered by Payaccess
                        </p>
                    </div>
                    <p className="text-[#177196] text-center text-[14px] leading-normal font-[600] mt-8 w-[60%]">
                        If you have any issue about this invoice pls reach out to {data?.data?.responseObject?.businessName} with this mail {data?.data?.responseObject?.businessEmail}
                    </p>

                </div>
            </ScrollArea>
        </div>
    );
}








// businessLogo



// border - b border - dashed border - [#999999]