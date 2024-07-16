
declare namespace API {
    type TSearchRequest = {
        transactionStatus?: string;
        merchantCode?: string;
        startDate?: string;
        endDate?: string;
        orderRef?: string;
        switchTransactionRef?: string;
        terminalCode?: string;

    }

    type Pager = {
        currentPageNumber: string
        token: string
        rowPerPage: string
        merchantId: string
        request: TSearchRequest
    }
}