import { Metadata } from "next";
import Image from "next/image";

import sideBg from "assets/img/login/login-bg.png";
import Logo from "assets/img/payaccess-logo.png";

export const metadata: Metadata = {
  title: "Registeration",
  description: "Register",
};

export default function SelectBusinessProfileLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <div className="flex flex-row w-full h-full font-CenturyGothic">
        <div
          className={`login-bg relative hidden h-full w-2/5 flex-col overflow-hidden bg-primary-80 lg:flex`}
        >
          <Image
            className="absolute left-[50px] top-[48px] z-0 xl:left-[100px]"
            src={Logo}
            alt={"logo"}
          />
          <Image className="absolute z-0" src={sideBg} alt={"sidebg"} />
          <div className="absolute left-0 top-[229px] z-0 h-[126px] w-[55%] rounded-r-[42px] bg-secondary-60"></div>
          <div className="z-[1] ml-[50px] mt-[651px] flex w-[361px] flex-col items-start gap-4 bg-primary-80 xl:ml-[125px]">
            <p className="text-[24px] font-[700] leading-[125%] text-white">
              Easy payment method
            </p>
            <p className="text-[14px] font-[400] leading-[145%] text-white">
              Create an account with pay access for all your payment
              transactions pay access for all your payment trasactions
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
