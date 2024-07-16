import React from "react";
import Logo from "../../../../assets/img/payaccess-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-row max-[1070px]:flex-col max-[1070px]:gap-10 justify-between pl-[24px] sm:pl-[100px] pt-16 pb-12 bg-[#07222D]">
      <div className="flex flex-col items-start gap-4 max-[1070px]:w-[70%] w-[320px]">
        <Image src={Logo} alt="footer" />
        <p className=" text-[16px] text-[#EAECF0] leading-6 font-[400]">
          A payment gateway is a technology solution that facilitates and
          manages online financial transactions between a customer and a
          merchant.
        </p>
      </div>
      <div className="max-[664px]:grid-cols-2 max-[756px]:grid-cols-4 grid grid-cols-5 w-[65%] max-[1070px]:w-full min-[1400px]:w-[68%] min-[1500px]:w-[63%] min-[1700px]:w-[60%]">
        <div className="flex flex-col items-start gap-3">
          <p className="mb-1 text-[14px] text-[#98A2B3] font-bold leading-5">
            Product
          </p>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Payment
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Products
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6 flex flex-row items-center gap-2"
            href={"/"}
          >
            Solutions
            <p className="flex flex-row items-center justify-center w-[42px] h-[22px] text-[12px] leading-[18px] font-[500] text-center rounded-2xl bg-[#F2F4F7] text-[#07222D]">
              New
            </p>
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            SME
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            API Documentation
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="mb-1 text-[14px] text-[#98A2B3] font-bold leading-5">
            Company
          </p>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            About Us
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Careers
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Press
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            News
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="max-[664px]:mt-10 mb-1 text-[14px] text-[#98A2B3] font-bold leading-5">
            Resources
          </p>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Blog
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Events
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Help Centre
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Support
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="max-[664px]:mt-10 mb-1 text-[14px] text-[#98A2B3] font-bold leading-5">
            Legal
          </p>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Terms
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Privacy
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Settings
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="max-[756px]:mt-10 mb-1 text-[14px] text-[#98A2B3] font-bold leading-5">
            Social
          </p>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Twitter
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Linkden
          </Link>
          <Link
            className="text-[16px] text-[#EAECF0] font-[400] leading-6"
            href={"/"}
          >
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
