import { post } from './http';
import { baseUrl } from "./baseUrl";

var token = localStorage.getItem("token") as string
export const terminalRequest = async (data: any) => {
  // const url = `${baseUrl}/api/v1/terminal/create-terminal-request`
  // (await post(url, data)).body
   console.log(data,  JSON.stringify(data));
   
  
    return await fetch(`${baseUrl}/api/v1/terminal/create-terminal-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };