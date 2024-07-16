import { baseUrl } from "./baseUrl";






export const getMerchantSetting = async ({ merchantId, token }: API.GetMerchantSetting) => {

    const response = await fetch(`${baseUrl}/api/v1/settings/get-merchant-settings/${merchantId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};





export const updateNotification = async ({
    transactionNotificationByEmail,
    customerNotificationByEmail,
    transferNotificationByEmailForCredit,
    transferNotificationByEmailForDebit,
    merchantReceiveEarningsOption,
    enableNotificationForTransfer,
    enableNotificationForInvoicing,
    enableNotificationForPaymentLink,
    enableNotificationForSettlement,
    merchantId,
    token
}: API.NotificationBody) => {
    const newData = {
        transactionNotificationByEmail,
        customerNotificationByEmail,
        transferNotificationByEmailForCredit,
        transferNotificationByEmailForDebit,
        merchantReceiveEarningsOption,
        enableNotificationForTransfer,
        enableNotificationForInvoicing,
        enableNotificationForPaymentLink,
        enableNotificationForSettlement,
        merchantId,
    };
    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};


export const getUserInfo = async (token: string) => {
    const response = await fetch(`${baseUrl}/api/v1/user/get-user-details`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};



export const updateUserPassword = async ({
    password,
    newPassword,
    token,
}: API.UpdateUserPassword) => {
    const newData = {
        password,
        newPassword,
    };
    return await fetch(`${baseUrl}/api/v1/user/update-user-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};

export const getMerchantDetails = async ({ token, merchantCode }: any) => {
    const response = await fetch(`${baseUrl}/api/v1/merchant/get-merchant-details/${merchantCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};

export const updateBusinessInfo = async ({
    businessDescription,
    businessEmail,
    primaryMobile,
    country,
    businessState,
    businessWebsite,
    merchantId,
    businessLogoFile,
    token,
}: API.UpdateBusinessInfo) => {
    let formdata = new FormData();
    formdata.append("businessDescription", businessDescription);
    formdata.append("businessEmail", businessEmail);
    formdata.append("primaryMobile", primaryMobile);
    formdata.append("country", country);
    formdata.append("businessState", businessState);
    if (businessLogoFile) {
        formdata.append("businessLogoFile", businessLogoFile, businessLogoFile.name);
    } else {

    }
    formdata.append("merchantId", merchantId);
    formdata.append("businessWebsite", businessWebsite);

    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-business-information`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formdata,
    });
};

export const updateAccountData = async ({
    merchantId,
    businessBvn,
    businessBankName,
    businessAccountNumber,
    businessAccountName,
    token
}: API.UpdateAccountData) => {
    const newData = {
        merchantId,
        businessBvn,
        businessBankName,
        businessAccountNumber,
        businessAccountName,
    };
    return await fetch(`${baseUrl}/api/v1/merchant/update-merchant-business-bank-account-data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};
export const updateBusinessType = async ({
    merchantId,
    businessType,
    token
}: API.UpdateBusinessType) => {
    const newData = {
        merchantId,
        businessType,
    };
    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-business-type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};
export const updateSecurity = async ({
    twoFactorAuthForPaymentAndTransfer,
    twoFactorAuthForLogin,
    merchantId,
    token,
}: API.UpdateSecurity) => {
    const newData = {
        twoFactorAuthForPaymentAndTransfer,
        twoFactorAuthForLogin,
        merchantId,
    };
    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-security`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};
export const paymentSettings = async ({
    defaultCurrency,
    merchantId,
    token,
    enableAcceptPOSChannel,
    enableAcceptBankTransfers,
    enableAcceptCardPayment,
    enableAcceptMobileMoneyTransfer,
    enableUSSDTransfer
}: API.PaymentSettings) => {
    const newData = {
        defaultCurrency,
        merchantId,
        enableAcceptPOSChannel,
        enableAcceptBankTransfers,
        enableAcceptCardPayment,
        enableAcceptMobileMoneyTransfer,
        enableUSSDTransfer
    };
    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-payment-settings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};