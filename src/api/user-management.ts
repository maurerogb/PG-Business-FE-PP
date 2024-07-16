import { baseUrl } from "./baseUrl";
// import { token } from "./http";

export const getUserInfo = async (token: string)=> {
  return await fetch(`${baseUrl}/api/v1/user/get-user-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
