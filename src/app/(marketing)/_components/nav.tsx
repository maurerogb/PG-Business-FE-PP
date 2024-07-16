"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/ui/navigation-menu";
import { Button } from "components/ui/button";
import logo from "../../../assets/img/payaccess-logo.png";
import Image from "next/image";
import ImageTextGroup from "./text-image-group";
import { solutionData, developersData, companysData } from "./nav-item-data";
import { LuMenu } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { ScrollArea } from "components/ui/scroll-area";

export const Nav = () => {
  const [solutions, setSolutions] = React.useState(0);
  const [isOpen, setOpen] = React.useState(0);

  return (
    <div className="fixed z-50 top-0 left-0 bg-white flex w-full flex-col items-center shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]">
      <div className="bg-white flex h-[104px] w-full flex-row items-center justify-between lg:px-[100px] px-[24px]">
        <Image height={52} width={43} src={logo} alt={"PayAcess"} />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
                Product
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="h-[391px] w-[606px] flex flex-row items-center overflow-hidden">
                  <div className="w-[39%] h-full p-[25px] bg-[#D7DFE136] flex flex-col items-center gap-[13px]">
                    <p
                      onClick={() => setSolutions(0)}
                      className={`h-[45px] flex flex-row items-center rounded-[8px] w-full p-[10px] cursor-pointer ${
                        !solutions
                          ? "bg-[#E6E6E6] text-[#0C394B] text-[16px] font-[700] leading-[18px]"
                          : "bg-none text-[#07222D] text-[16px] font-[400] leading-[18px]"
                      }`}
                    >
                      Enterprise Solution
                    </p>
                    <p
                      onClick={() => setSolutions(1)}
                      className={`h-[45px] flex flex-row items-center rounded-[8px] w-full p-[10px] cursor-pointer ${
                        solutions
                          ? "bg-[#E6E6E6] text-[#0C394B] text-[16px] font-[700] leading-[18px]"
                          : "bg-none text-[#07222D] text-[16px] font-[400] leading-[18px]"
                      }`}
                    >
                      SME Solution
                    </p>
                  </div>
                  {!solutions ? (
                    <div
                      className={`w-[61%] h-full bg-[white] px-[18px] py-[30px] flex flex-col items-start gap-4`}
                    >
                      {solutionData.enterprise.map(
                        ({ id, img, title, text }) => {
                          return (
                            <ImageTextGroup
                              key={id}
                              img={img}
                              title={title}
                              text={text}
                            />
                          );
                        },
                      )}
                    </div>
                  ) : (
                    <div
                      className={`w-[61%] h-full bg-[white] px-[18px] py-[30px] flex flex-col items-start gap-4`}
                    >
                      {solutionData.sme.map(({ id, img, title, text }) => {
                        return (
                          <ImageTextGroup
                            key={id}
                            img={img}
                            title={title}
                            text={text}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
                Developers
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <div className="h-[391px] w-[387px] flex flex-row items-center overflow-hidden">

              </div> */}
                <div
                  className={`w-[387px] bg-[white] px-[18px] py-[30px] flex flex-col items-start gap-4`}
                >
                  {developersData.map(({ id, img, title, text }) => {
                    return (
                      <ImageTextGroup
                        key={id}
                        img={img}
                        title={title}
                        text={text}
                      />
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
                Help
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  className={`w-[387px] bg-[white] px-[18px] py-[30px] flex flex-col items-start gap-4`}
                >
                  {companysData.map(({ id, img, title, text }) => {
                    return (
                      <ImageTextGroup
                        key={id}
                        img={img}
                        title={title}
                        text={text}
                      />
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          asChild
          className="md:flex hidden h-[54px] w-[121px] rounded-[8px] font-DMSans text-[16px] font-[700] leading-[18px] text-[#ffffff] shadow-none"
        >
          <Link href={"/login"}>Login</Link>
        </Button>

        {!isOpen ? (
          <LuMenu
            onClick={() => setOpen(1)}
            className="md:hidden flex cursor-pointer text-[36px] text-[#23AAE1]"
          />
        ) : (
          <CgClose
            onClick={() => setOpen(0)}
            className="md:hidden flex cursor-pointer text-[36px] text-[#5F738C]"
          />
        )}
      </div>

      <ScrollArea
        className={`bg-white w-full transition-all duration-500 ease-in-out ${
          isOpen ? "h-[550px] p-[24px]" : "h-0 p-0"
        }`}
      >
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-[24px]"
        >
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="text-[18px] font-[400] leading-[20px] text-[#0C394B] font-DMSans">
              Product
            </AccordionTrigger>
            <AccordionContent>
              {/* -------------Products sub categories-------------- */}
              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-[12px]"
              >
                <AccordionItem value="item-1" className={`border-b-0`}>
                  <AccordionTrigger
                    icon={false}
                    className={`focus:bg-[#F4FCFE] text-[14px] p-[18px] rounded-[8px] font-[700] leading-[18px] text-[#0C394B] font-DMSans`}
                  >
                    Enterprise Solution
                  </AccordionTrigger>
                  <AccordionContent className={``}>
                    <div
                      className={`mt-[10px] border border-solid border-[#D3EEF9] rounded-[8px] px-[10px] py-[22px] w-full flex flex-col items-start gap-4`}
                    >
                      {solutionData.enterprise.map(
                        ({ id, img, title, text }) => {
                          return (
                            <ImageTextGroup
                              key={id}
                              img={img}
                              title={title}
                              text={text}
                            />
                          );
                        },
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className={`border-b-0`} value="item-2">
                  <AccordionTrigger
                    icon={false}
                    className={`focus:bg-[#F4FCFE] text-[14px] p-[18px] rounded-[8px] font-[700] leading-[18px] text-[#0C394B] font-DMSans`}
                  >
                    SME Solution
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className={`mt-[10px] border border-solid border-[#D3EEF9] rounded-[8px] px-[10px] py-[22px] w-full flex flex-col items-start gap-4`}
                    >
                      {solutionData.sme.map(({ id, img, title, text }) => {
                        return (
                          <ImageTextGroup
                            key={id}
                            img={img}
                            title={title}
                            text={text}
                          />
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* -------------Products sub categories ends-------------- */}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b-0" value="item-2">
            <AccordionTrigger className="text-[18px] font-[400] leading-[20px] text-[#0C394B] font-DMSans">
              Developers
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={`mt-[10px] border border-solid border-[#D3EEF9] rounded-[8px] px-[10px] py-[22px] w-full flex flex-col items-start gap-4`}
              >
                {developersData.map(({ id, img, title, text }) => {
                  return (
                    <ImageTextGroup
                      key={id}
                      img={img}
                      title={title}
                      text={text}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b-0" value="item-3">
            <AccordionTrigger className="text-[18px] font-[400] leading-[20px] text-[#0C394B] font-DMSans">
              Help
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={`mt-[10px] border border-solid border-[#D3EEF9] rounded-[8px] px-[10px] py-[22px] w-full flex flex-col items-start gap-4`}
              >
                {developersData.map(({ id, img, title, text }) => {
                  return (
                    <ImageTextGroup
                      key={id}
                      img={img}
                      title={title}
                      text={text}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b-0" value="item-4">
            <AccordionTrigger className="text-[18px] font-[400] leading-[20px] text-[#0C394B] font-DMSans">
              Company
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={`mt-[10px] border border-solid border-[#D3EEF9] rounded-[8px] px-[10px] py-[22px] w-full flex flex-col items-start gap-4`}
              >
                {companysData.map(({ id, img, title, text }) => {
                  return (
                    <ImageTextGroup
                      key={id}
                      img={img}
                      title={title}
                      text={text}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          asChild
          className="h-[54px] mt-[41px] w-full text-[16px] font-[700] leading-[18px] text-[white] font-DMSans"
        >
          <Link href={"/login"}>Login</Link>
        </Button>
      </ScrollArea>
    </div>
  );
};
