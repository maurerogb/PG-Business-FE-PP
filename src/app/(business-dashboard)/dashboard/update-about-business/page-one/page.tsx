import BusinessInfoForm from "app/(business-dashboard)/settings/business-profile/business-info-form";
import { BackButton } from "app/_components/back-button";
import { ScrollArea } from "components/ui/scroll-area";
import { Typography } from "components/ui/Typography";
import BusinessProfileUpdate from "./business-profile-form";

export default function SelectBusinessProfilePage() {
  return (
    <ScrollArea className="relative w-full h-full lg:w-3/5">
      <div className="flex flex-col px-10 py-10 bg-white">
        <div className="mb-7">
          <BackButton />
        </div>

        <div className="flex flex-col items-center mb-3 space-y-6">
          <Typography
            level="h3"
            className="font-CenturyGothic text-[40px] font-bold text-primary-70"
          >
            Tell us about your business
          </Typography>

          <div className="w-[490px] text-center font-CenturyGothic space-y-2">
            <Typography
              className="text-xl font-bold text-center font-CenturyGothic text-gray-50"
              level="p"
            >
              What type of business account do you own?
            </Typography>

            <Typography className="text-md font-normal text-gray-40" level="p">
              You have the option to include another business at a later time.
            </Typography>
          </div> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="86"
            height="25"
            viewBox="0 0 86 25"
            fill="none"
          >
            <circle
              cx="12.25"
              cy="12.083"
              r="11.5"
              fill="#23AAE1"
              stroke="#23AAE1"
            />
            <circle
              cx="73.75"
              cy="12"
              r="11.5"
              fill="#23AAE1"
              stroke="#23AAE1"
            />
            <line
              x1="24.25"
              y1="12.9219"
              x2="62.25"
              y2="12.9219"
              stroke="#23AAE1"
              stroke-width="3"
            />
          </svg>
        </div>

        <BusinessProfileUpdate/>
      </div>

      
    </ScrollArea>
  );
}
