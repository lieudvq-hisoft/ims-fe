import { ParamGet } from "@/models/base";
import { Customer, CustomerData, customerCreate } from "@/models/customer";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createCustomer = async (
  token: string,
  data: customerCreate
): Promise<Customer> => {
  const response = await httpClient.post({
    url: apiLinks.customer.create,
    token: token,
    data: data,
  });
  return response.data;
};

const getCustomerData = async (
  token: string,
  paramGet: ParamGet
): Promise<CustomerData> => {
  const response = await httpClient.get({
    url: apiLinks.customer.get,
    token: token,
    params: paramGet,
  });
  return response.data;
};

const customerService = {
  getCustomerData,
  createCustomer,
};

export default customerService;
