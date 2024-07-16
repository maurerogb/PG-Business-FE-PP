"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
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
import { useHydrateStore, useUserStore, useMerchantStore } from "store"
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "api/login";

const developerAuthFormSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
});

export default function DeveloperAuth({ setOpen, setKey }: any) {
    const userDetail = useHydrateStore(useUserStore, (state) => state.user); //getting merchant name from store
    // console.log(userDetail)
    const router = useRouter();
    const { toast } = useToast();

    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const { setCurrentMerchant, setMerchants } = useMerchantStore();

    const [loading, setLoading] = useState(false);

    const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
    const developerAuthForm = useForm<z.infer<typeof developerAuthFormSchema>>({
        resolver: zodResolver(developerAuthFormSchema),
        defaultValues: {
            password: "",
        },
    });

    const DeveloperAuthMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: async (data) => {
            const responseData: API.LoginResponse =
                (await data.json()) as API.LoginResponse;

            // console.log("LoginRes ", JSON.stringify(responseData));


            if (!responseData?.subject && !responseData?.token) {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: "",
                    //@ts-ig
                    description: `${responseData?.message}`,
                });
                setKey(false)
            } else if (responseData?.token && responseData?.token) {
                setLoading(false)

                toast({
                    variant: "default",
                    title: "Api keys unlocked",
                    description: "Authenticated Successfully",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                developerAuthForm.reset();
                setKey(true)
                setOpen(false)
            } else {
                setLoading(false)
                setKey(false)
                toast({
                    variant: "destructive",
                    title: "",
                    description: `${responseData?.message}`,
                });
            }
        },

        onError: (e) => {
            setLoading(false)
            setKey(false)
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    async function onSubmit(values: z.infer<typeof developerAuthFormSchema>) {
        setLoading(true)
        // console.log(values)
        const newValues = {
            username: userDetail?.emailAddress,
            password: values?.password
        }
        // console.log(newValues)
        DeveloperAuthMutation.mutate(newValues as any);
    }

    return (
        <div className="z-10 w-full h-full fixed top-0 left-0 flex flex-col items-center bg-[#19191ab4] pt-[10%]">

            <Form {...developerAuthForm}>
                <form
                    onSubmit={developerAuthForm.handleSubmit(onSubmit)}
                    className="w-[40%] rounded-lg bg-white pt-[20px] pb-[40px] flex flex-col items-center px-[30px] shadow-lg"
                >
                    <p
                        className="mb-4 text-[32px] text-[#1D8EBB] leading-[40px] font-bold inline-block bg-transparent text-center"
                    >
                        Authenticate to Access Keys
                    </p>

                    <FormField
                        control={developerAuthForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-[18px] w-full">
                                <FormLabel className="text-[#777777]">Enter password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="min-h-[48px]"
                                        placeholder="Password"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex flex-row items-center w-full gap-3 mt-8">
                        <Button
                            disabled={loading}
                            className="min-h-[48px] w-full hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                            type="submit"
                        >
                            Authenticate
                        </Button>
                        <Button
                            variant={"outline"}
                            className="min-h-[44px] w-full hover:bg-[#D92D20] hover:text-[white] hover:opacity-[0.4] text-[#344054] text-[14px] leading-normal font-[700]"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
