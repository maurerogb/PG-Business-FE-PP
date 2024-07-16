import Image from "next/image";
import Link from "next/link";
import sideBg from "../../../assets/img/login/login-bg.png";
import Logo from "../../../assets/img/payaccess-logo.png";
import { Typography } from "components/ui/Typography";
// import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import { TbLockAccess } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import EmailVerificationForm from "./form";

export default function VerifyModal({ email, setVerifyModal, orderRef, merchantCode }: any) {
    return (
        <div className="bg-[#323536a4] w-full h-full flex flex-col items-center pt-[100px] fixed z-[60] top-0 left-0">
            <div className="bg-white rounded-[7px] flex flex-col w-[50%]  items-center p-[60px] relative">
                <AiOutlineClose onClick={() => setVerifyModal(false)} className="cursor-pointer text-[25px] text-[black] absolute top-[50px] right-[50px]" />
                <div className="mb-6 rounded-full h-[92px] w-[92px] bg-[#EDFAFF] flex flex-row items-center justify-center">
                    <TbLockAccess className="text-[55px] text-[#177196]" />
                </div>
                <Typography
                    className="text-center mb-4 text-[32px] leading-[40px] font-black inline-block bg-transparent"
                    level="h1"
                >
                    Authorize Payment
                </Typography>
                {/* <Typography
                    className="mb-8 inline-block text-[14px] text-center font-[400] leading-[145%] text-[#115570]"
                    level="h6"
                >
                    To continue with the registration pls verify your email address
                </Typography> */}

                {/* logic and control for form signin is located here */}
                <EmailVerificationForm email={email} setVerifyModal={setVerifyModal} orderRef={orderRef} merchantCode={merchantCode} />

            </div>
        </div>

    )
}
