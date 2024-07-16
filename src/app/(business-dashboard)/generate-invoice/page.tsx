import React from "react";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import { CreateInvoice } from "./components/create-invoice-modal";
import { ScrollArea } from "components/ui/scroll-area";

export default function GenerateInvoice() {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-screen h-screen pt-[85px] pl-[100px] bg-[white]">
      <Link
        href={"/invoice"}
        className="cursor-pointer absolute sm:left-[74px] left-[20px] top-[52px] flex flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-[#000000]"
      >
        <LuChevronLeft className="text-[24px] text-[#000000]" />
        Back
      </Link>
      <div className="mt-[40px] mb-[25px] flex flex-col items-start gap-2">
        <p className="text-[#000000] text-[20px] font-[700]">
          Create an Invoice
        </p>
        <p className="text-[#000000] text-[16px] font-[400]">
          Receive payments from your clients using our invoice.
        </p>
      </div>
      <ScrollArea>
        <div className="flex flex-col w-full mt-[26px]">
          <div className="w-full flex flex-col items-center max-w-[794px] pb-[50px] self-center">
            <CreateInvoice />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

