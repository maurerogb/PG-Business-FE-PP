"use client"

import { ScrollArea } from "components/ui/scroll-area"
import React, { useState } from "react"
import Image from "next/image"
import defaultLogo from "../../../../assets/img/invoice/default.png"
import { Separator } from "components/ui/separator"
import { LuCopy } from "react-icons/lu"
import { FiEdit, FiCornerLeftUp } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import NameValue from "./name-value-widget"
import { Button } from "components/ui/button"
import { useToast } from "components/ui/use-toast"


const StandardRecipt = ({ receipt, setReceipt, setPopup, modalData, handleModalSubmitDraft, handleModalDelete }: any) => {
  const { toast } = useToast();

  // console.log("from standard: ", modalData)
  const handleCopyToClipboard = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input")
    tempInput.value = link

    // Append the input element to the DOM (it doesn't need to be visible)
    document.body.appendChild(tempInput)

    // Select the text inside the input element
    tempInput.select()

    // Copy the selected text to the clipboard
    document.execCommand("copy")

    // Remove the temporary input element
    document.body.removeChild(tempInput)
    toast({
      variant: "default",
      title: "Copied",
      description: `${link}`,
      className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
    })
  }
  const [link, setLink] = useState("http://137.184.47.182:3000/invoice")

  const reciptData: any[] = [
    {
      id: 0,
      title: "Sent date",
      value: `${modalData?.dueDate?.toDateString() || "undefined"}`,
    },
    {
      id: 1,
      title: "Amount",
      value: `NGN ${modalData?.amountValue ? modalData?.amountValue?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      }) : '00.00'}`,

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
  ]

  return (
    <div className="z-10 w-full h-full fixed top-0 left-0 flex flex-col items-center bg-[#828B8E85]">
      <ScrollArea className="w-full h-full">
        <div className="flex flex-col items-center w-full h-full pb-6 mt-[50px]">
          <div className="relative w-[700px] bg-[#FFFFFF] px-[68px] pt-[45px] pb-[119px] flex flex-col items-center">
            <MdClose onClick={() => setReceipt(false)} className="absolute top-[45px] right-[66px] text-[20px] text-[#F61212] cursor-pointer" />
            <div className="flex flex-col items-center gap-6 w-full pb-6 border-b border-dashed border-[#999999]">

              {/* <Image src={defaultLogo} alt="default" /> */}

              <p className="text-[#555555] text-[32px] font-[700] leading-normal mt-10 ">
                {/* {`NGN ${modalData?.amountValue ? modalData?.amountValue?.toLocaleString() : '00.00'}`} */}
                {`NGN ${modalData.grandTotal ? modalData.grandTotal?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }) : '00.00'}`}
              </p>
              <p className="text-center text-[16px] text-[#555] font-[400] leading-normal w-full">
                A request will be sent out to{" "}
                <span className="text-[16px] text-[#177196] font-[700] leading-normal">
                  {modalData?.customerName || "Undefined"}
                </span>
              </p>

            </div>
            <div className="w-full border-b border-dashed border-[#999999] py-8 flex flex-col items-start gap-8">
              {/* <div className="flex flex-col items-start gap-2 w-[70%]">
                <label htmlFor="link" className="text-[16px] text-[#0C394B] font-[700] leading-normal">
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
                  <LuCopy onClick={handleCopyToClipboard} className="absolute right-[23px] top-[19.75px] cursor-pointer text-[26px] text-[#49454F]" />
                </div>
              </div> */}
              <div className="flex flex-row items-start gap-2">
                <Button onClick={() => setReceipt(false)}
                  variant={"outline"}
                  className="min-h-[36px] gap-2 flex items-center font-[700] text-[#555555] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  <FiEdit className="text-[20px] text-[#555555]" />
                  Edit
                </Button>
                <Button
                  variant={"outline"} onClick={() => handleModalDelete()}
                  className="min-h-[36px] gap-2 flex items-center font-[700] text-[#808080] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  <FiCornerLeftUp className="text-[20px] text-[#808080]" />
                  Delete
                </Button>
              </div>
            </div>
            <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
              {reciptData.map(({ id, title, value }) => {
                return <NameValue key={id} title={title} value={value} />
              })}
            </div>

            <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-row items-center justify-between w-full">

                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Subtotal
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    {`NGN ${modalData.subTotal?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Discount
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    {`- NGN ${modalData.discount?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`}
                  </p>

                </div>
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-row items-center justify-between w-full">

                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Tax
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    {`NGN ${modalData.tax?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Shipping
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    {`NGN ${modalData.shipping?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`}
                  </p>

                </div>
                {/* <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                    Discount
                  </p>
                  <p className="text-[#115570] text-[20px] leading-normal font-[400]">
                    +NGN 00.00
                  </p>
                </div> */}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-6">
              <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                Grand Total
              </p>
              <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                {`NGN ${modalData.grandTotal?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`}
              </p>
            </div>

            <div className="flex flex-col items-center w-full gap-3 pt-20">
              <Button className="min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]" onClick={() => setPopup(true)}>
                Send Invoice
              </Button>
              {/* <Button
                onClick={() => handleModalSubmitDraft()}
                variant={"outline"}
                className="min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
              >
                Save as Draft
              </Button> */}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default StandardRecipt
