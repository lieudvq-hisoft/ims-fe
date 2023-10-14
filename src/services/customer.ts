import { ParamGet } from "@/models/base";
import { Customer, CustomerData, CustomerCreate } from "@/models/customer";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const updateCustomer = async (
  token: string,
  data: CustomerCreate
): Promise<Customer> => {
  const response = await httpClient.patch({
    url: apiLinks.customer.update,
    token: token,
    data: data,
  });
  return response.data;
};

const createCustomer = async (
  token: string,
  data: CustomerCreate
): Promise<Customer> => {
  const response = await httpClient.post({
    url: apiLinks.customer.create,
    contentType: "multipart/form-data",
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
  updateCustomer,
};

export default customerService;
