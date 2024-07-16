import { useRouter } from "next/navigation";

 

export  const token = () => {
 var token2 = localStorage.getItem("token") as string
 console.log(token2);
 
 
 return token2;

  // const router = useRouter();
  // if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  //   return localStorage.getItem("token") as string
  // }
  // localStorage.clear()
  // router.push("/login");
}

export const post = async (data: any, url: string) => {
    return await fetch(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
  };    

