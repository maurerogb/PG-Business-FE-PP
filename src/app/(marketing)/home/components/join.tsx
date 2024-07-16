import React from "react";
import img1 from "../../../../assets/img/home-join/1.png";
import img2 from "../../../../assets/img/home-join/2.png";
import img3 from "../../../../assets/img/home-join/3.png";
import img4 from "../../../../assets/img/home-join/4.png";
import img5 from "../../../../assets/img/home-join/5.png";
import img6 from "../../../../assets/img/home-join/6.png";
import img7 from "../../../../assets/img/home-join/7.png";
import Image from "next/image";

const JoinData: any[] = [
  {
    id: 0,
    Img: img1,
  },
  {
    id: 1,
    Img: img2,
  },
  {
    id: 2,
    Img: img3,
  },
  {
    id: 3,
    Img: img4,
  },
  {
    id: 4,
    Img: img5,
  },
  {
    id: 5,
    Img: img6,
  },
  {
    id: 6,
    Img: img7,
  },
];
const Join = () => {
  return (
    <div className="w-full flex flex-col gap-[32px] items-center py-[67px]">
      <p className="font-[700] leading-[22px] text-[20px] text-center text-[#475569] ">
        Join over 200+ companies already using Payaccess business
      </p>
      <div className="flex flex-row items-center justify-center flex-wrap gap-16 px-[24px]">
        {JoinData.map(({ id, Img }) => {
          return (
            <Image key={id} className="" src={Img} alt={`company ${id}`} />
          );
        })}
      </div>
    </div>
  );
};

export default Join;
