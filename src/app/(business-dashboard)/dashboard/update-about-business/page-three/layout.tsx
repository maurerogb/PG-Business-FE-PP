import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Logo from "assets/img/payaccess-logo.png";
import { Button } from "components/ui/button";
import { Typography } from "components/ui/Typography";
import { BackButton } from "app/_components/back-button";

export const metadata: Metadata = {
  title: "Registration",
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
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex flex-col w-screen h-screen bg-white">
      <div className="w-full max-w-screen-xl px-10 py-10 mx-auto">
        <div className="w-full space-y-10 mb-14">
          <Image className="inline-block" src={Logo} alt={"logo"} />
          <div className="flex flex-row items-center justify-between">
            <BackButton position="static" />

            <Link
              className="inline-block text-base font-bold leading-5 text-primary-70"
              href={"/dashboard/unregistered-business"}
            >
              skip
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12 space-y-2">
          <Typography
            level="h3"
            className="font-CenturyGothic text-[32px] font-bold text-primary-70"
          >
            How are you planning to use Payaccess
          </Typography>

          <Typography className="text-sm font-normal text-primary-90" level="p">
            Please provide the information to access your dashboard.
          </Typography>
        </div>

        {children}
      </div>
    </div>
  );
}
