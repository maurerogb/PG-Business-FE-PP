declare namespace API {
  type UpdateAboutBusinessDTO = {
    businessCategory: string;
    businessType: string;
    softwareDeveloper: string;
    mobileNumber: string;
    merchantId: number;

  };

  type UpdateAboutBusinessRequest = {
    businessCategory: string;
    businessType: string;
    softwareDeveloper: string;
    mobileNumber: string;
    merchantId: number;
  };

  type UpdateLocationDTO = {
    country: string;
    merchantId: number;
  };

  type UpdateMerchantBioDataDTO = {
    emailAddress: string;
    gender: "MALE" | "FEMALE";
    dateOfBirth: Date;
    identificationDocument:
    | "DRIVERS_LICENCE"
    | "NATIONAL_ID"
    | "INTL_PASSPORT"
    | "VOTERS_CARD";
    identificationNumber: string;
    merchantId: number;
    identificationDocumentPath?: File | undefined;
  };

  type UpdateMerchantBusinessDataDTO = {
    businessDescription: string;
    businessEmail: string;
    primaryMobile: string;
    supportContact: string;
    businessCity: string;
    businessState: string;
    businessWebsite: string;
    businessLogoFile: File;
    merchantId: number;
    businessCountry: string,
    businessCertificateFile: File
    businessAddress: string
  };

  type UpdateMerchantBankAccountDataDTO = {
    merchantId: number;
    businessBvn: number;
    businessBankName: string;
    businessAccountNumber: number;
    businessAccountName: string;
  };

  interface Merchant {
    id: number;
    businessName: string;
    merchantCode: string;
  }

  interface GetMerchantByMerchantCodeDTO {
    statusCode: string;
    mesage: string;
    responseObject: MerchantDetails[];
  }

  interface MerchantDetails {
    id: number;
    businessName?: string;
    businessCategory?: string;
    businessType?: string;
    merchantStatus?: string;
    userId?: number;
    businessDescription?: string;
    businessEmail?: string;
    primaryMobile?: string;
    supportContact?: string;
    businessCity?: string;
    businessState?: string;
    businessWebsite?: string;
    businessLogo?: string;
    businessBvn?: string;
    businessBankName?: string;
    businessAccountNumber?: string;
    businessAccountName?: string;
    merchantCode?: string;
    apiMode?: string;
    webhookUrl?: string;
    callbackUrl?: string;
    payAccessUsage?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    mobileNumber?: string;
    userStatus?: string;
    gender?: string;
    dateOfBirth?: string;
    primaryBusinessName?: string;
    country?: string;
    softwareDeveloper?: boolean;
    identificationDocument?: string;
    identificationNumber?: string;
    identificationDocumentPath?: string;
    primaryMerchantId?: number;
    twoFactorAuthForLogin?: boolean;
  }

  type MerchantList = Array<Merchant>;
}
