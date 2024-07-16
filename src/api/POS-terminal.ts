import { baseUrl } from "./baseUrl";



export const createTerminaRequest = async ({
    merchantId,
    terminalType,
    terminalBrand,
    quantity,
    token

}: any) => {
    const newData = {
        merchantId,
        terminalType,
        terminalBrand,
        quantity,
    };
    return await fetch(`${baseUrl}/api/v1/terminal/create-terminal-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};



export const getTerminalRequests = async ({ currentPageNumber, merchantId, rowCount, token }: any) => {
    const response = await fetch(`${baseUrl}/api/v1/terminal/get-terminal-requests/${rowCount}/${currentPageNumber}?merchantId=${merchantId}`, {
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
export const getTerminals = async ({ currentPageNumber, merchantId, rowCount, token }: any) => {
    const response = await fetch(`${baseUrl}/api/v1/terminal/get-terminals/${currentPageNumber}?merchantId=${merchantId}`, {
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


export const getTerminalsTransactions = async ({ pageNumber, rowCount, token, terminalCode }: any) => {

    const response = await fetch(`${baseUrl}/api/v1/transactions/get-transactions/${rowCount}/${pageNumber}`, {
        method: "POST",
        body: JSON.stringify(terminalCode),
        headers: {
            "Content-Type": "application/json",
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


