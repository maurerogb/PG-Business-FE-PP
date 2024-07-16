"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
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
import PasswordMustInclude from "./PasswordMustInclude";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../api/registration";
import ResetSuccessModal from "./components/reset-success-modal";

const ResetPasswordSchema = z
  .object({
    password: z
      .string().refine((value) => value.length >= 6 && value.length <= 40, {
        message: 'Password must be between 6 and 40 characters',
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'Password must contain at least one alphabet character',
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
    newPassword: z
      .string()
  })
  .refine((data) => data.password === data.newPassword, {
    path: ["newPassword"],
    message: "Password do not match",
  });

export default function ResetForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const forgotPasswordLink = searchParams?.get("forgotPasswordLink");
  const callbackUrl = searchParams?.get("callbackUrl") || "/get-started";
  const [isInputFocused, setInputFocused] = useState(false);
  const [isOpen, setOpen] = useState(0);

  const resetPasswordForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  type ruleDataType = {
    id: number;
    text: string;
    re: RegExp;
  }[];

  const ruleData: ruleDataType = [
    { re: /[A-Z]/, id: 2, text: "Upper Case" },
    { re: /[a-z]/, id: 4, text: "Lower Case" },
    { re: /[0-9]/, id: 3, text: "Numeric" },
    { re: /[!@#$%^&*]/, id: 1, text: "Special character" },
  ];

  const passwordResetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;
      setLoading(false)
      if (responseData?.statusCode === "2") {
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
        resetPasswordForm.reset();
        setOpen(1);
        // if (typeof window) {
        //   router.push(
        //     `/login`
        //   )
        // }
      }
    },

    onError: (e) => {
      console.log(e);
      setLoading(false)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setLoading(true)
    const requestValue = {
      emailAddress: email,
      newPassword: resetPasswordForm.getValues("password"),
      forgotPasswordLink: forgotPasswordLink
    }
    // console.log(requestValue)/
    passwordResetMutation.mutate(requestValue as any);
  }

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[24px] flex flex-col items-center"
      >
        <FormField
          control={resetPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  icon="show"
                  onFocus={handleInputFocus}
                  className="min-h-[48px]"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isInputFocused ? (
          <div className="w-full mt-[8px] flex flex-col items-start gap-2">
            <p className="text-[14px] font-[400] leading-[145%] text-[#777777]">
              Password must contain
            </p>
            <div className="flex flex-row flex-wrap items-center gap-3">
              {ruleData.map(({ id, text, re }) => {
                return (
                  <PasswordMustInclude
                    key={id}
                    text={text}
                    match={re.test(resetPasswordForm.watch("password"))}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        <FormField
          name="newPassword"
          control={resetPasswordForm.control}
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              <FormLabel className="text-[#777777]">Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  icon="show"
                  className="min-h-[48px]"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          {loading ? "Resetting..." : "Continue"}
        </Button>
        {isOpen ? <ResetSuccessModal /> : ""}
      </form>
    </Form>
  );
}
