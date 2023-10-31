import { PaginationParam } from "@/models/base";
import { ServerList } from "@/models/serverList";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getServerListData = async (
  token: string,
  paramGet: PaginationParam
): Promise<any> => {
  const response = await httpClient.get({
    url: apiLinks.server.get,
    token: token,
    params: paramGet,
  });
  return response.data;
};
const serverListService = {
  getServerListData,
};

export default serverListService;
