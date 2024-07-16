import React from "react";
import Image from "next/image";

const CarouselWidget = ({ img, title, text }: any) => {
  return (
    <div className="flex flex-col items-center w-[376px]">
      <Image className="mb-[29px]" src={img} alt={"carousel image"} />
      <p className="mb-[16px] text-center text-[24px] font-[700] leading-[125%] text-[#FFFFFF]">
        {title}
      </p>
      <p className="text-center text-[14px] font-[400] leading-[145%] text-[#FFFFFF]">
        {text}
      </p>
    </div>
  );
};

export default CarouselWidget;
