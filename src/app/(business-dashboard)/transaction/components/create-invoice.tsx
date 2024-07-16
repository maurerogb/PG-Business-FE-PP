"use client";

import { LuFolder } from "react-icons/lu";
import { Button } from "components/ui/button";
import { Typography } from "components/ui/Typography";

const CreateInvoice = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center justify-center h-28 w-28 bg-sky-200 bg-opacity-20 rounded-xl">
        <LuFolder className="w-16 h-16 text-primary-60" />
      </div>
      <Typography
        level={"p"}
        className="w-96 text-center text-teal-950 text-base font-normal font-['Century Gothic'] leading-tight"
      >
        You have no transactions in the last few days, but you can change that.
      </Typography>
      <Typography
        level={"p"}
        className="text-neutral-600 text-sm font-normal font-['Century Gothic'] leading-tight"
      >
        create a payment link or send them invoices.
      </Typography>
    </div>
  );
};

export default CreateInvoice;
