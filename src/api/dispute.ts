import { baseUrl } from "./baseUrl";

// console.log(token)
export const createTicket = async ({
    disputeAmount,
    issueCategory,
    orderRef,
    merchantId,
    ticketMessage,
    attachmentImage,
    token
}: any) => {
    let formdata = new FormData();
    formdata.append("disputeAmount", disputeAmount);
    formdata.append("issueCategory", issueCategory);
    if (attachmentImage === undefined) {

    } else {
        formdata.append("attachmentImage", attachmentImage, attachmentImage.name);
    }
    formdata.append("ticketMessage", ticketMessage);
    formdata.append("orderRef", orderRef);
    formdata.append("merchantId", merchantId);

    return await fetch(`${baseUrl}/api/v1/tickets/create-ticket`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formdata,
    });
};



export const listTransactionTickets = async ({ currentPageNumber, merchantId, rowPerPage, token }: any) => {
    // console.log("searchQuery" + JSON.stringify(request))
    //  merchantId = '1'
    const response = await fetch(`${baseUrl}/api/v1/tickets/get-tickets/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
        method: "GET",
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


export const getDisputeDetails = async ({ merchantId, ticketNumber, token }: any) => {

    const response = await fetch(`${baseUrl}/api/v1/tickets/get-ticket-details/${merchantId}/${ticketNumber}`, {
        method: "GET",
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


