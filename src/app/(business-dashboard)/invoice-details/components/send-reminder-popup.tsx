"use client";

import { ScrollArea } from "components/ui/scroll-area";
import React, { useState } from "react";
import Image from "next/image";
import defaultLogo from "../../../../assets/img/invoice/default.png";
import { Separator } from "components/ui/separator";
import { LuAlertCircle } from "react-icons/lu";
import { FiEdit, FiCornerLeftUp } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";

export default function ReminderPopup({ value, setReminder, handleReminder, modalData, paidId }: any) {
    return (
        <div className="z-10 w-full h-full fixed top-0 left-0 flex flex-col items-center bg-[#828B8E85]">
            <ScrollArea className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full pb-6 mt-[150px]">
                    <div className="rounded-[12px] relative w-[400px] bg-[#FFFFFF] p-6 flex flex-col items-center shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
                        <div className="flex flex-col items-center justify-center rounded-full min-w-[55px] min-h-[55px] bg-[#F2FCF2] border-[10px] border-[#F2FCF2]">
                            <LuAlertCircle className="text-[24px] text-[#25AF36]" />
                        </div>
                        <p className="mt-5 text-[#101828] text-[20px] leading-[28px] font-[700]">
                            Reminder
                        </p>
                        <p className="w-[312px] mt-2 text-[#667085] text-[14px] leading-[20px] font-[400] text-center">
                            Are you sure you want to send an email reminder to {value}
                        </p>
                        <div className="flex flex-col items-center w-full gap-3 mt-8">
                            <Button onClick={() => handleReminder()} className="min-h-[44px] font-[700] w-full hover:bg-[#48B8E6] bg-[#48B8E6] hover:opacity-[0.4]">
                                Send Reminder
                            </Button>
                            <Button
                                variant={"outline"}
                                className="min-h-[44px] w-full hover:bg-[#48B8E6] hover:text-[white] hover:opacity-[0.4] text-[#344054] text-[14px] leading-normal font-[700]"
                                onClick={() => setReminder(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

