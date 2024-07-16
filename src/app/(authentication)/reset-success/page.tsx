import Image from "next/image";
import thumbs from "../../../assets/img/login/thumbs-up.png";
import { Button } from "components/ui/button";
import Link from "next/link";

export default function ResetSuccess() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full ">
      <div className="h-[544px] max-[842px]:w-full w-[842px] max-[842px]:rounded-none rounded-[13px] bg-[white] max-[842px]:shadow-none shadow gap-6 flex flex-col items-center justify-center">
        <Image className="" src={thumbs} alt={"thumbs-up"} />
        <div className="flex flex-col items-center gap-2">
          <p className="text-[32px] text-center font-[700] leading-[125%] text-[#1D8EBB]">
            Congratulation
          </p>
          <p className="text-[14px] text-center font-[400] leading-[145%] text-[#666]">
            You have successfully reset your password
          </p>
        </div>
        <Button
          // disabled={loading}
          className="w-[225px] min-h-[48px] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
          asChild
        >
          <Link href="/login" className="text-sm font-semibold text-primary-70">
            Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
