import { Base, PagingModel } from "./base";

export interface Device extends Base {
  id: string;
  dateCreated: string;
  dateUpdate: string;
  type: string;
  baseSize: number;
  basePower: number;
  rack: string;
  status: string;
}

export interface DeviceData extends PagingModel {
  data: Device[];
}
