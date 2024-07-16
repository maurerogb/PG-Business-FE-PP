"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { OTP } from "api/registration";
import { forgetPassword } from "api/registration";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const ForgetPasswordSchema = z.object({
  otp: z.number(),
});

export default function OTPForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const forgotPasswordLink = searchParams?.get("link");
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [countdownTime, setCountdownTime] = useState(300); // 5 minutes in seconds
  const [countdownActive, setCountdownActive] = useState(true);


  useEffect(() => {
    if (countdownActive) {
      const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
          setCountdownTime(countdownTime - 1);
        } else {
          setCountdownActive(false);
        }
      }, 1000); // Update every second

      return () => clearInterval(countdownInterval);
    }
  }, [countdownTime, countdownActive]);

  const handleChange = (index: any, event: any) => {
    const value = event.target.value;
    if (isNaN(value)) {
      // Only allow numbers
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to the next input field
    if (index < 3 && value) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    // field.onChange
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    if (pasteData.length === 4 && !isNaN(pasteData)) {
      setOtp(pasteData.split(""));
    }
  };

  const otpForm = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      otp: undefined,
    },
  });

  const OTPMutation = useMutation({
    mutationFn: OTP,
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;
      setLoading(false)
      if ((responseData?.statusCode === "1") || (responseData?.statusCode === "701")) {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });
      }

      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });
        setOtp(Array(4).fill(""));
        if (typeof window) {
          router.push(`/reset-password?email=${email}&forgotPasswordLink=${forgotPasswordLink}`);
        }
      }
    },

    onError: (e) => {
      setLoading(false)
      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });


  //--------------------------Resend password mutation-------------------------------


  const resendPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;
      setLoading1(false)
      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });

      }

      if (responseData?.statusCode === "0") {
        setCountdownTime(300)
        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });
        if (typeof window) {

          router.push(
            `/otp?email=${email}&link=${responseData?.responseObject}`
          )

        }
      }
    },

    onError: (e) => {
      console.log(e);
      setLoading1(false)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  //--------------------------Resend password mutation ends-------------------------------



  // async function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
  //   console.log(values);

  // }
  const handleResend = (event: any) => {
    event?.preventDefault();
    setLoading1(true)
    let value = {
      emailAddress: email
    }
    resendPasswordMutation.mutate(value as any)
  }

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    setLoading(true)
    let OTP = {
      emailAddress: email,
      otp: otp.join(""),
      forgotPasswordLink: forgotPasswordLink
    };
    // console.log(OTP)
    OTPMutation.mutate(OTP as any);
  };

  return (
    <Form {...otpForm}>
      <form
        // onSubmit={otpForm.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center rounded-lg bg-white"
      >
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-full">
              <FormLabel className="mb-4 text-center text-[14px] font-[700] leading-normal text-[#0C394B]">
                Enter OTP code
              </FormLabel>
              <FormControl>
                {/* <Input className="min-h-[48px]" placeholder="Enter your email address" {...field} /> */}
                <div className="flex flex-row items-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(event) => handleChange(index, event)}
                      onPaste={(event) => handlePaste(event)}
                      className="bg-[#FFFFFF] border text-center border-[#D3EEF9] border-solid h-12 w-12"
                    // {...field}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          // type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          {loading ? "Verifying..." : "Continue"}
        </Button>
        <p className="text-[#1A1A1A] mt-6 text-[14px] text-center font-[400] leading-[145%]">
          Didn’t get the mail?{" "}
          <span
            className="text-[#1D8EBB] font-[700] leading-normal cursor-pointer"
            onClick={(event) => handleResend(event)}
          >
            {loading1 ? "resending..." : "click here to resend."}
          </span>
        </p>
        <p className="text-[14px] font-[400] leading-[145%] text-[#000000] mt-[24px]">
          Resend code in{" "}
          <span className="text-[14px] font-[700] leading-normal text-[#CA6B1B]">
            {`${Math.floor(countdownTime / 60)}:${countdownTime % 60}`}
          </span>
        </p>
      </form>
    </Form>
  );
}
