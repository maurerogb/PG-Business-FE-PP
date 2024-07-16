import zod from 'zod';


export const businessInfoFormSchema = zod.object({


    merchantId: zod.number(),
    businessName: zod.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    primaryMobile: zod.string().min(1, {
      message: "feld required",
    }),
    supportContact: zod.string().min(1, {
      message: "feld required",
    }),
    businessState: zod.string(),
    businessCity: zod.string(),
    businessEmail: zod.string().email(),
    businessWebsite: zod.string(),
    businessCountry: zod.string(),
    businessAddress: zod.string(),
    businessLogoFile: zod.custom<File>() || zod.string(),
  
    businessCertificateFile: zod.custom<File>().optional() || zod.string().optional(),
    // businessCertificate: zod.string(),
  
    businessDescription: zod.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
  })