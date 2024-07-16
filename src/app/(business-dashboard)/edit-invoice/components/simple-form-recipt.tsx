"use client";

import { ScrollArea } from "components/ui/scroll-area";
import React, { useState } from "react";
import Image from "next/image";
import defaultLogo from "../../../../assets/img/invoice/default.png";
import { Separator } from "components/ui/separator";
import { LuCopy } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import NameValue from "./name-value-widget";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";


const SimpleRecipt = ({ receipt, setReceipt, setPopup, modalData, handleModalDraftSubmit }: any) => {
  const { toast } = useToast();
  // console.log("modalData: ", modalData)
  const handleCopyToClipboard = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = link;

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
      description: `${link}`,
      className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
    });
  };
  const [link, setLink] = useState("http://137.184.47.182:3000/invoice");

  const reciptData: any[] = [
    {
      id: 0,
      title: "Sent date",
      value: `${modalData?.dueDate?.toDateString() || "undefined"}`,
    },
    {
      id: 1,
      title: "Amount",
      value: `NGN ${modalData?.amount ? modalData?.amount?.toLocaleString() : '00.00'}`,
    },
    {
      id: 2,
      title: "Status",
      value: "Pending",
    },
    // {
    //   id: 3,
    //   title: "Offline reference",
    //   value: "TTT989900002377",
    // },
  ];


  return (
    <div className="z-10 w-full h-full fixed top-0 left-0 flex flex-col items-center bg-[#828B8E85]">
      <ScrollArea className="w-full h-full">
        <div className="flex flex-col items-center w-full h-full pb-6 mt-[50px]">
          <div className="relative w-[700px] bg-[#FFFFFF] px-[68px] pt-[45px] pb-[60px] flex flex-col items-center">
            <MdClose
              onClick={() => setReceipt(false)}
              className="absolute top-[45px] right-[66px] text-[20px] text-[#F61212] cursor-pointer"
            />
            <div className="flex flex-col items-center gap-6 w-full pb-6 border-b border-dashed border-[#999999]">
              {
                modalData?.businessLogo ? <Image className="h-[86px] w-[86px]" height={86} width={86} src={URL.createObjectURL(modalData?.businessLogo)} alt="default" /> : <Image src={defaultLogo} alt="default" />

              }
              <div className="flex flex-col items-center w-full">
                <p className="text-[16px] text-[#555] font-[400] leading-normal">
                  A request will be sent out to
                </p>
                <p className="text-[20px] text-[#177196] font-[700] leading-normal">
                  {modalData?.customerName || "Undefined"}
                </p>
              </div>
              <p className="text-[#555555] text-[32px] font-[700] leading-normal">
                {`NGN ${modalData?.amount ? modalData?.amount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }) : '00.00'}`}
              </p>
            </div>
            {/* <div className="w-full border-b border-dashed border-[#999999] py-8 flex flex-col items-center">
              <div className="flex flex-col items-start gap-2 w-[70%]">
                <label
                  htmlFor="link"
                  className="text-[16px] text-[#0C394B] font-[700] leading-normal"
                >
                  Invoice Link
                </label>
                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[71px] relative">
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    id="link"
                    type="text"
                    placeholder="Copy Link"
                    className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                  />
                  <LuCopy
                    onClick={handleCopyToClipboard}
                    className="absolute right-[23px] top-[19.75px] cursor-pointer text-[26px] text-[#49454F]"
                  />
                </div>
              </div>
            </div> */}
            <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
              {reciptData.map(({ id, title, value }) => {
                return <NameValue key={id} title={title} value={value} />;
              })}
            </div>
            <div className="flex flex-col items-center w-full pt-10">
              <Button
                variant={"outline"}
                onClick={() => setReceipt(false)}
                className="min-h-[36px] gap-2 flex items-center font-[700] w-[100px] text-[#555555] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
              >
                <FiEdit className="text-[20px] text-[#555555]" />
                Edit
              </Button>
              <div className="flex flex-col items-center w-full gap-3 pt-10">
                <Button
                  className="min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                  onClick={() => setPopup(true)}
                >
                  Send Invoice
                </Button>
                {/* <Button
                  onClick={() => handleModalDraftSubmit()}
                  variant={"outline"}
                  className="min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
                >
                  Save as Draft
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SimpleRecipt;
