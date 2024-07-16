 
import { baseUrlAuth } from "./baseUrl";

export const loginApi = async (loginBody: API.LoginDTO) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return await fetch(`${baseUrlAuth}`, {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(loginBody),
  });
};
