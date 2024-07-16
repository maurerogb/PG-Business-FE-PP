declare namespace API {
    type SimpleInvoice = {
        customerName: string,
        customerEmail: string,
        additionalCustomerEmailAddress: string,
        dueDate: string,
        amount: number,
        invoiceNote: string,
        businessLogo: File,
        token: string,
        subject: string,
        merchantId: any,
        invoiceStatus: string
    };
    type InvoiceStatusReponse = {
        statusCode?: string;
        message?: string;
        responseObject?: string;
    };

    type StandardInvoice = {
        customerName: string,
        additionalCustomerEmailAddress: string,
        dueDate: string,
        amount: number,
        invoiceNote: string,
        taxPercent: number,
        discountType: string,
        discountAmount: number,
        token: string,
        subject: string,
        merchantId: string
        invoiceStatus: string
        invoiceBreakdownList: {
            invoiceItem: string,
            quantity: number,
            costPerUnit: number
        }[]

    };
    type GetAllInovice = {
        currentPageNumber: string
        token: string
        rowPerPage: string
        merchantId: string,
        emptyObject: {}

    }
}

