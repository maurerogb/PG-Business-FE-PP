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
import { forgetPassword } from "../../../api/registration";
import { useMutation } from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const ForgetPasswordSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
});

export default function ForgetForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/get-started";
  const forgetForm = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;
      setLoading(false)
      console.log("responseData", responseData);

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });
      }

      if ((responseData?.statusCode === "00") || (responseData?.statusCode === "0")) {
        toast({
          variant: "default",
          title: "Success...",
          description: responseData?.message,
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });
        if (typeof window) {

          router.push(
            `/otp?email=${forgetForm.getValues("emailAddress")}&link=${responseData?.responseObject}`
          )

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

  async function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    setLoading(true)
    forgetPasswordMutation.mutate(values as any)

  }

  return (
    <Form {...forgetForm}>
      <form
        onSubmit={forgetForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[40px] flex flex-col items-center"
      >
        <FormField
          name="emailAddress"
          control={forgetForm.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777] ">Email Address</FormLabel>
              <FormControl>
                <Input
                  className="min-h-[48px]"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="mt-[42px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          {loading ? "Loading..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
