import { PaginationParam } from "@/models/base";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getRequestData = async (
  token: string,
  paramGet: PaginationParam
): Promise<any> => {
  const response = await httpClient.get({
    url: apiLinks.request.get,
    token: token,
    params: paramGet,
  });
  return response.data;
};
const requestService = {
  getRequestData,
};

export default requestService;
