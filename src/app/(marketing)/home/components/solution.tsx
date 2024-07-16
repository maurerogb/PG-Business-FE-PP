"use client";

import React, { useRef } from "react";
import { Typography } from "components/ui/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselData } from "./carousel-data";
import CarouselCard from "./carousel-card";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";

const GetStarted = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  const slickRef = useRef<HTMLDivElement | null | any>(null);

  const Next = () => {
    slickRef.current?.slickNext();
  };
  const Prev = () => {
    slickRef.current?.slickPrev();
  };

  return (
    <div className="relative flex w-full flex-col items-center bg-[#5A99DC0F] pb-[113.92px]">
      <div className="my-[55px] flex w-[85%] lg:w-[941px] flex-col items-center gap-[20px]">
        <Typography
          level="p"
          className="text-center text-[40px] font-black leading-normal text-[#07222D]"
        >
          Our unique solutions for every problems relating to fintech
        </Typography>
        <Typography
          level="p"
          className="text-center font-Poppins text-[18px] font-[400] leading-[30px] text-[#52525B]"
        >
          Pay access Certainly! I can provide you with information about payment
          transactions. or question you have regarding payment transactions, and
          I'll be glad .
        </Typography>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-4">
        <LuChevronLeft
          onClick={() => Prev()}
          className="text-[#115570] text-[30px] cursor-pointer"
        />
        <div className="w-[380px] xl:w-[1175px] lg:w-[780px] sm:w-[500px]">
          <Slider className="" {...settings} ref={slickRef}>
            {CarouselData.map(({ id, title, text, button, img }) => {
              return (
                <CarouselCard
                  key={id}
                  title={title}
                  text={text}
                  button={button}
                  img={img}
                />
              );
            })}
          </Slider>
        </div>
        <LuChevronRight
          onClick={() => Next()}
          className="text-[#115570] text-[30px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default GetStarted;
