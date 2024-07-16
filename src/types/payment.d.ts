declare namespace API {

    type PaymentStatusReponse = {
        statusCode?: string;
        message?: string;
        responseObject: {
            transactionRef: string,
            paymentId: string,
            message: string,
            amount: string,
            responseCode: string,
            plainTextSupportMessage: string,
        }
    };
    type InitiatePayment = {
        customData: string,
        orderRef: string,
        merchantCode: string,
        redirectUrl: string,
        currencyCode: string,
        amount: number | string,
        terminalCode: string,
        channel: string,
        cardDetails: {
            pan: string,
            expDate: string,
            cvv: string,
            pin: string,
        },
        customerId: string,
    }


}



