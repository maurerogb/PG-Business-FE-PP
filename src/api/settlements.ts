import { baseUrl } from "./baseUrl";



export const runSettlements = async ({
    payAccessCurrency,
    settlementDate,
    settlementStatus,
    token

}: any) => {
    const newData = {
        payAccessCurrency,
        settlementDate,
        settlementStatus
    };
    return await fetch(`${baseUrl}/api/v1/settlement/run-settlement`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};


export const getAllSettlements = async ({ pageNumber, rowCount, token }: any) => {
    // console.log("searchQuery" + JSON.stringify(request))
    //  merchantId = '1'
    const response = await fetch(`${baseUrl}/api/v1/settlement/get-settlement-list/${rowCount}/${pageNumber}`, {
        method: "GET",
        // body: JSON.stringify(request),
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
export const getAllSettlementsBreakdown = async ({ pageNumber, rowCount, token, settlementId }: any) => {
    // console.log("searchQuery" + JSON.stringify(request))
    //  merchantId = '1'

    const response = await fetch(`${baseUrl}/api/v1/settlement/get-settlement-breakdown-list/${rowCount}/${pageNumber}?settlementId=${settlementId}`, {
        method: "GET",
        // body: JSON.stringify(request),
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

