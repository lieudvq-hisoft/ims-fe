import { Base, PagingModel } from "./base";

export interface Customer extends Base {
  id: string;
  companyName: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  email: string;
  taxNumber: string;
}

export interface CustomerData extends PagingModel {
    data: Customer[];
  } 