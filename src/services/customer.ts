import { PaginationParam } from "@/models/base";
import { Customer, CustomerList, CustomerCreate } from "@/models/customer";
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
    token: token,
    data: data,
  });
  return response.data;
};

const getCustomerData = async (
  token: string,
  paramGet: PaginationParam
): Promise<CustomerList> => {
  const response = await httpClient.get({
    url: apiLinks.customer.get,
    token: token,
    params: paramGet,
  });
  return response.data;
};

const deleteCustomer = async (token: string, id: string): Promise<Customer> => {
  const response = await httpClient.delete({
    url: apiLinks.customer.delete + `/${id}`,
    token: token,
  });
  return response.data;
};

const customerService = {
  getCustomerData,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customerService;
