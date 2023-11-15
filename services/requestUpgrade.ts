import { ParamGet } from "@models/base";
import {
  RequestUpgradeCreateModel,
  RequestUpgradeUpdateModel,
  RequestUpgradeData,
} from "@models/requestUpgrade";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getData = async (
  token: string,
  params: ParamGet
): Promise<RequestUpgradeData> => {
  const response = await httpClient.get({
    token: token,
    url: apiLinks.requestUpgrade.get,
    params: params,
  });
  return response.data;
};

const createData = async (
  token: string,
  data: RequestUpgradeCreateModel
): Promise<any> => {
  const response = await httpClient.post({
    token: token,
    url: apiLinks.requestUpgrade.create,
    data: data,
  });
  return response.data;
};

const updateData = async (
  token: string,
  data: RequestUpgradeUpdateModel
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: apiLinks.requestUpgrade.create,
    data: data,
  });
  return response.data;
};

const deleteData = async (token: string, id: string): Promise<any> => {
  const response = await httpClient.delete({
    url: apiLinks.requestUpgrade.delete + `/${id}`,
    token: token,
  });
  return response.data;
};

const requestUpgrade = {
  getData,
  createData,
  updateData,
  deleteData,
};

export default requestUpgrade;
