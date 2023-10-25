import { LoginResponse, User } from "@/models/user";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiLinks.user.login,
    data: {
      username: username,
      password: password,
    },
  });
  return response.data;
};

const getMyAccountInfo = async (
  token: string
): Promise<User> => {
  const response = await httpClient.get({
    url: apiLinks.user.myAccount,
    token: token,
  });
  return response.data;
};

const updateUserAccount = async (
  user: User,
  token: string
): Promise<User> => {
  const response = await httpClient.patch({
    url: apiLinks.user.myAccount,
    data: user,
    token: token,
  });
  return response.data;
};

const authService = {
  login,
  getMyAccountInfo,
  updateUserAccount
};

export default authService;
