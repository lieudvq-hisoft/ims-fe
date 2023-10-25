import { Base, PagingModel } from "./base";

export interface Customer extends Base {
  key: React.Key;
  id: string;
  companyName: string;
  fullname: string;
  companyType: string;
  address: string;
  phoneNumber: string;
  email: string;
  taxNumber: string;
}

export interface CustomerList extends PagingModel {
  data: Customer[];
}

export interface CustomerCreate {
  companyName: string;
  taxNumber: string;
  fullname: string;
  companyTypeId: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface CustomerEdit {
  id?: string;
  companyName: string;
  taxNumber: string;
  fullname: string;
  companyTypeId: string;
  address: string;
  email: string;
  phoneNumber: string;
}
