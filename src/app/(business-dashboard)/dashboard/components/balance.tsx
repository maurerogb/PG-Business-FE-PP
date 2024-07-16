"use client";

import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Typography } from "components/ui/Typography";

type Props = {};

export default function Balance({}: Props) {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Typography className="text-base font-bold text-gray-600 font-CenturyGothic">
          Total Balance
        </Typography>

        {showBalance ? (
          <AiOutlineEyeInvisible
            className="w-6 h-6 text-gray-600"
            onClick={toggleBalance}
          />
        ) : (
          <AiOutlineEye
            className="w-6 h-6 text-gray-600 "
            onClick={toggleBalance}
          />
        )}
      </div>

      {showBalance ? (
        <Typography className="text-4xl text-gray-600 first-letter:line-through fontbold font-CenturyGothic">
          N 0.000
        </Typography>
      ) : (
        <Typography className="text-4xl text-gray-600 first-letter:line-through fontbold font-CenturyGothic">
          ********
        </Typography>
      )}
    </div>
  );
}
