import { locationUrl } from "./baseUrl";


export const getCountry = async () =>{
    const response = await fetch(`http://dstatoka-001-site7.htempurl.com/GetCountries`, {
        method: "GET",
        headers: {
          //  Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
}

export const getAllState = async (countryId: number) =>{    
    const response = await fetch(`http://dstatoka-001-site7.htempurl.com/GetStatesByCountryId/${countryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
console.log("getting states >>  ", data);

    return data;
}