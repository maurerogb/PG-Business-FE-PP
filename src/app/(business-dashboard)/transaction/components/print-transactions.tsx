import { IoMdCheckmark } from "react-icons/io";

export default function PrintTransactionTable({ transactionTableData, Transactionref }: any) {
    <style type="text/css" media="print">
        {"@media print{@page {size: landscape}}"}
    </style>

    const heading = ["Merchant Code", "Service Type", "Order Ref", "Amount", "Date", "Status"]

    const dateFormatter = (dateString: any) => {
        const dateObject = new Date(dateString);

        // Formatting the date as "month day"
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        console.log(formattedDate);
        return formattedDate;

    }
    const timeFormatter = (dateString: any) => {
        console.log("dateString: ", dateString)
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
        console.log(timeString);
        return timeString;

    }





    return (
        <div ref={Transactionref} className='flex flex-col items-center relative bg-white'>

            <p className="text-[#177196] text-[40px] font-[700] leading-normal my-[20px]">Transactions Summary</p>


            <div className="w-full flex flex-col 2xl:items-center items-start px-5">

                <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                    {
                        heading.map((value, id) => {
                            return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                        })

                    }
                </div>

                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                    {transactionTableData?.list?.map(({ id, channel, amount, merchantCode, transactionStatus, updatedAt, serviceType, payAccessCurrency, merchantName, orderRef }: any, idx: React.Key | null | undefined) => {
                        return <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full h-[44px]'>

                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantCode}</p>
                            {/* <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantName}</p> */}
                            {/* <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{channel}</p> */}
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{serviceType}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{orderRef}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`${payAccessCurrency === "NGN" ? "₦" : ""} ${amount}`}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] '>{`${dateFormatter(updatedAt)}, ${timeFormatter(updatedAt)}`}</p>



                            <div className='w-[20%] flex flex-col items-center'>
                                {transactionStatus === "PENDING" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Pending"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}

                                {transactionStatus === "SUCCESS" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Success"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {transactionStatus === "AWAITING_OTP_VALIDATION" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Processing"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {transactionStatus === "DELETED" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Deleted"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}

                            </div>


                        </div>
                    })}
                </div>


            </div >

        </div >
    )

}








