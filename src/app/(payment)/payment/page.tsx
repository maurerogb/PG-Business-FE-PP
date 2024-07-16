"use client"
import React, { useState } from "react";
import { ScrollArea } from "components/ui/scroll-area";
import Image from "next/image";
import { Button } from "components/ui/button";
import { FiEdit } from "react-icons/fi"
import payaccessLogo from "assets/img/payaccess-logo.png"
import { LuCreditCard, LuTrendingUp, LuTrendingDown, LuCornerLeftUp } from "react-icons/lu";
import CardPayment from "./components/card-payment";
import TransferPayment from "./components/transfer";
import BankPayment from "./components/bank-payment";
import UssdPayment from "./components/ussd-payment";
import { getMerchantDetailGuest } from "../../../api/payment"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation";



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
  const [toggle, setToggle] = useState(0);
  const searchParams = useSearchParams();
  const invoiceNumber = searchParams?.get("invoiceNumber");
  const merchantCode = searchParams?.get("merchantCode");
  const grandAmount: any = searchParams?.get("grandAmount");
  // console.log(invoiceNumber, merchantCode)
  const GetParameters: any = { invoiceNumber, merchantCode }
  const data: any = useQuery(['getMerchantDetailGuest', GetParameters], () => getMerchantDetailGuest(GetParameters));
  // console.log("data: ", data?.data?.responseObject)
  // console.log(typeof grandAmount)

  return (
    <div className="flex flex-col w-full h-full bg-[white]">

      <ScrollArea>
        <div className="flex flex-col w-full py-16">
          <div className="w-full flex flex-col items-center max-w-[794px] px-5 pt-[47px] self-center bg-white shadow-lg rounded-[8px] border-[#99999927] border">
            <Image src={payaccessLogo} alt="payaccess logo" />
            <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal my-4">
              {/* {data?.data?.responseObject?.customerEmail} */}
              Invoice Number: {invoiceNumber}
            </p>
            <p className="text-[#555555] text-[32px] font-[700] leading-normal mb-[24px]">
              {`NGN ${grandAmount ? Number(grandAmount)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }) : '00.00'}`}
            </p>
            {/* <p className="text-[#CA6B1B] text-[16px] font-[700] leading-6 mb-[24px]">Test</p> */}
            <div className="w-full border-y border-dashed border-[#999999] flex flex-row flex-wrap items-center gap-[8px] justify-center py-[25px] mb-10">
              <Button
                onClick={() => setToggle(0)}
                variant={toggle === 0 ? "default" : "outline"}
                className={`min-h-[36px] gap-2 flex items-center font-[700] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4] ${toggle === 0 ? "bg-[#23AAE1] text-[#fff]" : "bg-[#F6FDFF] text-[#555555]"}`}
              >
                <LuCreditCard className={`text-[20px] ${toggle === 0 ? " text-[#fff]" : " text-[#555555]"}`} />
                Card
              </Button>
              <Button
                onClick={() => setToggle(1)}
                variant={"outline"}
                className={`min-h-[36px] gap-2 flex items-center font-[700] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4] ${toggle === 1 ? "bg-[#23AAE1] text-[#fff]" : "bg-[#F6FDFF] text-[#555555]"}`}
              >
                <LuTrendingUp className={`text-[20px] ${toggle === 1 ? " text-[#fff]" : " text-[#555555]"}`} />
                Transfer
              </Button>
              {/* <Button
                onClick={() => setToggle(2)}
                variant={"outline"}
                className={`min-h-[36px] gap-2 flex items-center font-[700] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4] ${toggle === 2 ? "bg-[#23AAE1] text-[#fff]" : "bg-[#F6FDFF] text-[#555555]"}`}
              >
                <LuTrendingDown className={`text-[20px] ${toggle === 2 ? " text-[#fff]" : " text-[#555555]"}`} />
                Bank
              </Button> */}
              <Button
                onClick={() => setToggle(3)}
                variant={"outline"}
                className={`min-h-[36px] gap-2 flex items-center font-[700] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4] ${toggle === 3 ? "bg-[#23AAE1] text-[#fff]" : "bg-[#F6FDFF] text-[#555555]"}`}
              >
                <LuCornerLeftUp className={`text-[20px] ${toggle === 3 ? " text-[#fff]" : " text-[#555555]"}`} />
                USSD
              </Button>
            </div>
            <div className="w-full flex flex-col items-center">
              {toggle === 0 ? <CardPayment amount={data?.data?.responseObject?.amount} email={data?.data?.responseObject?.customerEmail} /> : ""}
              {toggle === 1 ? <TransferPayment /> : ""}
              {toggle === 2 ? <BankPayment /> : ""}
              {toggle === 3 ? <UssdPayment /> : ""}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}



