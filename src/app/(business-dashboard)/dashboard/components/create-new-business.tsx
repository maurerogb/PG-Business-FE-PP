import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Typography } from "components/ui/Typography";

export default function Dashboard() {
  return (
    <>
      <div className="flex w-[493px] flex-col items-start justify-center rounded-[6px] bg-[#fff] px-6 py-4">
        <Typography className="mb-[18px] text-[14px] font-[600] leading-normal text-[#555555]">
          What kind of business do you own
        </Typography>
        <RadioGroup className="gap-0" defaultValue="">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label
              htmlFor="option-one"
              className="text-[14px] font-[400] text-[#777777]"
            >
              Starter / individual business
            </Label>
          </div>
          <Typography className="mb-[20px] ml-[32px] mt-[8px] w-[429px] text-[12px] font-[400] leading-[145%] text-[#0C394B]">
            I`m testing my ideas with real customers, and preparing to register
            my company
          </Typography>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label
              className="text-[14px] font-[400] text-[#777777]"
              htmlFor="option-two"
            >
              Registered business
            </Label>
          </div>
          <Typography className="ml-[32px] mt-[8px] w-[429px] text-[12px] font-[400] leading-[145%] text-[#0C394B]">
            My business has the approval, documentation, and licences required
            to operate legally
          </Typography>
        </RadioGroup>
      </div>
      <div className="mt-[24px] flex flex-col items-center">
        <Button className="h-[48px] w-[388px] bg-[#23AAE1] text-[16px] font-[600] leading-[150%] text-[#fff]">
          Create account
        </Button>
        <Button className="mt-[20px] h-[48px] w-[388px] bg-transparent text-[16px] font-[600] leading-[150%] text-[#23AAE1] shadow-none hover:text-[#fff]">
          Cancel
        </Button>
      </div>
    </>
  );
}
