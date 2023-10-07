export const url = "https://imsapi.hisoft.vn";
// export const urlServerSide = "http://192.168.40.83:8000";
export const urlServerSide = "https://imsapi.hisoft.vn";

const apiLinks = {
  user: {
    login: `${urlServerSide}/api/User/Login`,
  },
  customer: {
    create: `${url}/api/Customer`,
    update: `${url}/api/Customer`,
    get: `${url}/api/Customer`,
   
  },
};

export default apiLinks;
