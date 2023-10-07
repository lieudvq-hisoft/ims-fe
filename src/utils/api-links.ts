//export const url = "https://imsapi.hisoft.vn";
export const url = "https://127.0.0.1:7234";
export const urlServerSide = "https://127.0.0.1:7234";
//export const urlServerSide = "https://imsapi.hisoft.vn";

const apiLinks = {
  user: {
    login: `${urlServerSide}/api/User/Login`,
  },
  customer: {
    create: `${url}/api/Customer`,
    update: `${url}/api/Customer`,
    get: `${url}/api/Customer`
  },
};

export default apiLinks;
