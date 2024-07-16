"use client";

import { ReactNode } from "react";
import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";

type toggleStateType = {
  createBusiness?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCreateBusiness?: ReactNode | any;
};

export default function Dashboard({
  createBusiness,
  setCreateBusiness,
}: toggleStateType) {
  return (
    <div className="flex h-[122px] w-[319px] flex-col items-start justify-center rounded-[7px] bg-[#fff] px-4">
      <RadioGroup className="gap-[25px]" defaultValue="">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            onClick={() => setCreateBusiness(0)}
            value="option-one"
            id="option-one"
          />
          <Label
            htmlFor="option-one"
            className={`text-[14px] font-[600] ${
              !createBusiness ? "text-[#115570]" : "text-[#777777]"
            }`}
          >
            Create new business
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            onClick={() => setCreateBusiness(1)}
            value="option-two"
            id="option-two"
          />
          <Label
            className={`text-[14px] font-[600] ${
              createBusiness ? "text-[#115570]" : "text-[#777777]"
            }`}
            htmlFor="option-two"
          >
            Add to the already existing account
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
