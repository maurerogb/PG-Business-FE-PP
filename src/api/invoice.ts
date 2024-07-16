import { baseUrl } from "./baseUrl";
import { token } from "./http";

// console.log(token)
export const simpleInvoice = async ({
  customerName,
  additionalCustomerEmailAddress,
  dueDate,
  amount,
  invoiceNote,
  businessLogo,
  invoiceStatus,
  customerEmail,
  subject,
  merchantId,
  token
}: any) => {
  let formdata = new FormData();
  formdata.append("customerName", customerName);
  formdata.append(
    "additionalCustomerEmailAddress",
    additionalCustomerEmailAddress,
  );
  if (dueDate === undefined) {

  } else {
    formdata.append("dueDate", dueDate);
  }
  formdata.append("amount", amount);
  formdata.append("invoiceNote", invoiceNote);
  if (businessLogo) {
    formdata.append("businessLogo", businessLogo, businessLogo.name);
  } else {
    formdata.append("businessLogo", new Blob(["", " ", "world"], { type: "text/plain" }));
  }
  formdata.append("merchantId", merchantId);
  formdata.append("customerEmail", customerEmail);
  formdata.append("invoiceStatus", invoiceStatus);

  return await fetch(`${baseUrl}/api/v1/invoice/create-simple-invoice`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formdata,
  });
};

export const standardInvoice = async ({
  customerName,
  additionalCustomerEmailAddress,
  dueDate,
  amount,
  invoiceNote,
  taxPercent,
  discountType,
  discountAmount,
  invoiceBreakdownList,
  subject,
  merchantId,
  invoiceStatus,
  shippingFee,
  token,
  customerEmail,
}: any) => {
  const newData = {
    customerName,
    additionalCustomerEmailAddress,
    dueDate,
    amount,
    invoiceNote,
    taxPercent,
    discountType,
    discountAmount,
    invoiceBreakdownList,
    invoiceStatus,
    shippingFee,
    merchantId: merchantId,
    // customerEmail: subject,
    customerEmail
  };
  return await fetch(`${baseUrl}/api/v1/invoice/create-standard-invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
};

export const getAllInvoice = async ({ currentPageNumber, merchantId, rowPerPage, token, emptyObject }: API.GetAllInovice) => {
  // console.log(merchantId)
  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoices/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(emptyObject)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseText = await response.text();
  const data = JSON.parse(responseText);
  return data;
};


export const getInvoiceDetails = async ({ merchantId, invoiceId, token }: any) => {
  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-details/${invoiceId}/${merchantId}`, {
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
export const getInvoiceBreakdown = async ({ merchantId, invoiceId, token }: any) => {
  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-breakdown/${merchantId}/${invoiceId}`, {
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
export const deleteInvoice = async ({ merchantId, invoiceId, token }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/delete-invoice/${invoiceId}/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const markAsPaid = async ({ merchantCode, invoiceNumber }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/mark-invoice-paid/${invoiceNumber}/${merchantCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
};
export const sendReminder = async ({ merchantId, invoiceId, token }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/resend-invoice-email/${invoiceId}/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


export const filterInvoices = async ({
  invoiceStatus,
  emailAddress,
  startDate,
  endDate,
  merchantId,
  token

}: any) => {
  const newData = {
    invoiceStatus,
    emailAddress,
    startDate,
    endDate,
    merchantId,
  };
  return await fetch(`${baseUrl}/api/v1/invoice/filter-invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
};
