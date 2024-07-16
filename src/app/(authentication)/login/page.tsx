"use client";

import Image from "next/image";
import Link from "next/link";
import sideBg from "../../../assets/img/login/login-bg.png";
import logo from "../../../assets/img/ppsl.png";
import { Typography } from "components/ui/Typography";
import { login, loginBackground, logoPath } from "lib/constants";
import LoginForm from "./form";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselWidget from "./components/carouselWidget";
import { carouselWidgetData } from "./components/carouselWidgetData";
import { useState } from "react";
import "./components/carousel-styles.css";

export default function AuthenticationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current: any) => setCurrentSlide(current),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          bottom: "-56px !important",
        }}
      >
        <ul style={{}} className="">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        // style={{
        //   margin: "0px 0px !important"
        // }}
        className={`h-[4px] rounded-[4px] transition-all .1s ease-in-out ${
          currentSlide === i
            ? "bg-[#F38020] w-[21px] translate-x-[-50%]"
            : "bg-[#D9D9D9] w-[5px]"
        }`}
      ></div>
    ),
  };
  return (
    <div className="flex flex-row w-full h-full ">
      <div
        className={`lg:flex hidden login-bg overflow-hidden relative w-1/2 h-full bg-[#0c0d0e] flex-col items-center justify-center`}
      >
        {/* <Image className="absolute top-[50px] left-[40px] z-0 h-auto max-w-full" src={sideBg} alt={"sidebg"} /> */}
        <div className="w-[377.5px]">
          <Slider className="" {...settings} dotsClass="slick-dots">
            {carouselWidgetData.map(({ id, title, text, img }) => {
              return (
                <CarouselWidget key={id} title={title} text={text} img={img} />
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2 w-full h-full items-center justify-center xl:px-[160px] lg:px-[100px] md:px-[120px] sm:px-[200px] px-[20px]">
        <Image className="mb-0" src={logo} alt={"payaccess logo"} />
        <Typography
          className="mb-4 text-[32px]  leading-[40px] font-bold inline-block bg-transparent"
          level="h1"
        >
          Welcome back!
        </Typography>
        <Typography
          className="mb-8 inline-block text-[14px] text-center font-[400] leading-[145%] text-[#115570]"
          level="h6"
        >
          Please provide the information to access your dashboard.
        </Typography>

        {/* logic and control for form signin is located here */}
        <LoginForm />
        <Link href="/forget-password" className="text-sm font-semibold text-primary-70">
          Forgot Password
        </Link>
        <div className="flex flex-row items-center gap-2 mt-4">
          <Typography
            className="inline-block  bg-transparent text-[#0C394B] text-sm font-[400]"
            level="h4"
          >
            New to pay access?
          </Typography>
          <Link
            href="/registration"
            className="text-sm font-semibold text-primary-70"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
