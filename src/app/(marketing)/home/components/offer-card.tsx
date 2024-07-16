import React from "react";
import Image from "next/image";
import FeaturedIcon from "../../../../assets/img/home-offer/Featured-icon.png";
import { Typography } from "components/ui/Typography";

const OfferCard = ({ title, text }: any) => {
  return (
    <div className="w-[353px] h-[232px] rounded-[16px] border-[#258BEA] border-solid border-[1px] bg-[#fff] flex flex-col items-center pt-[12px]">
      <Image className="mb-5" src={FeaturedIcon} alt={"Featured Icon"} />

      <Typography
        level="p"
        className="mb-2 text-center text-[20px] font-black leading-[30px] text-[#07222D]"
      >
        {title}
      </Typography>
      <Typography
        level="p"
        className="text-center text-[14px] font-[400] leading-[24px] text-[#2A2A2A] w-[322px]"
      >
        {text}
      </Typography>
    </div>
  );
};

export default OfferCard;
