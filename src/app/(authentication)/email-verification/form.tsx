"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
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
import { activateAccount } from "../../../api/registration";
import { resendOTP } from "../../../api/registration";
import { useMutation } from "@tanstack/react-query";
import SuccessPopOver from "./component/success";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const ForgetPasswordSchema = z.object({
  otp: z.number().optional(),
});

export default function EmailVerificationForm() {
  const email = useSearchParams()?.get("email");
  const verificationLink = useSearchParams()?.get("verification-link");

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/get-started";
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [success, setSuccess] = useState(0);

  const [countdown, setCountdown] = useState(60);
  const [showResendLink, setShowResendLink] = useState(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setShowResendLink(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

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
    if (index < 5 && value) {
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
    if (pasteData.length === 6 && !isNaN(pasteData)) {
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
    mutationFn: activateAccount,
    onSuccess: async (data) => {
      // console.log(123);
      const responseData: API.VerifyAccountResponse =
        (await data.json()) as API.VerifyAccountResponse;
      setLoading(false)
      if (true) {
        setCountdown(60)
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
        setOtp(Array(6).fill(""));
        setSuccess(1);
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
  const resendMutation = useMutation({
    mutationFn: resendOTP,
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
        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });
      }
    },

    onError: (e) => {
      setLoading1(false)
      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    setLoading(true)
    console.log(otp.join(""));
    let userOTP = {
      emailAddress: email,
      otp: otp.join(""),
      verificationLink: verificationLink,
      otpSize: 6
    };
    OTPMutation.mutate(userOTP as any);
  };

  const handleResend = (event: any) => {
    event?.preventDefault();
    setLoading1(true)
    const value = {
      emailAddress: email,
      otpSize: 6
    };
    resendMutation.mutate(value as any);
  };

  async function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    // console.log(values);
    // try {
    //   setLoading(true)
    //   const res = await signIn("credentials", {
    //     redirect: false,
    //     email: values.email,
    //     callbackUrl,
    //   })
    //   setLoading(false)
    //   if (!res?.error) {
    //     router.push(callbackUrl)
    //   } else {
    //     toast({
    //       variant: "destructive",
    //       title: "invalid email or password",
    //       description: "Please confirm if user is registered",
    //     })
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   setLoading(false)
    //   toast({
    //     variant: "destructive",
    //     title: error,
    //     description: error,
    //   })
    // }
  }

  return (
    <Form {...otpForm}>
      <form
        // onSubmit={otpForm.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full bg-white rounded-lg"
      >
        <p className="text-[#666] w-full mb-6 text-[14px] text-center font-[400] leading-[22px]">
          A link has been sent to your email address{" "}
          <span className="text-[#CA6B1B] text-[14px] font-[700] leading-normal">
            {email}
          </span>{" "}
          please enter the code sent to your email.
        </p>

        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-full">
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
                      className="outline-[#D3EEF9] shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)] bg-[#FFFFFF] rounded-sm border border-[#46727033] border-solid h-12 w-12 text-center"
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
        {showResendLink ? (
          <p className="text-[#1A1A1A] mb-4 mt-6 text-[14px] text-center font-[400] leading-[145%]">
            Didn’t get the mail?{" "}
            <span className="text-[#1D8EBB] font-[700] leading-normal cursor-pointer" onClick={(event) => handleResend(event)}>
              {loading1 ? "resending..." : "Click here to resend."}
            </span>
          </p>
        ) : (
          <p className="text-[14px] mb-4 mt-6 font-[400] leading-[145%] text-[#000000]">
            Resend code in{' '}
            <span className="text-[14px] font-[700] leading-normal text-[#CA6B1B]">
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}sec
            </span>
          </p>
        )}
        {success ? <SuccessPopOver /> : ""}
      </form>
    </Form>
  );
}
