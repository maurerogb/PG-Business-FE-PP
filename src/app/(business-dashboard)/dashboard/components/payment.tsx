import React from "react";
// import { LuChevronDown } from "react-icons/lu"

import { Progress } from "components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Typography } from "components/ui/Typography";

import CardContainer from "./card-container";

const paymentList = [
  { name: "Successful", amount: "80.10", progress: 80 },
  { name: "Uncaptured", amount: "30.10", progress: 30 },
  { name: "Refund", amount: "90.10", progress: 20 },
  { name: "Failed", amount: "10.10", progress: 50 },
];

export default function Payment() {
  return (
    <CardContainer className="space-y-10 basis-6/12">
      <div className="flex flex-row justify-between w-full">
        <Typography level="CT" className="text-gray-900">
          Payment
        </Typography>

        <Select>
          <SelectTrigger className="border-0 shadow-none outline-none w-28">
            <SelectValue
              className="border-0 font-PlusJakartaSans text-[12px] font-medium leading-5 outline-none ring-0"
              placeholder="7 days"
              defaultValue={"7days"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem
                className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                value="7days"
              >
                7 days
              </SelectItem>
              <SelectItem
                className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                value="10days"
              >
                10 days
              </SelectItem>
              <SelectItem
                className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                value="30days"
              >
                30 days
              </SelectItem>
              <SelectItem
                className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                value="1month"
              >
                50 days
              </SelectItem>
              <SelectItem
                className="font-PlusJakartaSans text-[12px] font-medium leading-5"
                value="2"
              >
                100 days
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-6">
        {paymentList.map(({ name, amount, progress }) => {
          return (
            <React.Fragment key={name}>
              <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-row justify-between">
                  <span className="font-PlusJakartaSans text-[13px] font-medium leading-5 text-gray-900">
                    {name}
                  </span>
                  <span className="font-PlusJakartaSans text-[13px] font-medium leading-5 text-gray-900">
                    N {amount}
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </CardContainer>
  );
}
