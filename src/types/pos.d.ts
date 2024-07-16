declare namespace API {
    type StatusReponse = {
      statusCode?: string;
      message?: string;
      responseObject?: string;
    };



    type TerminalsRequest = {
      quantity: number;
      terminalBrand: string;
      merchantId: number;
      terminalType: string;
    }
  

    type Reponse = {
      statusCode?: string;
      message?: string;
      responseObject?: string;
  };
}  