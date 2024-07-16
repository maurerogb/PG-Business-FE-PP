// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import * as zod from "zod";

// import { updateMerchantBusinessData } from "api/merchant-management";
// import { Button } from "components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "components/ui/form";
// import { Input } from "components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "components/ui/select";
// import { Textarea } from "components/ui/textarea";
// import { countryList } from "utils/countrylist";
// import { useHydrateStore, useMerchantStore } from "store";
// import { HiOutlineCloudUpload } from "react-icons/hi";
// import { Typography } from "components/ui/Typography";
// import { useToast } from "components/ui/use-toast";
// import { useEffect } from "react";
// import { numberFormat } from "utils/numberFormater";

// const businessInfoFormSchema = zod.object({
//   // merchantId: zod.number(),
//   businessName: zod.string().min(2, {
//     message: "First name must be at least 2 characters.",
//   }),
//   primaryMobile: zod.string(),
//   supportContact: zod.string(),
//   businessCountry: zod.string(),
//   businessState: zod.string(),
//   businessCity: zod.string(),
//   businessEmail: zod.string().email(),
//   businessWebsite: zod.string().optional(),
//   businessLogo: zod.custom<File>(),
//   // businessLogo: zod.string(),
//   businessCertificate: zod.custom<File>(),
//   businessDescription: zod.string().min(2, {
//     message: "Last name must be at least 2 characters.",
//   }),
//   businessAddress: zod.string().min(2, {
//     message: "Last name must be at least 2 characters.",
//   }),
// });

// export default function BusinessInformationForm(props: any) {
//   const data = useHydrateStore(useMerchantStore, (state) => state.currentMerchantDetails)

//   console.log(data)

//   const { toast } = useToast();


//   let token = "";
//   const businessInfoForm = useForm<zod.infer<typeof businessInfoFormSchema>>({
//     defaultValues: {},
//     resolver: zodResolver(businessInfoFormSchema),
//   });
//   const merchantId = useHydrateStore(useMerchantStore, (state) => state.currentMerchant.id)


//   if (
//     typeof window !== "undefined" &&
//     typeof window.localStorage !== "undefined"
//   ) {
//     token = localStorage.getItem("token") as string;
//   }

//   useEffect(() => {
//     if (data) {
//       const fieldsToUpdate = {
//         businessName: data.businessName,
//         primaryMobile: data.primaryMobile,
//         supportContact: data.supportContact,
//         // @ts-expect-error
//         businessCountry: data.businessCountry,
//         businessState: data.businessState,
//         businessCity: data.businessCity,
//         businessEmail: data.businessEmail,
//         businessWebsite: data.businessWebsite,
//         // businessLogo: data.businessLogo,
//         // businessCertificate: data.businessCertificateFile,
//         businessDescription: data.businessDescription,
//         // @ts-expect-error
//         businessAddress: data.businessAddress,
//         // Add more fields as needed
//       };
//       Object.entries(fieldsToUpdate).forEach(([fieldName, value]) => {
//         // @ts-expect-error
//         businessInfoForm.setValue(fieldName, value);
//       });
//     }
//   }, [data, businessInfoForm]);

//   const updateMerchantBusinessDataMutation = useMutation({
//     mutationFn: updateMerchantBusinessData as any,
//     onSuccess: async (data: any) => {
//       const res: { statusCode: string; message: string } =
//         (await data.json()) as {
//           statusCode: string;
//           message: string;
//         };
//       console.log(res, 're');
//       if (res.statusCode === "0") {
//         props.nextStep && props.nextStep()
//         toast({
//           variant: "default",
//           title: "",
//           description: res?.message,
//         })
//       }
//       if (res.statusCode === "403") {
//         toast({
//           variant: "destructive",
//           title: res.statusCode,
//           description: res.message,
//         });
//       }
//     },

//     onError: (e: any) => {
//       console.log(e)
//       toast({
//         variant: "destructive",
//         title: `${e}`,
//         description: "error",
//       })
//     },
//   });

//   const onSubmit = (values: zod.infer<typeof businessInfoFormSchema>) => {
//     // const emailAddress = localStorage.getItem("emailAddress") as string
//     // const emailAddress = "user.user@gmail.com";
//     console.log(values);

//     // const updatedValue = { emailAddress, merchantId, ...values, token };
//     const updatedValue = { merchantId, ...values, token };
//     // console.log(updatedValue);
//     updateMerchantBusinessDataMutation.mutate(updatedValue as any);
//   };



//   return (
//     <Form {...businessInfoForm} >
//       <form
//         onSubmit={businessInfoForm.handleSubmit(onSubmit)}
//         className="space-y-4  relative border-gray-10 w-full"
//       >
//         <FormField
//           name="businessName"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Business name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter business name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={businessInfoForm.control}
//           name="businessDescription"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Business Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us a little bit about yourself"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="businessEmail"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Business email</FormLabel>
//               <FormControl>
//                 <Input disabled={true} placeholder="Enter business email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex flex-row items-center gap-4">
//           <FormField
//             name="primaryMobile"
//             control={businessInfoForm.control}
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Business mobile number</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter businesss mobile number"
//                     {...field}
//                     max={13}
//                     onInput={(event) => numberFormat(event)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="supportContact"
//             control={businessInfoForm.control}
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Support</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter support number/email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex flex-row items-center gap-4">
//           <FormField
//             name="businessCountry"
//             control={businessInfoForm.control}
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Country</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Country" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent className="w-full">
//                     <SelectItem value="NIGERIA">NIGERIA</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="businessState"
//             control={businessInfoForm.control}
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>State</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select state" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent className="w-full">
//                     <SelectItem value="ABUJA">Abuja</SelectItem>
//                     <SelectItem value="LAGOS">Lagos</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           name="businessCity"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter city" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={businessInfoForm.control}
//           name="businessAddress"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Business Address</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="The address of business"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="businessWebsite"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Business website</FormLabel>
//               <FormControl>
//                 <Input placeholder="Business website" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="businessCertificate"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem>
//               <FormDescription>Business Certificate</FormDescription>
//               <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
//                 <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
//                 <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
//                   {field.value?.name ? (
//                     field.value?.name
//                   ) : typeof field.value === "string" ? (
//                     (field.value as any)
//                   ) : (
//                     <>
//                       Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
//                     </>
//                   )}
//                 </Typography>
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   ref={field.ref}
//                   name={field.name}
//                   className="hidden"
//                   onBlur={field.onBlur}
//                   accept=".jpg, .jpeg, .png, .svg, .gif"
//                   placeholder="Please upload identification document"
//                   onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
//                 />
//               </FormControl>
//               {
//                 // @ts-expect-error
//                 data?.businessCertificateFile &&
//                 <p style={{ fontSize: "13px" }}>Current certificate uploaded: {
//                   // @ts-expect-error
//                   data.businessCertificateFile}</p>}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="businessLogo"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem>
//               <FormDescription>Business logo (optional)</FormDescription>
//               <FormControl>
//                 <Input
//                   type="file"
//                   placeholder="Drag file here to upload document or choose file"
//                   // {...field}
//                   accept=".jpg, .jpeg, .png, .svg, .gif"
//                   onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
//                 />
//               </FormControl>
//               {data?.businessLogo &&
//                 <p style={{ fontSize: "13px" }}>Current logo uploaded: {data.businessLogo}</p>}
//               <FormMessage />
//             </FormItem>
//           )}
//         />


//         {/* <FormField
//           name="businessCertificate"
//           control={businessInfoForm.control}
//           render={({ field }) => (
//             <FormItem>
//               <FormDescription>Business logo (optional)</FormDescription>
//               <FormControl>
//                 <Input
//                   placeholder="Drag file here to upload document or choose file"
//                   {...field}
//                   type="file"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}
    

//         <div className="flex items-center  justify-center my-20">
//           <Button
//             // disabled={updateMerchantBioDataMutation.isLoading}
//             className="h-[48px] w-[50%]"
//             type="submit"
//             size="default"
//           >
//             Save and Continue
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
