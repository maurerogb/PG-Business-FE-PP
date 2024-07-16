import React from "react";
import { Typography } from "components/ui/Typography";
import Image from "next/image";
import pay from "../../../../assets/img/home-pay-mangement/side-view-woman.png";
import shadow from "../../../../assets/img/home-pay-mangement/Shadow.png";
import icon from "../../../../assets/img/home-pay-mangement/icon.png";

const graphStyleData: any[] = [
  {
    id: 0,
    style: "h-[116px]",
  },
  {
    id: 1,
    style: "h-[151px]",
  },
  {
    id: 2,
    style: "h-[97px]",
  },
  {
    id: 3,
    style: "h-[125px]",
  },
  {
    id: 4,
    style: "h-[141px]",
  },
  {
    id: 5,
    style: "h-[70px]",
  },
  {
    id: 6,
    style: "h-[116px]",
  },
  {
    id: 7,
    style: "h-[97px]",
  },
  {
    id: 8,
    style: "h-[132px]",
  },
  {
    id: 9,
    style: "h-[125px]",
  },
];
const PaymentManagement = () => {
  return (
    <div className="flex flex-col items-center px-[24px] lg:px-[100px] pb-[131px] bg-gradient-to-r from-[#fdfdfd8c] to-[#d7e2e600] via-transparent">
      <div className="z-[1] w-[85%] lg:w-[941px] my-[56px] flex flex-col items-center gap-[20px]">
        <Typography
          level="p"
          className="text-center text-[48px] font-black leading-normal text-[#07222D]"
        >
          Build your personal Freelancing with the payment management.
        </Typography>
        <Typography
          level="p"
          className="text-center text-[16px] font-[400] leading-[26px] text-[#52525B] font-PlusJakartaSans"
        >
          Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
          proin faucibus nibh et sagittis a. Lacinia purus ac amet.
        </Typography>
      </div>
      <div className="relative h-[680px] lg:h-[511.88px] sm:h-[800px]  w-full lg:w-[983px]">
        <div className="p-8 flex flex-col items-center z-[1] absolute top-0 lg:left-0 left-[9px] sm:left-[85px] w-[95%] sm:w-[358px] h-[477px] rounded-[15px] bg-[#FAFAF9] border-solid border border-[#D3EEF9] ">
          <Image className="self-start mb-[5.5px] " src={icon} alt={"icon"} />
          <p className="font-PlusJakartaSans font-[500] text-[15px] text-[#71717A] leading-6 mb-[5px]">
            www.payaccess business.com
          </p>
          <div className="mb-[22px] w-full py-[14px] gap-1 px-[18px] rounded-[10px] bg-[#18181B] flex flex-row items-center">
            <div className="flex flex-col items-start">
              <p className="font-PlusJakartaSans leading-[21px] text-[13px] font-[500] text-[#A1A1AA]">
                Insight
              </p>
              <p className="font-PlusJakartaSans leading-[22px] text-[13px] font-[700] text-[#fff]">
                You have made $39,492 this week!
              </p>
            </div>
            <p className="font-[500] leading-8 text-[24px]">🎉</p>
          </div>
          <div className="z-[2] w-full flex flex-col items-center justify-between gap-3 h-[238px] bg-[#FFFFFF] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(35,40,105,0.08)] py-[12px] px-[18px]">
            <div className="flex flex-row items-start justify-between w-full gap-2">
              <p className="w-[66.6px] font-PlusJakartaSans leading-[22px] text-[13px] font-[700] text-[#18181B]">
                Payment Report
              </p>
              <p className="w-[81.9px] text-end font-PlusJakartaSans leading-[22px] text-[13px] font-[700] text-[#D4D4D8]">
                Mar21-Apr 20
              </p>
            </div>
            <div className="w-full h-[151px] flex flex-row items-end justify-between gap-4">
              {graphStyleData.map(({ id, style }) => {
                return (
                  <div
                    key={id}
                    className={`w-[8.1px] bg-[#E4E4E7] rounded-t-[9px] ${style}`}
                  ></div>
                );
              })}
            </div>
          </div>
          <Image className="absolute bottom-0" src={shadow} alt={"shadow"} />
        </div>
        <Image
          className="z-0 absolute bottom-0 lg:right-0 w-full lg:w-[672px]"
          src={pay}
          alt={"pay management"}
        />
      </div>
    </div>
  );
};

export default PaymentManagement;
