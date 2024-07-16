declare namespace API {
  type LoginDTO = {
    username: string
    password: string
  }
  type LoginResponse = {
    responseObject?: string,
    subject?: string,
    message?: string,
    merchantList?: {
      id: any
      businessName: string,
      merchantCode: string
    }[]
    token?: string
  }
}

