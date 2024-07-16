declare namespace API {

    type GetMerchantSetting = {
        merchantId: string,
        token: string

    }
    type NotificationBody = {
        transactionNotificationByEmail: boolean,
        customerNotificationByEmail: boolean,
        transferNotificationByEmailForCredit: boolean,
        transferNotificationByEmailForDebit: boolean,
        merchantReceiveEarningsOption: string,
        enableNotificationForTransfer: boolean,
        enableNotificationForInvoicing: boolean,
        enableNotificationForPaymentLink: boolean,
        enableNotificationForSettlement: boolean,
        merchantId: string,
        token: string,
    }

    type UpdateUserPassword = {
        password: string,
        newPassword: string
        token: string,

    }
    type UpdateAccountData = {
        merchantId: string,
        businessBvn: string
        businessBankName: string,
        businessAccountNumber: string,
        businessAccountName: string,
        token: string,

    }
    type UpdateBusinessType = {
        businessType: string
        merchantId: string,
        token: string
    }
    type UpdateSecurity = {
        twoFactorAuthForPaymentAndTransfer: string
        twoFactorAuthForLogin: string
        merchantId: string,
        token: string
    }
    type PaymentSettings = {
        defaultCurrency: string
        merchantId: string,
        token: string
        enableAcceptPOSChannel: boolean
        enableAcceptBankTransfers: boolean
        enableAcceptCardPayment: boolean
        enableAcceptMobileMoneyTransfer: boolean
        enableUSSDTransfer: boolean
    }
    type UpdateBusinessInfo = {
        businessDescription: string,
        businessEmail: string
        primaryMobile: string,
        country: string,
        businessState: string,
        businessWebsite: string,
        merchantId: string,
        businessLogoFile: File,
        token: string,

    }
}
