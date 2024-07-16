import React from "react";
import Image from "next/image";
import profileGroup from "../../../../assets/img/home-join/Avatar group.png";
import { Button } from "components/ui/button";

const JoinWidget = () => {
  return (
    <div className="w-full py-[55px] flex flex-col items-center px-[24px]">
      <div className="bg-[#CDE6F08F] rounded-[16px] flex flex-col items-center gap-8 py-8 px-2 w-full lg:w-[877px]">
        <Image className="" src={profileGroup} alt={"join"} />
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#005677] text-center text-[20px] font-[600] leading-8">
            Join over 20 people currently using Payaccess
          </p>
          <p className="text-[#667085] text-center text-[14px] font-[400] leading-7">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <Button className="bg-[#23AAE1] h-[48px] w-[234px] rounded-[7px] text-[16px] font-[700] leading-[147%] text-[#ffffff] shadow-none">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default JoinWidget;
