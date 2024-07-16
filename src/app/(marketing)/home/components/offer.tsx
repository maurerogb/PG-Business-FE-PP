import React from "react";
import { Typography } from "components/ui/Typography";
import Image from "next/image";
import offerBg from "../../../../assets/img/home-offer/offer-bg.png";
import offerHero from "../../../../assets/img/home-offer/offer-hero.png";
import { OfferData } from "./offer-data";
import OfferCard from "./offer-card";

const Offer = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#FDD1C71F]">
      <Image
        className="absolute z-0 w-full h-full mb-[16px]"
        src={offerBg}
        alt={"offer bg"}
      />

      <div className="z-[1] my-[56px] flex w-[85%] lg:w-[941px] flex-col items-center gap-[20px]">
        <Typography
          level="p"
          className="text-center text-[48px] font-black leading-normal text-[#07222D]"
        >
          We offer endless enterprise solution.
        </Typography>
        <Typography
          level="p"
          className="text-center text-[16px] font-[400] leading-[26px] text-[#52525B] font-PlusJakartaSans"
        >
          Pay access Certainly! I can provide you with information about payment
          transactions. or question you have regarding payment transactions, and
          I'll be glad .
        </Typography>
      </div>
      <div className="z-[1] flex flex-col 2xl:flex-row items-center px-[24px] sm:px-[100px] gap-10 pb-[139px]">
        <Image className="" src={offerHero} alt={"offer bg"} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {OfferData.map(({ title, id, text }) => {
            return <OfferCard key={id} title={title} text={text} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Offer;
