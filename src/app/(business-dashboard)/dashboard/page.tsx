import Image from "next/image";
import Link from "next/link";

import { Button } from "components/ui/button";
import { Typography } from "components/ui/Typography";
import handWithWallet from "assets/img/dashboard-hero/hand-with-wallet.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import Payment from "./components/payment";
import Balance from "./components/balance";
import CustomerName from "./components/customer-name";
import PaymentIssues from "./components/payment-issues";
import ReportOverview from "./components/report-overview";
import TransactionSuccessRate from "./components/transaction-success-rate";
import GetStarted from "./components/get-started";

export default function Dashboard() {
  // const merchantList = JSON.parse(localStorage.getItem("merchantList") as any) || null;
  return (
    <div className="pb-5 space-y-5">
      <div className="relative flex flex-col w-full h-full space-y-5">
        <Typography level="h3">Dashboard</Typography>
        <div className="flex flex-row justify-between w-full">
          <Balance />
          <div className="ml-auto">
            <Select>
              <SelectTrigger className="border-0 shadow-none outline-none w-28">
                <SelectValue
                  className="border-0 font-PlusJakartaSans text-[12px] font-medium leading-5 outline-none ring-0"
                  placeholder="This month"
                  defaultValue={"This month"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="7days"
                  >
                    This month
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="10days"
                  >
                    This year
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="30days"
                  >
                    Today
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="1month"
                  >
                    Custom
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="20"
                  >
                    This week
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="21"
                  >
                    Last week
                  </SelectItem>
                  <SelectItem
                    className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                    value="23"
                  >
                    All time
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div></div>
          <div></div>
        </div>

        <div className="flex justify-between py-1 rounded-2xl bg-gradient-to-r from-sky-200 to-cyan-700 px-7">
          <div className="flex flex-col items-start py-5 space-y-4">
            <CustomerName />
            <Typography className="text-primary-100">
              Activate your business to start receiving payment form <br /> your
              account.
            </Typography>

           <GetStarted />
          </div>

          <div className="pr-5">
            <Image
              src={handWithWallet}
              width={200}
              height={180}
              alt="hand-holding-wallet"
            />
          </div>
        </div>
      </div>

      {/* cardianal chart display and transaction success rate display */}
      <div className="flex flex-row space-x-5">
        <ReportOverview />
        <TransactionSuccessRate />
      </div>

      <div className="flex flex-row space-x-5">
        <Payment />
        <PaymentIssues />
      </div>
    </div>
  );
}
