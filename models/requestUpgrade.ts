import { Appointment } from "./appointment";
import { BaseWithIdNumber, PagingModel, ParamGet } from "./base";
import { ComponentObj } from "./component";
import { Customer } from "./customer";
import { Evaluator, Executor } from "./requestHost";

export interface RequestUpgrade extends BaseWithIdNumber {
  status: string;
  requestType: string;
  componentId: number;
  customer: Customer;
  component: ComponentObj;
  description: string;
  serverAllocationId: number;
  succeededAppointment: Appointment;
  note: string;
  saleNote: string;
  techNote: string;
  evaluator: Evaluator;
  executor: Executor;
}

export interface RUParamGet extends ParamGet {
  ServerAllocationId: number;
}

export interface RequestUpgradeData extends PagingModel {
  data: RequestUpgrade[];
}

export interface RequestUpgradeCreateModel {
  componentId: number;
  description: string;
  note: string;
  serverAllocationId: number;
}

export interface RequestUpgradeUpdateModel {
  id: number;
  description: string;
  note: string;
  saleNote: string;
  techNote: string;
}

export interface RequestUpgradeRemoveModel {
  id: number;
  componentId: number;
  descriptions: null;
  serverAllocationId: number;
}

export interface RUAppointmentParamGet extends ParamGet {
  Id: number;
  CustomerId?: string;
  AppointmentId?: number;
}

export interface Descriptions {
  serialNumber: string;
  model: string;
  capacity: number;
  description: string;
}

export interface RequestUpgradeParseJson {
  Id: number;
}
