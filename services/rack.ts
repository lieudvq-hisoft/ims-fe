import { ParamGet } from "@models/base";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";
import {
  RackCreateModel,
  RackUpdateModel,
  RackData,
  Rack,
  RackMap,
} from "@models/rack";

const getData = async (token: string, params: ParamGet): Promise<RackData> => {
  const response = await httpClient.get({
    token: token,
    url: apiLinks.rack.get,
    params: params,
  });
  return response.data;
};

const createData = async (
  token: string,
  data: RackCreateModel
): Promise<any> => {
  const response = await httpClient.post({
    token: token,
    url: apiLinks.rack.create,
    data: data,
  });
  return response.data;
};

const updateData = async (
  token: string,
  data: RackUpdateModel
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: apiLinks.rack.update,
    data: data,
  });
  return response.data;
};

const deleteData = async (token: string, id: number): Promise<any> => {
  const response = await httpClient.delete({
    url: apiLinks.rack.delete + `/${id}`,
    token: token,
  });
  return response.data;
};

const getRackById = async (token: string, id: string): Promise<Rack> => {
  const response = await httpClient.get({
    url: apiLinks.rack.get + `/${id}`,
    token: token,
  });
  return response.data;
};

const getMapsById = async (token: string, id: string): Promise<RackMap[]> => {
  const response = await httpClient.get({
    url: apiLinks.rack.getMapById + `/${id}/Map`,
    token: token,
  });
  return response.data;
};

const area = {
  getData,
  updateData,
  deleteData,
  createData,
  getRackById,
  getMapsById,
};

export default area;
