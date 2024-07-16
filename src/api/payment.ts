import { ISWToken, baseUrl } from "./baseUrl";


export const getMerchantDetailGuest = async ({ invoiceNumber, merchantCode }: any) => {

    const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-details-for-guest/${invoiceNumber}/${merchantCode}`, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};
export const getMerchantBreakDownGuest = async ({ invoiceId, merchantId }: any) => {

    const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-breakdown-for-guest/${invoiceId}/${merchantId}`, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};

export const payWithCard = async ({
    customData,
    orderRef,
    merchantCode,
    redirectUrl,
    currencyCode,
    amount,
    terminalCode,
    channel,
    cardDetails,
    customerId,

}: API.InitiatePayment) => {
    const newData = {
        orderRef,
        merchantCode,
        redirectUrl,
        currencyCode,
        amount,
        terminalCode,
        channel,
        cardDetails,
        customerId,
        customData: JSON.stringify(customData)
    };
    console.log("newData from payment fetch", newData)
    return await fetch(`${baseUrl}/api/v1/transactions/debit-card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${ISWToken}`,
        },
        body: JSON.stringify(newData),
    });
};
export const authorizePayment = async ({
    orderRef,
    merchantCode,
    otp

}: any) => {
    const newData = {
        orderRef,
        merchantCode,
        otp,
        terminalCode: "6H39FUDB"

    };
    return await fetch(`${baseUrl}/api/v1/transactions/authorize-card-payment-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${ISWToken}`,
        },
        body: JSON.stringify(newData),
    });
};