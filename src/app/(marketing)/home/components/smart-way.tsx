import React from "react";
import { Typography } from "components/ui/Typography";
import Image from "next/image";
import smartWay from "../../../../assets/img/home-smart-way/holding-laptop 1.png";
import SmartWayWidget from "./smart-way-widget";

const SmartWayData: any[] = [
  {
    id: 0,
    text: "Fully automated payment",
  },
  {
    id: 1,
    text: "Quick response support",
  },
  {
    id: 2,
    text: "Quick response support",
  },
];
const SmartWay = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center p-[24px] xl:pl-[100px] pb-[106px] w-full gap-20">
      <div className="flex flex-col items-start w-full xl:w-[539px]">
        <Typography
          level="p"
          className="text-[14px] font-black leading-normal text-[#222] mb-[18px]"
        >
          Designs for developers
        </Typography>
        <Typography
          level="p"
          className="text-start text-[24px] sm:text-[40px] font-black sm:leading-[53px] leading-[110.5%] text-[#07222D] mb-[22px]"
        >
          The smart way to receiving outstanding payment
        </Typography>
        <Typography
          level="p"
          className="text-start text-[14px] font-[400] leading-5 text-[#07222D] mb-[45px]"
        >
          Pay access Certainly! I can provide you with information about payment
          transactions. or question you have regarding payment transactions, and
          I'll be glad .
        </Typography>
        <div className="flex flex-col items-start gap-5">
          {SmartWayData.map(({ id, text }) => {
            return <SmartWayWidget key={id} text={text} />;
          })}
        </div>
      </div>
      <Image className="self-start " src={smartWay} alt={"pay management"} />
    </div>
  );
};

export default SmartWay;
