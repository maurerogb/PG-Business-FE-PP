import React from "react";
import Image from "next/image";

const ImageTextGroup = ({
  title,
  text,
  img,
}: {
  title?: string;
  text?: string;
  img?: any;
}) => {
  return (
    <div className="cursor-pointer flex flex-row items-center gap-[22px] w-full p-[10px] rounded-[8px] hover:bg-[#BFEFFF33]">
      <Image className="" src={img} alt={"icon"} />
      <div className="flex flex-col items-start gap-[10px]">
        <p className="text-[16px] font-[700] leading-[18px] text-[#115570]">
          {title}
        </p>
        <p className="text-[14px] font-[400] leading-[18px] text-[#0C394B]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ImageTextGroup;
