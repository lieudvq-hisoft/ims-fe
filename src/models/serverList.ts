import { Base, PagingModel } from "./base";

export interface ServerList extends Base {
  id: string;
  dateCreated: string;
  dateUpdate: string;
  ipAddress: string;
  size: number;
  power: number;
  customer: string;
  status: string;
}

export interface ServerListData extends PagingModel {
  data: ServerList[];
}
