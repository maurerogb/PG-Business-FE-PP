import { Button } from "components/ui/button";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export default function SuccessPopOver() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full ">
      <div className=" sm:shadow-md w-full sm:w-[420px] rounded-[8px] px-[50px] py-[40px] flex flex-col items-center">
        <p className="text-[#021921] mb-10 text-[26px] text-center font-[600] leading-[150.9%]">
          Successful
        </p>
        <div className="mb-6 rounded-full min-h-[109px] h-[109px] w-[109px] bg-[#F3F4F6] flex flex-row items-center justify-center">
          <LuCheck className="text-[55px] text-[#02B8A6]" />
        </div>
        <p className="text-[#354052] mb-10 text-[16px] text-center font-[400] leading-normal">
          Your email address has been successfully verified one more step and we
          are done
        </p>
        <Button
          // disabled={loading}
          className="text-[#FFFFFF] text-[16px] text-center font-[600] leading-[150%] min-h-[48px] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
          asChild
        >
          <Link href={"/"}>Proceed to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
