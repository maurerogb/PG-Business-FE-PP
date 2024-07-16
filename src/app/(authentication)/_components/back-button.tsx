"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";

export const BackButton = () => {
  const route = useRouter();
  return (
    <>
      <p
        onClick={() => {
          route.back();
        }}
        className="cursor-pointer absolute sm:left-[74px] left-[20px] top-[52px] flex flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-[#000000]"
      >
        <LuChevronLeft className="text-[24px] text-[#000000]" />
        Back
      </p>
    </>
  );
};
