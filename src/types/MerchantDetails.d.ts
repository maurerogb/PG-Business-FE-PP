declare namespace API {

    interface MerchantDetails {
    state: State
    version: number
  }
  
  
  interface State {
    merchants: Merchant[]
    currentMerchant: CurrentMerchant
    currentMerchantDetails: CurrentMerchantDetails
  }
  
  
  interface Merchant {
    id: number
    businessName: string
    merchantCode: string
  }
  
  
  interface CurrentMerchant {
    id: number
    businessName: string
    merchantCode: string
  }
  
  
  interface CurrentMerchantDetails {
    id: number
    businessName: string
    businessCategory: string
    businessType: string
    merchantStatus: string
    userId: number
    businessDescription: string
    businessEmail: string
    primaryMobile: string
    supportContact: string
    businessCity: string
    businessState: string
    businessWebsite: string
    businessBvn: string
    businessBankName: string
    businessAccountNumber: string
    businessAccountName: string
    merchantCode: string
    apiMode: string
    webhookUrl: string
    callbackUrl: string
    governmentApprovedDocumentFileName: string
    directorsProofOfIdentityFileName: string
    businessOwnersDocumentFileName: string
    shareholdersDocumentFileName: string
    createdAt: string
    updatedAt: string
    kycSet: boolean
    businessInfoSet: boolean
    personalInfoSet: boolean
    accountInfoSet: boolean
  }
}