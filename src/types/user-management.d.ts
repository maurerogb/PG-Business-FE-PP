declare namespace API {
  interface UserDetailsResponse {
    statusCode: string;
    message: string;
    responseObject: UserDetails;
  }

  interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNumber: string;
    userStatus: string;
    gender: string;
    dateOfBirth: string;
    primaryBusinessName: string;
    softwareDeveloper: boolean;
    identificationDocument: string;
    identificationNumber: string;
    identificationDocumentPath: string;
    primaryMerchantId: number;
    twoFactorAuthForLogin: true;
    businessCategory:string;
    apiMode:string;
  }
}
