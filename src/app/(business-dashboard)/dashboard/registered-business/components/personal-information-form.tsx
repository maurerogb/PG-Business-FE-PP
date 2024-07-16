"use client"

import { useEffect } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format, parseISO } from "date-fns"
import { useForm } from "react-hook-form"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { LuCalendar } from "react-icons/lu"
import * as zod from "zod"

import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { useToast } from "components/ui/use-toast"
import { Typography } from "components/ui/Typography"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { cn } from "lib/utils"
import { useHydrateStore, useMerchantStore, useUserStore } from "store"
import { updateMerchantBioData } from "api/merchant-management"
import { numberFormat } from "utils/numberFormater"

type PersonalInfoFormProps = {
  prevStep?: () => void
  nextStep?: () => void
}

const personalInfoFormSchema = zod.object({
  emailAddress: zod.string().email(),
  firstName: zod.string(),
  merchantId: zod.number(),
  lastName: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  gender: zod.union([zod.literal("MALE"), zod.literal("FEMALE")]),
  dateOfBirth: zod.date({
    required_error: "A date of birth is required.",
  }),
  identificationNumber: zod.string(),
  identificationDocument: zod.union([
    zod.literal("DRIVERS_LICENCE"),
    zod.literal("NATIONAL_ID"),
    zod.literal("INTL_PASSPORT"),
    zod.literal("VOTERS_CARD"),
  ]),
  identificationDocumentPath: zod.custom<File>().optional() || zod.string().optional(),
})

export default function PersonalInformationForm(props: PersonalInfoFormProps) {
  let token = ""

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    token = localStorage.getItem("token") as string
  }

  const { toast } = useToast()
  const currentMerchant = useHydrateStore(useMerchantStore, (state) => state.currentMerchant)

  const userDetail = useHydrateStore(useUserStore, (state) => state.user)

  const personalInfoForm = useForm<zod.infer<typeof personalInfoFormSchema>>({
    defaultValues: userDetail as any,
    resolver: zodResolver(personalInfoFormSchema),
  })

  const updatePersonalInfoMutation = useMutation({
    mutationFn: (values: API.UpdateMerchantBioDataDTO) => updateMerchantBioData(values, token),
    onSuccess: async (data) => {
      const responseData: API.StatusReponse = (await data.json()) as API.StatusReponse

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      } else if (responseData?.statusCode === "0" && typeof window) {
        personalInfoForm.reset()

        props.nextStep && props.nextStep()

        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      }
    },

    onError: (e: any) => {
      toast({
        variant: "destructive",
        title: "",
        description: e,
      })
    },
  })

  const onSubmit = (values: zod.infer<typeof personalInfoFormSchema>) => {
    updatePersonalInfoMutation.mutate(values as any)
  }

  useEffect(() => {
    // console.log('userDetail',userDetail?.dateOfBirth == undefined ? Date(): parseISO(dateOfBirth));

    if (userDetail) {
      const { firstName, lastName, gender, emailAddress, identificationDocument, identificationNumber, identificationDocumentPath } =
        userDetail as API.UserDetails
      return personalInfoForm.reset({
        firstName,
        lastName,
        gender,
        emailAddress,
        identificationDocument,
        identificationNumber,
        identificationDocumentPath,
      } as any)
    }
  }, [userDetail])

  useEffect(() => {
    if (currentMerchant?.id) {
      personalInfoForm.setValue("merchantId", Number(currentMerchant?.id))
    }
  }, [currentMerchant?.id])

  return (

    <Form {...personalInfoForm}>

      <form id="personalInformation" onSubmit={personalInfoForm.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-8 border-gray-10">
        {/* merchant id field is hidden but it's value is sent to the api */}
        <FormField
          control={personalInfoForm.control}
          name="merchantId"
          defaultValue={currentMerchant?.id}
          render={({ field }) => (
            <FormItem className="hidden w-full">
              <FormLabel className="text-sm font-normal text-gray-50">Merchant ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  icon="show"
                  className="min-h-[48px]"
                  placeholder="Enter phone number"
                  {...field}
                  value={currentMerchant?.id}
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <FormField
            name="firstName"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field}  disabled={true}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} disabled={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="emailAddress"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter last name" {...field} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center gap-4">
          <FormField
            name="gender"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange as any} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={personalInfoForm.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="w-full ">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("flex flex-row items-center justify-start font-normal", !field?.value && "text-muted-foreground")}
                      >
                        <LuCalendar className="w-4 h-4 mr-2" />

                        {field?.value ? format(field?.value, "PPP") : <span>DD/MM/YY</span>}

                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      // captionLayout="dropdown-buttons"
                      // fromYear={1900}
                      // toYear={2023}
                      selected={field.value}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onSelect={field.onChange as any}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="identificationDocument"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Document</FormLabel>
              <Select onValueChange={field.onChange as any} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select identification document" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DRIVERS_LICENCE">Drivers lincenses</SelectItem>
                  <SelectItem value="NATIONAL_ID">National ID</SelectItem>
                  <SelectItem value="INTL_PASSPORT">International passport</SelectItem>
                  <SelectItem value="VOTERS_CARD">Voter&apos;`s card</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="identificationNumber"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#555555]">Identification Number</FormLabel>
              <FormControl>
                <Input {...field}  max="15" placeholder="Enter identification number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Please upload identification document.</FormDescription>
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
                  disabled={true}
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Attach Document <p className="text-[#f75a5a]">(size 1MB)</p></FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#af9c9c]" />
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
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={updatePersonalInfoMutation.isLoading}
          className="w-56 h-12 p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-sm font-bold mx-auto"
          type="submit"
          size="default"
        >
          Save
        </Button>
      </form>
      <DevTool control={personalInfoForm.control} />
    </Form>
  )
}
