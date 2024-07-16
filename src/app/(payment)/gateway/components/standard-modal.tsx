"use-client"
import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getMerchantBreakDownGuest } from "api/payment"


export default function StandardModal({ data, setTotalAmount }: any) {


    // console.log("data: ", data)
    const requestData = {
        merchantId: data?.createdByMerchantId, invoiceId: data?.id
    }

    let breakDownData: any = useQuery(['getMerchantBreakDownGuest', requestData], () => getMerchantBreakDownGuest(requestData));

    // console.log("guest breakdown: ", breakDownData?.data?.responseObject)

    const breakDown: any[] = breakDownData?.data?.responseObject
    const sendDate = new Date(data?.createdAt).toDateString().split(" ");
    const dueDate = new Date(data?.dueDate).toDateString().split(" ");
    const shipping = data?.shippingFee
    const taxPercent = data?.taxAmount
    const discountPercent = data?.discount


    // console.log("testing properties: ", fillData?.businessLogo, fillData)
    // console.log("breakDownData: ", breakDown)
    let [amountValue, setAmountValue] = useState<any>()
    let [discount, setDiscount] = useState<any>()
    let [subTotal, setSubTotal] = useState<any>()
    let [tax, setTax] = useState<any>()
    let [grandTotal, setGrandTotal] = useState<any>()



    useEffect(() => {
        if (breakDown) {
            const calculateTotalAmount = () => {
                let totalAmount = 0;
                breakDown?.forEach(({ quantity, costPerUnit }) => {
                    // console.log(quantity, costPerUnit)
                    const itemAmount = quantity * costPerUnit;
                    totalAmount += itemAmount;
                });
                return totalAmount;
            }
            setAmountValue(calculateTotalAmount())
        }
    }, [breakDown])





    // useEffect(() => {
    //     if (breakDown) {
    //         setDiscount((discountPercent / 100) * amountValue)
    //     }
    // }, [amountValue, discountPercent])

    useEffect(() => {
        if (breakDown) {
            setDiscount(data?.discountType === "VALUE" ? discountPercent : ((discountPercent / 100) * amountValue))
        }
    }, [amountValue, discountPercent, data])




    useEffect(() => {

        if (breakDown) {
            setSubTotal(amountValue - discount)
        }
    }, [discount, amountValue])
    useEffect(() => {
        if (breakDown) {
            setTax(subTotal * ((taxPercent) / 100))
        }
    }, [subTotal, taxPercent])
    useEffect(() => {
        if (breakDown) {
            setGrandTotal(subTotal + tax + (shipping))
            setTotalAmount(subTotal + tax + (shipping))
        }
    }, [tax, subTotal, shipping])





    const dateFormatter = (dateString: any) => {
        const dateObject = new Date(dateString);
        // console.log(dateObject)
        // Formatting the date as "month day"
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        // console.log(formattedDate);
        return formattedDate;

    }

    const timeFormatter = (dateString: any) => {
        // console.log("dateString: ", dateString)
        const dateObject = new Date(dateString);
        // Extracting hours, minutes, and seconds
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? 'pm' : 'am';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        // Format minutes with two digits
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Creating a time string in h:mm a format
        const timeString = `${formattedHours}:${formattedMinutes}${amOrPm}`;
        // console.log(timeString);
        return timeString;

    }

    return (
        <div className='flex flex-col items-center 2xl:w-[55%] w-[70%] gap-4'>

            <div className="w-full flex flex-col gap-6 items-center py-7 px-6 self-center bg-white rounded-[10px] border-[#D6D6D6] border">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className='flex flex-col items-start gap-6'>

                        <p className="text-[#000000] text-[16px] leading-normal font-[600]">
                            From
                        </p>
                        <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal">
                            {data ? data?.customerName : "Loading..."}
                        </p>
                    </div>
                    <div className="bg-[#D6F5FF33] rounded p-[10px] gap-[11px] flex flex-col items-start">
                        <div className="flex flex-row items-center gap-9">
                            <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Send on</p>
                            <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">{data ? `${dateFormatter(data?.createdAt)} ${data?.createdAt.split("-")[0]}, ${timeFormatter(data?.createdAt)}` : "Loading..."}</p>
                        </div>
                        <div className="flex flex-row items-center gap-9">
                            <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Due date</p>
                            <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">{data ? `${dateFormatter(data?.dueDate)} ${data?.dueDate.split("-")[0]}, ${timeFormatter(data?.dueDate)}` : "Loading..."}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-row items-center justify-between w-full">
                    <div className='flex flex-col items-start gap-6 self-start'>

                        <p className="text-[#000000] text-[16px] leading-normal font-[600]">
                            To
                        </p>
                        <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal">
                            Faith Oluwatobi12@gmail.com
                        </p>
                    </div>

                </div> */}


            </div>

            {/* ---------------------------------Second Modal------------------ */}


            <div className="w-full flex flex-col items-center pt-10 pb-20 px-[24px] self-center bg-white rounded-[10px] border-[#D6D6D6] border">
                <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-[#555555] text-[20px] leading-normal font-[600]">
                        Description
                    </p>
                    <p className="text-[#115570] text-[18px] leading-normal font-[400]">
                        {data?.invoiceNote}
                    </p>

                </div>
                <div className="flex flex-row items-center justify-between w-full mt-4">
                    <p className="text-[#555555] text-[20px] leading-normal font-[600]">
                        Invoice Item
                    </p>
                    <p className="text-[#0C394B] text-[20px] leading-[22px] font-[600]">
                        Amount and Quantity
                    </p>

                </div>
                <div className='flex flex-col items-start w-full border-b border-dashed border-[#999999] gap-4 pt-4 pb-9'>
                    {
                        breakDownData?.data?.responseObject ? breakDownData?.data?.responseObject.map(
                            ({ id, costPerUnit, invoiceId, invoiceItem, quantity }: any) => {
                                return (
                                    <div key={id} className="flex flex-row items-start justify-between w-full">
                                        <p className="text-[#0C394B] text-[18px] leading-normal font-[400] text-start w-[289px]">
                                            {invoiceItem}
                                        </p>
                                        <p className="text-[#115570] text-[18px] leading-normal font-[400]">
                                            {`NGN ${costPerUnit?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}`}*{quantity}
                                        </p>
                                    </div>
                                )
                            }
                        ) : ""
                    }
                </div>


                <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                                Subtotal
                            </p>
                            <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                                NGN {subTotal?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                                Tax
                            </p>
                            <p className="text-[#D92D20] text-[20px] leading-normal font-[700]">
                                -NGN {tax?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                                Discount
                            </p>
                            <p className="text-[#25AF36] text-[20px] leading-normal font-[400]">
                                +NGN {discount?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-start justify-between w-full">
                        <p className="text-[#115570] text-[16px] leading-normal font-[400] w-[289px] text-start">
                            Shipping
                        </p>
                        <p className="text-[#0C394B] text-[20px] leading-[22px] font-[600]">
                            {`NGN ${shipping?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                            })}`}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row items-start justify-between w-full pt-6">
                    <p className="text-[#555555] text-[16px] leading-normal font-[600] w-[289px] text-start">
                        Grand Total
                    </p>
                    <p className="text-[#555555] text-[20px] leading-normal font-[600]">
                        NGN {grandTotal?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}


