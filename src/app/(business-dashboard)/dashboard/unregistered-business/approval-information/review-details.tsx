import React from "react";

import { Typography } from "components/ui/Typography"; 
import { Progress } from "components/ui/progress";

type Props = {
  persent: number
};

const ReviewDetails = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-full h-40 gap-6 p-10 border border-gray-300 rounded-lg bg-sky-100 bg-opacity-20">
      <div className="flex flex-col items-start justify-start h-20 gap-2">
        <Typography className="text-2xl font-semibold text-sky-400">
          Review Details!
        </Typography>
        <Typography className="text-base font-normal leading-normal text-gray-700 font-CenturyGothic">
          Please review all details inputed and confirm <br /> before
          submitting.{" "}
        </Typography>
      </div>

      <div className="flex items-center justify-center pt-1">
        <div className="inline-flex flex-col items-start self-stretch justify-start gap-2">
          <div className="inline-flex items-center justify-start w-80">
            <Typography className="text-base font-bold leading-normal text-gray-700 grow shrink basis-0">
              Individual Business
            </Typography>
            <div className="text-2xl font-semibold leading-normal text-sky-400">
              {props.persent.toFixed(2)}%
            </div>
           
          </div>
          <Progress className=" "  value={props.persent} />
          {/* <div className="inline-flex items-center justify-center h-1 bg-white w-80">
          
            <div className="h-1 w-80 bg-sky-400" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
