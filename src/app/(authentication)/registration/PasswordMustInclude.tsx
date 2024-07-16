import React from "react";

const PasswordMustInclude = ({
  text,
  match,
}: {
  text?: string;
  match?: any;
}) => {
  //   console.log('.....', match);
  return (
    <>
      <p
        className={`font-normal text-[12px] text-center flex justify-center items-center rounded-[4px] opacity-[0.6000000238418579] p-1 ${
          match ? "text-[#1D8EBB] bg-[#ECFAFE]" : "text-[#555555] bg-[#E1E6ED]"
        }`}
      >
        {text}
      </p>
    </>
  );
};

export default PasswordMustInclude;
