declare namespace API {
  type  CountryResponse = {
    data: CountryData[]
    responseCode: number
    description: string
    timeStamp: string
    url: any
    objects: any
  }  
  type CountryData = {
    id: number,
    name: string
  }

}