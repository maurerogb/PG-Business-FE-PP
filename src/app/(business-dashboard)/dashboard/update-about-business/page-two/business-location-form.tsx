"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import type { Metadata } from "next"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";

// import { Button } from "components/ui/Button/Button"
import { updateMerchantLocation } from "api/merchant-management";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import { useToast } from "components/ui/use-toast";
import { useHydrateStore, useMerchantStore } from "store";

import { logoPath } from "lib/constants";
import { countryList } from "utils/countrylist";

// export const metadata: Metadata = {
//   title: "Business",
//   description: "Business page as it should be",
// }

const locationRegFormSchema = zod.object({
  country: zod.string(),
  merchantId: zod.number()
});

const prefill: any = []

export default function RegistrationPage() {
  let token = "";
  const router = useRouter();
  const { toast } = useToast();
  const currentMerchant = useHydrateStore(
    useMerchantStore,
    (state) => state.currentMerchant,
  );

  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    token = localStorage.getItem("token") as string;
  }

  const locationRegForm = useForm<zod.infer<typeof locationRegFormSchema>>({
    defaultValues: { merchantId: 0, country: "" },
    resolver: zodResolver(locationRegFormSchema),
  });

  const locationRegMutation = useMutation({
    mutationFn: (values: API.UpdateLocationDTO) =>
      updateMerchantLocation(values, token),
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });
      } else if (responseData?.statusCode === "0" && typeof window) {
        locationRegForm.reset();
        router.push("/dashboard/update-about-business/page-three");

        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });
      }
    },

    onError: (e: any) => {
      toast({
        variant: "destructive",
        title: "",
        description: e.error as string,
      });
    },
  });

  function onSubmit(values: zod.infer<typeof locationRegFormSchema>) {
    locationRegMutation.mutate(values);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent ">
        <Form {...locationRegForm}>
          <form
            onSubmit={locationRegForm.handleSubmit(onSubmit)}
            className="w-full space-y-12"
          >
            <div className="px-6 space-y-8">
              <FormField
                name="country"
                control={locationRegForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-50">
                      Country
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        locationRegForm.setValue(
                          "merchantId",
                          currentMerchant?.id as number,
                          { shouldDirty: true },
                        );
                      }}
                    >
                      <FormControl className="px-3 py-3 mt-20 shadow-none border-gray-20">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countryList.map(country => <SelectItem key={country} className="py-3 " value={country}>
                          {country}
                        </SelectItem>)}

                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* <div className="flex flex-row items-center w-full gap-[10px] mt-6">
              
                     <FormField
                        control={locationRegForm.control}
                        name="phoneNo"
                        render={({ field }) => (
                            <FormItem className="w-full "> 
                                <FormLabel className="text-sm font-normal text-gray-50">
                      Phone Number
                    </FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        pattern="[0-9]*"
                                        maxLength={11}
                                        title="Input is only number"
                                        className="border-[#D6D6D6] rounded-[10px] min-h-[56px] shadow-none bg-white w-full p-2 "
                                        placeholder="08123456789"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
</div> */}
              <FormField
                control={locationRegForm.control}
                name="merchantId"
                defaultValue={currentMerchant?.id}
                render={({ field }) => (
                  <FormItem className="hidden w-full">
                    <FormLabel className="text-sm font-normal text-gray-50">
                      Merchant ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        icon="show"
                        className="min-h-[48px]"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={locationRegMutation.isLoading}
              className="flex self-center w-56 mx-auto font-bold"
              type="submit"
              size="lg"
            >
              Proceed
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
