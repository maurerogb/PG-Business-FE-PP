"use client"


import { MdContactSupport } from "react-icons/md"
import { Button } from "components/ui/button"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

export default function Support({ setTicket }: any) {
    const supportData = ["Contact us", "Share feedback", "Raise Ticket"]

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <Button
                        className="fixed z-40 right-[72px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal"
                    >
                        <MdContactSupport className="text-[24px] text-[#fff]" />
                        Support
                    </Button> */}
                    <Button
                        className="group p-[0px] fixed z-40 right-[0px] gap-[9px] bottom-[46px] rounded-l-lg rounded-r-none w-[40px] h-[40px] flex items-center justify-center bg-[#48B8E6] font-bold text-white overflow-hidden transition-all duration-300 hover:w-[120px]"
                    >
                        <MdContactSupport className="text-[24px] text-[#fff]" />
                        <span className="hidden group-hover:block">Support</span>
                    </Button>


                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
                    <div className='w-full flex flex-col items-center gap-2'>
                        {
                            supportData.map((value, id) => {
                                if (value === "Raise Ticket") {
                                    return (
                                        <p
                                            onClick={() => setTicket(true)}
                                            key={id}
                                            className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'
                                        >
                                            {value}
                                        </p>
                                    )
                                } else {
                                    return (
                                        <p key={id} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                            {value}
                                        </p>
                                    )
                                }
                            })
                        }
                    </div>
                </DropdownMenuContent>
            </DropdownMenu >
        </>


    )
}
