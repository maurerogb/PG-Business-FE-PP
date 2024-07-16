import React from "react";
import { GrTwitter } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";

const SubFooter = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between px-[24px] sm:px-[100px] bg-[#2682A1] h-[120px] sm:h-[68px]">
      <p className="font-[400] pt-5 sm:pt-0 text-[16px] leading-6 text-[#fff]">
        © 2023 Payaccess. All rights reserved
      </p>
      <div className="flex flex-row items-center gap-6">
        <Link className="" href={"/"}>
          <GrTwitter className="text-[#fff] text-[24px] cursor-pointer" />
        </Link>
        <Link className="" href={"/"}>
          <AiFillLinkedin className="text-[#fff] text-[24px] cursor-pointer" />
        </Link>
        <Link className="" href={"/"}>
          <BsFacebook className="text-[#fff] text-[24px] cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default SubFooter;
