import { PaginationParam } from "@/models/base";
import { DeviceData } from "@/models/device";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getDeviceData = async (
  token: string,
  paramGet: PaginationParam
): Promise<DeviceData> => {
  const response = await httpClient.get({
    url: apiLinks.device.get,
    token: token,
    params: paramGet,
  });
  return response.data;
};
const deviceService = {
  getDeviceData,
};

export default deviceService;
