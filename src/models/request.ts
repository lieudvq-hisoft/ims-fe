import { Base, PagingModel } from "./base";

export interface Request extends Base {
  id: string;
  dateCreated: string;
  companyName: string;
  type: string;
  customerId: string;
  status: string;
}

export interface RequestData extends PagingModel {
  data: Request[];
}
