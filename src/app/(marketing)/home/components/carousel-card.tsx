import React from "react";
import { Typography } from "components/ui/Typography";
import { Button } from "components/ui/button";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";

type CarouselWidgetType = {
  title?: string;
  text?: string;
  button?: string;
  img?: any;
};

const CarouselCard = ({ title, text, button, img }: CarouselWidgetType) => {
  return (
    <div className="overflow-hidden relative rounded-[16px] bg-[#EEEEF0] w-[371px] h-[456px] border-[#9FCAD933] border-solid border-[1px] shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]">
      <div className="flex flex-col items-start gap-[8px] pl-[16px] pt-[16px] pr-[43px]">
        <Typography
          level="p"
          className="text-[20px] font-[700] leading-[26px] text-[#0C394B]"
        >
          {title || "undefined"}
        </Typography>
        <Typography
          level="p"
          className="text-[14px] font-[400] leading-[22px] text-[#0C394B]"
        >
          {text || "undefined"}
        </Typography>
        <Button className="bg-[#2682A1] h-[36px] rounded-[8px] text-[16px] font-[700] leading-[26px] text-[#ffffff] shadow-none flex flex-row items-center gap-2">
          {button || "undefined"}
          <LuChevronRight className="text-[25px] text-[white]" />
        </Button>
      </div>
      <Image
        className="absolute bottom-0 left-0 w-full"
        src={img}
        alt={"widget"}
      />
    </div>
  );
};

export default CarouselCard;
