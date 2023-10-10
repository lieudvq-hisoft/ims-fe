import { ParamGet } from "@/models/base";
import { CustomerData } from "@/models/customer";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getCustomerData = async (
    token: string,
    paramGet: ParamGet
  ): Promise<CustomerData> => {
    const response = await httpClient.get({
      url: apiLinks.customer.get,
      token: token,
      params: paramGet,
    });
    console.log(response);
    return response.data;
  };

  
const customerService = {
    getCustomerData,
  };
  
  export default customerService;
  