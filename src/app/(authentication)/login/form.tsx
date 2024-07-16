"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState, useTransition } from "react";
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
import { loginApi } from "api/login";
import { useMerchantStore } from "store";
import { FromError } from "components/form-error";
import { FormSuccess } from "components/form-success";

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});




export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { setCurrentMerchant, setMerchants } = useMerchantStore();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

    function  hiheNotification(){
      setError(''); setSuccess('')
    }

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const responseData: API.LoginResponse =
        (await data.json()) as API.LoginResponse;
 
      setLoading(false)

      if (!responseData?.subject && !responseData?.token) {
       
        setError(responseData?.responseObject )
      
      } else if (responseData?.token && responseData?.token) {
        
        localStorage.setItem("subject", responseData?.subject as string);
        localStorage.setItem(
          "merchantList",
          JSON.stringify(responseData?.merchantList),
        );
        localStorage.setItem("token", responseData?.token as string);

        if (typeof window) {
          router.push(`/dashboard`);
          setMerchants(responseData?.merchantList as API.MerchantList);
          setCurrentMerchant(responseData.merchantList?.[0] as API.Merchant);
        }
        setSuccess(responseData?.message)
        loginForm.reset();
      } else {
        setLoading(false)
        setError(responseData?.message)
        // toast({
        //   variant: "destructive",
        //   title: "",
        //   description: `${responseData?.message}`,
        // });
      }
    },

    onError: (e) => {
      setLoading(false)
     setError("Your request could not be processed at the moment. Please try again later.");
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true)
    setError("");
    setSuccess("");
    loginMutation.mutate(values);
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[40px] flex flex-col items-center"
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777] ">Email</FormLabel>

              <FormControl>
                <Input
                  className="min-h-[48px]"
                  placeholder="Enter your email"
                  {...field}  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-[25px] w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
              <FormControl>
                <Input onFocus={hiheNotification}
                  className="min-h-[48px]"
                  placeholder="Password"
                  {...field}  disabled={loading}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FromError message={error} />
        
        <FormSuccess message={success} />
        <Button
          disabled={loading}
          className="mt-[20px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
