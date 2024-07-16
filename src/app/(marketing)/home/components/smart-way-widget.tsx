import React from "react";
import { Typography } from "components/ui/Typography";
import { MdOutlineStar } from "react-icons/md";

const SmartWayWidget = ({ text }: any) => {
  return (
    <div className="flex flex-row items-center gap-6">
      <MdOutlineStar className="text-[25px] text-[#DB944B]" />
      <Typography
        level="p"
        className="text-[24px] font-black leading-[147%] text-[#000]"
      >
        {text}
      </Typography>
    </div>
  );
};

export default SmartWayWidget;
