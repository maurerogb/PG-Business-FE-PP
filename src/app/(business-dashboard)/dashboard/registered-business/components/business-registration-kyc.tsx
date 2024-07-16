
"use client";

import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { LuCalendar } from "react-icons/lu";
import * as zod from "zod";

// import { updateMerchantBioData } from "api/registration";
import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Typography } from "components/ui/Typography";
import { useToast } from "components/ui/use-toast";
import { cn } from "lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHydrateStore, useMerchantStore } from "store";
import { upLoadKycDocuments } from "api/merchant-management";
import { useEffect } from "react";

const MAX_FILE_SIZE_BYTES = 1048576; // 1 megabyte

// @ts-ignore
const isFileWithinSizeLimit = (file) => file && file.size && file.size <= MAX_FILE_SIZE_BYTES;

const businessRegistrationKYCFormSchema = zod.object({
  governmentApprovedDocument: zod.custom<File>((value) => isFileWithinSizeLimit(value)),
  businessOwnersDocument: zod.custom<File>((value) => isFileWithinSizeLimit(value)),
  directorsProofOfIdentity: zod.custom<File>((value) => isFileWithinSizeLimit(value)),
  shareholdersDocument: zod.custom<File>((value) => isFileWithinSizeLimit(value)),
  // ... other fields
});


export default function BusinessRegistrationKYCForm(props: any) {
  const data = useHydrateStore(useMerchantStore, (state) => state.currentMerchantDetails)
  const personalInfoForm = useForm({
    resolver: zodResolver(businessRegistrationKYCFormSchema),
  })

  const { toast } = useToast();
  const { register, formState, setValue, watch, reset } = personalInfoForm;


  const showToast = () => {
    // toast({
    //   variant: "destructive",
    //   title: 'file size should be less than 1 mb',
    //   description: ''
    // });
    personalInfoForm.reset()
  };

  const watchedFiles = watch(['governmentApprovedDocument', 'businessOwnersDocument', 'directorsProofOfIdentity', 'shareholdersDocument']);

  useEffect(() => {
    // Check file sizes when they change
    watchedFiles.forEach((file, index) => {
      if (file && !isFileWithinSizeLimit(file)) {
        showToast(
           // @ts-expect-error
          Object.keys(personalInfoFormSchema.shape)[index], "File size exceeds the allowed limit.");
        // Optionally, you can clear the file input value
        setValue(Object.keys(businessRegistrationKYCFormSchema.shape)[index], null);
      }
    });
  }, [watchedFiles, setValue, businessRegistrationKYCFormSchema.shape]);
  let token = "";
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    token = localStorage.getItem("token") as string;
  }

  const merchantId = useHydrateStore(useMerchantStore, (state) => state.currentMerchant.id)


  const upLoadKycDocs = useMutation({
    mutationFn: (values: API.UpdateMerchantBusinessDataDTO) =>
      upLoadKycDocuments(values, token),
    onSuccess: async (data) => {
      const res: { statusCode: string; message: string } =
        (await data.json()) as {
          statusCode: string;
          message: string;
        };

      if (res.statusCode === "0") {


        props.nextStep && props.nextStep()

        toast({
          variant: "default",
          title: "",
          description: res?.message,
        })
      }
      if (res.statusCode === "403") {
        toast({
          variant: "destructive",
          title: res.statusCode,
          description: res.message,
        });
      }
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context });
    },
    onMutate: () => {
      return null;
    },
  });

  const { errors } = personalInfoForm.formState;
  console.log(errors, 'errors');

  const onSubmit = (values: zod.infer<typeof businessRegistrationKYCFormSchema>) => {
    console.log(values);

    const modData = { ...values, merchantId }
    upLoadKycDocs.mutate(modData as any);
  };

  return (

    <Form {...personalInfoForm}>
      <form
        id="personalInformation"
        onSubmit={
           // @ts-expect-error
          personalInfoForm.handleSubmit(onSubmit)}
        className="space-y-4 border-gray-10 w-full"
      >
        <p className=" text-red-600">File size should not be more than 1MB</p>
        <FormField
          name="governmentApprovedDocument"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Government approved Document</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                  <Input
                    type="file"
                    ref={field.ref}
                    name={field.name}
                    className="hidden"
                    onBlur={field.onBlur}
                    accept=".jpg, .jpeg, .png, .svg, .gif, .pdf"
                    placeholder="Please upload identification document"
                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                  />
              </FormControl>
              {
               // @ts-expect-error
              data?.governmentApprovedDocumentFileName &&
                    <p style={{fontSize:"13px"}}>Current uploaded file: {
                     // @ts-expect-error
                    data.governmentApprovedDocumentFileName}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="businessOwnersDocument"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>  Proof of Identity and Address for Directors of {data?.businessName}</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  accept=".jpg, .jpeg, .png, .svg, .gif, .pdf"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              {
               // @ts-expect-error
              data?.directorsProofOfIdentityFileName &&
                    <p style={{fontSize:"13px"}}>Current uploaded file: {
                     // @ts-expect-error
                    data.directorsProofOfIdentityFileName}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="shareholdersDocument"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Document showing business owners</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  accept=".jpg, .jpeg, .png, .svg, .gif, .pdf"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              {
               // @ts-expect-error
              data?.businessOwnersDocumentFileName &&
                    <p style={{fontSize:"13px"}}>Current uploaded file: {
                     // @ts-expect-error
                    data.businessOwnersDocumentFileName}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="directorsProofOfIdentity"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Proof of Identity and Address for Shareholders that own up to
                51% of {data?.businessName}</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  accept=".jpg, .jpeg, .png, .svg, .gif, .pdf"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              {
               // @ts-expect-error
              data?.shareholdersDocumentFileName &&
                    <p style={{fontSize:"13px"}}>Current uploaded file: {
                     // @ts-expect-error
                    data.shareholdersDocumentFileName}</p>}
              
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex items-center py-5 justify-center ">
          <Button
            // disabled={updateMerchantBioDataMutation.isLoading}
            className="h-[48px] w-[50%]"
            type="submit"
            size="default"
          >
            Save and Continue
          </Button>
        </div>

      </form>
      <DevTool control={personalInfoForm.control} />
    </Form>
  );
}
