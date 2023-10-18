import { Rack } from "@/models/location";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getRackData = async (
  token: string,
): Promise<Rack> => {
  const response = await httpClient.get({
    url: apiLinks.location.get,
    token: token,
  });
  console.log(response.data);
  return response.data;
};
const locationService = {
  getRackData,
};

export default locationService;
