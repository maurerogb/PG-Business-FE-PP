import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { token, merchantId } from "api/baseUrl";
import { deleteInvoice } from "api/invoice";
import DeletePopup from "app/(business-dashboard)/generate-invoice/components/delete-popup";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
//import { useRouter } from "next/router";
import { useState } from "react"; 
import { IoMdCheckmark } from "react-icons/io";
import { LuChevronsRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";



const SettlementTable =({ invoiceTableData, row, setRow, setPage, page }: any)=>{

    const { toast } = useToast();

    const [deleteId, setDeleteId] = useState<string | undefined | null>("")
    const [deletePopup, setPopup] = useState<boolean>(false)
    const heading = ["Merchant Code", "Merchant Name", "Channel","Service Type","Order Ref","Currency", "Amount","Date","Status","" ]
   // const router = useRouter();
    const handlePageNumber = (option: any) => {
        if (option === "next") {
            if (page < Math.ceil(invoiceTableData?.totalCount / row) - 1) {
                // console.log("next: ", page)
                setPage(Number(page) + 1)
            } else {
                return;
            }
        }
        else if (option === "prev") {
            if (page > 0) {
                // console.log("prev: ", page)
                setPage(Number(page) - 1)
            } else {
                return;
            }

        }
    }
    const handleView = (id: any) => {
        if (typeof window) {
        //    router.push(`/invoice-details?id=${id}`);
        }
    }



    const deleteInvoiceMutation = useMutation({
        mutationFn: deleteInvoice,
        onSuccess: async (data: any) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;

            if (responseData?.statusCode === "1") {
                setPopup(false)
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Deleting Invoice",
                });
            }

            if (responseData?.statusCode === "0") {
                setPopup(false)
                toast({
                    variant: "default",
                    title: "",
                    description: "Invoice Deleted",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });

                if (typeof window) {
                  //  router.push(`/invoice`);
                }
            }
        },

        onError: (e) => {
            setPopup(false)
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });


    // console.log(invoiceTableData?.list)
    const handleDelete = (id: string) => {
        const requestData = {
            token,
            merchantId,
            invoiceId: id
        }
        // console.log(requestData)
        deleteInvoiceMutation.mutate(requestData as any);

    }

    const handleDeletePopup = (id: string) => {
        setDeleteId(id)
        setPopup(true)
    }
    return (
        <div className='flex flex-col items-center relative'>
           
            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                {
                    heading.map((value, id) => {
                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                    })

                }
            </div>
            <ScrollArea className='w-full h-[400px]'>

                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                    {invoiceTableData?.list?.map(({ id, channel, amount,  merchantCode, transactionStatus, updatedAt, serviceType, payAccessCurrency,merchantName, orderRef }: any, idx: React.Key | null | undefined) => {
                        return <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full h-[44px]'>
                          
                          <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantCode}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{merchantName}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{channel}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{serviceType}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{orderRef}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{payAccessCurrency}</p>
                            {/* <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'></p> */}
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`${amount}`}</p>                            
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{ updatedAt}</p>
                            {/* <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`PAY${String(id).padStart(8, '0')}`}</p> */}
                            
                            
                            
                            
                            
                            <div className='w-[20%] flex flex-col items-center'>
                                {transactionStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Pending"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {/* {transactionStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#115570] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"PENDING"}
                                    <LuChevronsRight className="text-[16px]" />
                                </p>} */}
                                {transactionStatus === "SUCCESS" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Success"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {transactionStatus === "AWAITING_OTP_VALIDATION" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Processing"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {transactionStatus === "DELETED" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Deleted"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                   {/* <Button  className='outline-none border-none'>
                                            <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
                                        </Button>  */}
                            </div>

                            <div className='w-[20%] flex flex-row items-center justify-end gap-[20px]'>
                                {/* <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center font-raleway'>{dueDate}</p> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className='outline-none border-none'>
                                            <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
                                        </Button>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
                                        <div className='w-full flex flex-col items-center gap-2'>
                                            {transactionStatus === "DELETED" ? "" : <p onClick={() => handleView(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                View
                                            </p>} 
                                            <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Download
                                            </p>
                                              {transactionStatus === "DELETED" ? "" : <p onClick={() => handleDeletePopup(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Delete
                                            </p>} 
                                            {transactionStatus === "DELETED" ? "" : <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Revoke
                                            </p>}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>

                        </div>
                    })}
                </div>
            </ScrollArea>

            <div className='w-full h-10 mb-6 flex flex-row items-center gap-12 justify-end bg-white pr-[20px]'>

                <div className='flex flex-row items-center w-[155px]'>
                    <span className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-full flex flex-row items-center'>{`Rows per page: ${row}`}</span>
                    <Select
                        onValueChange={(value) => setRow(value)}
                        value={row}
                    >
                        <SelectTrigger className='w-fit border-none shadow-none' >
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-[70px] flex flex-row items-center'>{`${invoiceTableData?.list[0]?.id}-${invoiceTableData?.list[invoiceTableData?.list.length - 1]?.id} of ${invoiceTableData?.totalCount}`}</p>
                <div className='flex flex-row items-center gap-12 w-[90px]'>
                    <LuChevronLeft onClick={() => handlePageNumber("prev")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                    <LuChevronRight onClick={() => handlePageNumber("next")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                </div>


            </div>
            {
                deletePopup ? <DeletePopup setPopup={setPopup} deleteId={deleteId} handleDelete={handleDelete} /> : ""
            }


        </div>
    )

}


export default SettlementTable





