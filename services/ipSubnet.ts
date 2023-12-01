import { ParamGet, ParamGetWithId } from "@models/base";
import { IpAddressData } from "@models/ipAddress";
import { IpSubnet, IpSubnetCreateModel, IpSubnetData } from "@models/ipSubnet";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getData = async (
  token: string,
  params: ParamGet
): Promise<IpSubnetData> => {
  const response = await httpClient.get({
    token: token,
    url: apiLinks.ipSubnet.get,
    params: params,
  });
  return response.data;
};

const getDetail = async (token: string, id: string): Promise<IpSubnet> => {
  const response = await httpClient.get({
    url: apiLinks.ipSubnet.getById + `/${id}`,
    token: token,
  });
  return response.data;
};

const getIpAddresssById = async (
  token: string,
  params: ParamGetWithId
): Promise<IpAddressData> => {
  const response = await httpClient.get({
    url: apiLinks.ipSubnet.getIpAddresssById + `/${params.Id}/IpAddress`,
    token: token,
    params: params,
  });
  return response.data;
};

const createData = async (
  token: string,
  data: IpSubnetCreateModel
): Promise<any> => {
  const response = await httpClient.post({
    token: token,
    url: apiLinks.ipSubnet.create,
    data: data,
  });
  return response.data;
};

const ipSubnet = {
  getData,
  createData,
  getDetail,
  getIpAddresssById,
};

export default ipSubnet;
