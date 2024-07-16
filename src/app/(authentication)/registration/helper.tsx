// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useMutation } from "@tanstack/react-query"
// // import type { Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import * as zod from "zod"

// // import { Button } from "components/ui/Button/Button"
// import { createMerchant } from "api/registration"
// import { Button } from "components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
// import { Input } from "components/ui/input"
// import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
// import { Typography } from "components/ui/Typography"
// import { useToast } from "components/ui/use-toast"

// import { logoPath } from "lib/constants"

// // export const metadata: Metadata = {
// //   title: "Business",
// //   description: "Business page as it should be",
// // }

// const merchantRegFormSchema = zod.object({
//     country: zod.string(),
//     firstName: zod.string().min(2, {
//         message: "First name must be at least 2 characters.",
//     }),
//     lastName: zod.string().min(2, {
//         message: "Last name must be at least 2 characters.",
//     }),

//     emailAddress: zod.string().email({ message: "Invalid email address" }),
//     password: zod.string().min(2, {
//         message: "",
//     }),
//     businessName: zod.string(),
//     businessType: zod.string(),
//     businessCategory: zod.string(),
//     isSoftwareDeveloper: zod.string(),
// })

// export default function RegistrationPage() {
//     const { toast } = useToast()
//     const router = useRouter()
//     const merchantRegForm = useForm<zod.infer<typeof merchantRegFormSchema>>({
//         defaultValues: {},
//         resolver: zodResolver(merchantRegFormSchema),
//     })

//     const merchantRegMutation = useMutation({
//         mutationFn: createMerchant,
//         onSuccess: async (data) => {
//             const responseData: API.StatusReponse = (await data.json()) as API.StatusReponse

//             if (responseData?.statusCode === "1") {
//                 toast({ variant: "destructive", title: "", description: responseData?.message })
//             }

//             if (responseData?.statusCode === "0") {
//                 toast({ variant: "default", title: "", description: responseData?.message })
//                 if (typeof window) {
//                     router.push(
//                         `/email-verification?email=${merchantRegForm.getValues("emailAddress")}&activationToken=${responseData?.responseObject
//                         }`
//                     )
//                 }

//                 merchantRegForm.reset()
//             }
//         },

//         onError: () => {
//             return null
//         },
//     })

//     function onSubmit(values: zod.infer<typeof merchantRegFormSchema>) {
//         merchantRegMutation.mutate(values)
//     }

//     return (
//         <main className="flex flex-col items-center justify-center bg-transparent">
//             <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent py-8">
//                 <Image className="mb-8" src={logoPath.src} width={130} height={60} alt={logoPath.alt} />
//                 <Typography className="mb-4  inline-block bg-transparent" level="h1">
//                     Create your Pay Access account
//                 </Typography>
//                 <Typography className="mb-12 inline-block" level="h6">
//                     Create an account with pay access for all your payment trasactions
//                 </Typography>

//                 <Form {...merchantRegForm}>
//                     <form
//                         onSubmit={merchantRegForm.handleSubmit(onSubmit)}
//                         className="space-y-8 rounded-[10px] border-gray-10 bg-white p-8 shadow-form"
//                     >
//                         <FormField
//                             name="country"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Business category</FormLabel>
//                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select Country" />
//                                             </SelectTrigger>
//                                         </FormControl>

//                                         <SelectContent>
//                                             <SelectItem value="AFGHANISTAN">Afghanistan</SelectItem>
//                                             <SelectItem value="BELARUS">Belarus</SelectItem>
//                                             <SelectItem value="SPAIN">Spain</SelectItem>
//                                             <SelectItem value="NIGERIA">Nigeria</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="firstName"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>First name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter first anme" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="lastName"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Last name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter last name" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="emailAddress"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email address</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter email address" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="password"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter password" {...field} type="password" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="businessName"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Business name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="eg oil & gas" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="businessCategory"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Business category</FormLabel>
//                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select business category" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="businessType"
//                             control={merchantRegForm.control}
//                             render={({ field }) => (
//                                 <FormItem className="space-y-3">
//                                     <FormLabel className="font-semibold text-gray-50">What kind of business do you own</FormLabel>
//                                     <FormControl>
//                                         <RadioGroup
//                                             onValueChange={field.onChange}
//                                             defaultValue={field.value}
//                                             className="flex flex-col space-y-1"
//                                         >
//                                             <FormItem className="flex items-baseline space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="INDIVIDUAL" />
//                                                 </FormControl>
//                                                 <div>
//                                                     <FormLabel className="font-normal">Starter/individaul business</FormLabel>
//                                                     <FormDescription>
//                                                         I am testing my ideas with real customers, and preparing to register my company
//                                                     </FormDescription>
//                                                 </div>
//                                             </FormItem>

//                                             <FormItem className="flex items-baseline space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="BUSINESS" />
//                                                 </FormControl>
//                                                 <div>
//                                                     <FormLabel className="font-normal">Registered business</FormLabel>
//                                                     <FormDescription>
//                                                         My business has the approval, documentation, and licences required to operate legally
//                                                     </FormDescription>
//                                                 </div>
//                                             </FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={merchantRegForm.control}
//                             name="isSoftwareDeveloper"
//                             render={({ field }) => (
//                                 <FormItem className="space-y-3">
//                                     <FormLabel>Are you a software developer</FormLabel>
//                                     <FormControl>
//                                         <RadioGroup
//                                             onValueChange={field.onChange}
//                                             defaultValue={field.value}
//                                             className="flex flex-row space-x-6"
//                                         >
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="1" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">Yes i am</FormLabel>
//                                             </FormItem>

//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="0" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">No I am not</FormLabel>
//                                             </FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button disabled={merchantRegMutation.isLoading} className="w-full" type="submit" size="default">
//                             Submit
//                         </Button>

//                         <div className="flex flex-col items-center space-y-2">
//                             <div className="text-sm font-normal text-primary-100">
//                                 By clicking the &quot;Create your account&quot; button, you agree to Pay access
//                             </div>
//                             <Link href="/" className="text-sm font-semibold text-primary-70">
//                                 TERMS & CONDITIONS
//                             </Link>
//                         </div>
//                     </form>
//                 </Form>
//             </div>
//         </main>
//     )
// }
