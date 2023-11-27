export const url = "https://imsapi.hisoft.vn";
export const urlServerSide = "http://192.168.40.83:8001";
// export const urlServerSide = "https://imsapi.hisoft.vn";

const apiLinks = {
  user: {
    login: `${urlServerSide}/api/User/Login`,
  },

  serverAllocation: {
    get: `${url}/api/ServerAllocation`,
    getById: `${url}/api/ServerAllocation`,
    create: `${url}/api/ServerAllocation`,
    update: `${url}/api/ServerAllocation`,
    delete: `${url}/api/ServerAllocation`,
  },

  serverHardwareConfig: {
    get: `${url}/api/ServerHardwareConfig`,
    create: `${url}/api/ServerHardwareConfig`,
    update: `${url}/api/ServerHardwareConfig`,
    delete: `${url}/api/ServerHardwareConfig`,
  },

  component: {
    get: `${url}/api/Component`,
    getAll: `${url}/api/Component/All`,
    create: `${url}/api/Component`,
    update: `${url}/api/Component`,
    delete: `${url}/api/Component`,
  },

  customer: {
    get: `${url}/api/Customer`,
    create: `${url}/api/Customer`,
    update: `${url}/api/Customer`,
    delete: `${url}/api/Customer`,
  },

  requestUpgrade: {
    get: `${url}/api/RequestUpgrade`,
    getById: `${url}/api/RequestUpgrade`,
    getAppointmentsById: `${url}/api/RequestUpgrade`,
    create: `${url}/api/RequestUpgrade`,
    update: `${url}/api/RequestUpgrade`,
    delete: `${url}/api/RequestUpgrade`,
    accept: `${url}/api/RequestUpgrade`,
    deny: `${url}/api/RequestUpgrade`,
    complete: `${url}/api/RequestUpgrade`,
    reject: `${url}/api/RequestUpgrade`,
  },

  area: {
    get: `${url}/api/Area`,
    getRacksById: `${url}/api/Area`,
    create: `${url}/api/Area`,
    update: `${url}/api/Area`,
    delete: `${url}/api/Area`,
    getAll: `${url}/api/Area/All`,
  },

  rack: {
    get: `${url}/api/Rack`,
    create: `${url}/api/Rack`,
    update: `${url}/api/Rack`,
    delete: `${url}/api/Rack`,
  },

  companyType: {
    get: `${url}/api/CompanyType`,
  },

  appointment: {
    get: `${url}/api/Appointment`,
    getById: `${url}/api/Appointment`,
    getRequestUpgradesById: `${url}/api/Appointment`,
    upload: `${url}/api/Appointment`,
    accept: `${url}/api/Appointment`,
    deny: `${url}/api/Appointment`,
    complete: `${url}/api/Appointment`,
    fail: `${url}/api/Appointment`,
  },
};

export default apiLinks;
