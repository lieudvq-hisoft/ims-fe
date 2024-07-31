import { PagingModel } from "./base";

export interface StockLocation {
  id: string;
  name: string;
  completeName: string;
  parentPath: string;
  barcode: string;
  usage: string;
}


export interface StockLocationInfo extends StockLocation {
  parentLocation: StockLocation
}

export interface StockLocationPaging extends PagingModel {
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  data: StockLocationInfo[];
}