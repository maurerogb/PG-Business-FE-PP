
'user client'

import { useRouter } from "next/navigation";
import { baseUrl } from "./baseUrl";
import { useToast } from "components/ui/use-toast";


export const getUtils = async ()=> {
    const response = await fetch(`${baseUrl}/api/v1/utility/get-data`, {
        
    });
    return response.json();
}

export const  logout = async (responseData: any) => {
    console.log("testing logout", responseData) 
   // const router = useRouter()    
    // const { toast } = useToast()

    if (responseData === "715") { 
      
        
        // toast({
        //     variant: "destructive",
        //     title: "",
        //     description: responseData?.message,
        //   })
          console.log("testing clear") 
        localStorage.clear()
        // console.log("testing route") 
        // router.push("/login")
        // console.log("testing test ends") 
        // logout();
        return
      }
    
}