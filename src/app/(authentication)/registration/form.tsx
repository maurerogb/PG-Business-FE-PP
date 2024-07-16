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
import { Checkbox } from "components/ui/checkbox";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "../../../api/registration";
// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const RegistrationSchema = z.object({
  firstName: z
    .string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Only alphabetic characters are allowed.',
    }),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Only alphabetic characters are allowed.',
  }),
  emailAddress: z.string().email(),
  businessName: z
    .string()
    .min(2, "business name must contain more than 2 characters"),
  password: z
    .string().refine((value) => value.length >= 8 && value.length <= 50, {
      message: 'Password must be between 8 and 50 characters',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => !/123/.test(value), {
      message: 'Password should not contain the sequence "123"',
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase character',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase character',
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
  comfirmPassword: z.string(),
  agreement: z.boolean(),
}).refine((data) => data.password === data.comfirmPassword, { message: 'Password do not match', path: ["comfirmPassword"] });

export default function RegistrationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/get-started";
  const [isInputFocused, setInputFocused] = useState(false);

  const registrationForm = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      password: "",
      agreement: undefined,
    },
  });
  const { formState } = useForm();
  const { isValid } = formState;

  const userRegMutation = useMutation({
    mutationFn: createNewUser,
    onSuccess: async (data) => {
      const responseData: API.CreateAccountResponse =
        (await data.json()) as API.CreateAccountResponse;
      setLoading(false)
      if ((responseData?.statusCode === "701") || (responseData?.statusCode === "1")) {
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
        if (typeof window) {

          var linkArr: any = responseData?.responseObject?.split("/");

          console.log(linkArr[3]);

          router.push(
            `/${linkArr[3]}`,
          );
        }

        registrationForm.reset();
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

  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setLoading(true)
    userRegMutation.mutate(values);
  }

  return (
    <Form {...registrationForm}>
      <form
        onSubmit={registrationForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[50px] space-y-6 flex flex-col items-center"
      >
        {/* <FormMessage> */}
        <div className="flex flex-row items-center w-fit h-fit">
          <div className="w-6 h-6 rounded-full bg-[#23AAE1]"></div>
          <div className={`h-[3px] w-[38px] bg-[#1D8EBB]`}></div>
          <div className={`w-6 h-6 rounded-full bg-[#D9D9D9]`}></div>
        </div>
        {/* </FormMessage> */}

        <FormField
          control={registrationForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="Enter first name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="Enter last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registrationForm.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="min-h-[48px]"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="businessName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Business name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="eg oil&gas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
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

        <FormField
          control={registrationForm.control}
          name="comfirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  icon="show"
                  className="min-h-[48px]"
                  placeholder="confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex flex-row items-start gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange as () => void}
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[14px] font-[400] leading-[145%] text-[#555]"
                  >
                    {`I consent to the collection and processing of my personal data in line with data regulations as described in `}
                    <Link
                      className="text-[#48B8E6] text-[16px] font-[600] underline"
                      href="/"
                    >
                      Pay Access Policy
                    </Link>
                  </label>
                </div>
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
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
