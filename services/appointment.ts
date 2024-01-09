import {
  Appointment,
  AppointmentComplete,
  AppointmentCreateModel,
  AppointmentData,
  AppointmentFail,
  AppointmentUpdateModel,
  DocumentModelAppointment,
  ParamGetExtend,
} from "@models/appointment";
import { ParamGet } from "@models/base";
import { AppointmentIncidentCreateModel } from "@models/incident";
import { RequestExpandData } from "@models/requestExpand";
import {
  RUAppointmentParamGet,
  RequestUpgradeData,
} from "@models/requestUpgrade";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getListAppointments = async (
  token: string,
  params: ParamGetExtend
): Promise<AppointmentData> => {
  const response = await httpClient.get({
    url: apiLinks.appointment.get,
    token: token,
    params: params,
  });
  return response.data;
};

const getDetail = async (token: string, id: string): Promise<Appointment> => {
  const response = await httpClient.get({
    url: apiLinks.appointment.getById + `/${id}`,
    token: token,
  });
  return response.data;
};

const getRequestUpgradesById = async (
  token: string,
  params: RUAppointmentParamGet
): Promise<RequestUpgradeData> => {
  const response = await httpClient.get({
    url: apiLinks.appointment.getRequestUpgradesById,
    token: token,
    params: params,
  });
  return response.data;
};

const getRequestExpandsById = async (
  token: string,
  params: RUAppointmentParamGet
): Promise<RequestExpandData> => {
  const response = await httpClient.get({
    url: apiLinks.appointment.getRequestExpandById,
    token: token,
    params: params,
  });
  return response.data;
};

const acceptAppointment = async (
  token: string,
  id: string,
  saleNote: string
): Promise<any> => {
  const response = await httpClient.put({
    url: apiLinks.appointment.accept + `/${id}/Accept`,
    token: token,
    data: { saleNote: saleNote },
  });
  return response.data;
};

const denyAppointment = async (
  token: string,
  id: string,
  saleNote: string
): Promise<any> => {
  const response = await httpClient.put({
    url: apiLinks.appointment.accept + `/${id}/Deny`,
    token: token,
    data: { saleNote: saleNote },
  });
  return response.data;
};

const completeAppointment = async (
  token: string,
  id: number,
  data: AppointmentComplete
): Promise<any> => {
  const response = await httpClient.put({
    url: apiLinks.appointment.complete + `/${id}/Complete`,
    token: token,
    data: data,
  });
  return response.data;
};

const failAppointment = async (
  token: string,
  id: string,
  data: AppointmentFail,
): Promise<any> => {
  const response = await httpClient.put({
    url: apiLinks.appointment.fail + `/${id}/Fail`,
    token: token,
    data: data
  });
  return response.data;
};

const uploadDocument = async (
  token: string,
  id: string,
  data: FormData
): Promise<any> => {
  const response = await httpClient.post({
    contentType: "multipart/form-data",
    url: apiLinks.appointment.upload + `/${id}/FinalDocument`,
    token: token,
    data: data,
  });
  return response.data;
};

const create = async (
  token: string,
  data: AppointmentCreateModel
): Promise<any> => {
  const response = await httpClient.post({
    token: token,
    url: apiLinks.appointment.create,
    data: data,
  });
  return response.data;
};

const update = async (
  token: string,
  data: AppointmentUpdateModel
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: apiLinks.appointment.update,
    data: data,
  });
  return response.data;
};

const deleteAppointment = async (token: string, id: number): Promise<any> => {
  const response = await httpClient.delete({
    token: token,
    url: apiLinks.appointment.delete + `/${id}`,
  });
  return response.data;
};

const updateDocument = async (
  token: string,
  id: number,
  data: DocumentModelAppointment
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: apiLinks.appointment.updateDocument + `/${id}/Document`,
    data: data,
  });
  return response.data;
};

const confirmDocument = async (token: string, id: string): Promise<any> => {
  const response = await httpClient.put({
    url:
      apiLinks.appointment.confirmDocument + `/${id}/DocumentConfirmation/True`,
    token: token,
  });
  return response.data;
};

const createIncident = async (
  token: string,
  data: AppointmentIncidentCreateModel
): Promise<any> => {
  const response = await httpClient.post({
    url: apiLinks.appointment.createIncident,
    token: token,
    data: data,
  });
  return response.data;
}

const appointment = {
  getListAppointments,
  getDetail,
  uploadDocument,
  confirmDocument,
  getRequestUpgradesById,
  getRequestExpandsById,
  acceptAppointment,
  denyAppointment,
  completeAppointment,
  failAppointment,
  create,
  update,
  deleteAppointment,
  updateDocument,
  createIncident,
};

export default appointment;
