import { baseUrl } from "./baseUrl";


// export const getTransactionWithSearch = async ({ currentPageNumber, merchantId, rowPerPage, token }: API.Pager, payload: API.TSearchRequest) => {
//     // console.log(merchantId)
//     const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoices/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const responseText = await response.text();
//     const data = JSON.parse(responseText);
//     return data;
//   };

export const getAllTransaction = async ({ currentPageNumber, merchantId, request, rowPerPage, token }: API.Pager) => {
  // console.log("searchQuery" + JSON.stringify(request))
  //  merchantId = '1'
  const response = await fetch(`${baseUrl}/api/v1/transactions/get-transactions-by-merchant-id/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
    method: "POST",
    body: JSON.stringify(request),
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
export const getTransactionDetails = async ({ orderRef, merchantCode, token }: any) => {

  const response = await fetch(`${baseUrl}/api/v1/transactions/get-transaction-details/${merchantCode}/${orderRef}`, {
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



