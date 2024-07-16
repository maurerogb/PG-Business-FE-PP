import React from "react";
import { Typography } from "components/ui/Typography";
import { DescriptionData } from "./description-data";
import DescriptionCard from "./description-card";

const SME = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[111px]">
      <div className="z-[1] w-[85%] lg:w-[941px] my-[56px] flex flex-col items-center gap-[20px]">
        <Typography
          level="p"
          className="text-center text-[48px] font-black leading-normal text-[#07222D]"
        >
          We offer endless SME solutions
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
      <div className="flex flex-col items-center w-full gap-6">
        {DescriptionData.map(
          ({ id, title, subtitle, text, linkText, link, img, direction }) => {
            return (
              <DescriptionCard
                key={id}
                title={title}
                subtitle={subtitle}
                text={text}
                linktext={linkText}
                link={link}
                img={img}
                direction={direction}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default SME;
