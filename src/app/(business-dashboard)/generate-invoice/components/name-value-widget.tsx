import React from "react";

const NameValue = ({ title, value }: any) => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <p className="text-[#0C394B] text-[16px] leading-normal font-[400]">
        {title}
      </p>
      <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
        {value}
      </p>
    </div>
  );
};

export default NameValue;
