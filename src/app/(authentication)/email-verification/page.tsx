import Image from "next/image";
import Link from "next/link";
import sideBg from "../../../assets/img/login/login-bg.png";
import Logo from "../../../assets/img/payaccess-logo.png";
import { Typography } from "components/ui/Typography";
import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import { LuChevronLeft } from "react-icons/lu";
import EmailVerificationForm from "./form";
import { ScrollArea } from "components/ui/scroll-area";
import { BackButton } from "../_components/back-button"



export default function AuthenticationPage() {
  return (
    <div className="relative flex flex-row w-full h-full ">
      <div
        className={`lg:flex hidden overflow-hidden login-bg relative w-[50%] h-full bg-[#177196] flex-col`}
      >
        <Image
          className="absolute z-0 xl:left-[100px] left-[50px] top-[48px]"
          src={Logo}
          alt={"logo"}
        />
        <Image className="absolute z-0" src={sideBg} alt={"sidebg"} />
        <div className="absolute left-0 top-[229px] w-[55%] z-0 h-[126px] bg-[#F38020] rounded-r-[42px]"></div>
        <div className="bg-[#177196] z-[1] xl:ml-[125px] ml-[50px] mt-[651px] flex flex-col items-start gap-4 w-[361px]">
          <p className="text-[24px] font-[700] leading-[125%] text-[#fff]">
            Easy payment method
          </p>
          <p className="text-[14px] font-[400] leading-[145%] text-[#fff]">
            Create an account with pay access for all your payment transactions
            pay access for all your payment trasactions
          </p>
        </div>
      </div>
      <ScrollArea className="relative lg:w-[50%] w-full h-full">
        <div className="lg:pt-[210px] pt-[180px] flex flex-col w-full h-full items-center xl:px-[160px] lg:px-[100px] md:px-[120px] sm:px-[200px] px-[20px]">
          <div className="absolute top-0 bg-white w-full sm:px-[74px] px-[20px] pb-[30px] pt-[52px] flex flex-row items-center justify-between">
            <div>
              <BackButton />
            </div>

            <p className="mt-[5px] flex flex-row items-center gap-[7px] text-[14px] font-[400] leading-none text-[#000000]">
              Already have an account ?
              <Link className="text-[#1D8EBB] font-[600]" href="/login">
                Login
              </Link>
            </p>
          </div>

          <div className="mb-6 rounded-full h-[92px] w-[92px] bg-[#EDFAFF] flex flex-row items-center justify-center">
            <LiaEnvelopeOpenTextSolid className="text-[55px] text-[#177196]" />
          </div>
          <Typography
            className="text-center mb-4 text-[32px] leading-[40px] font-black inline-block bg-transparent"
            level="h1"
          >
            Verify your email address
          </Typography>
          <Typography
            className="mb-8 inline-block text-[14px] text-center font-[400] leading-[145%] text-[#115570]"
            level="h6"
          >
            To continue with the registration pls verify your email address
          </Typography>

          {/* logic and control for form signin is located here */}
          <EmailVerificationForm />
         
        </div>
      </ScrollArea>

    </div>
  );
}
