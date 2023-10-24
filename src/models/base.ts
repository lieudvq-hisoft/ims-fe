export interface Base {
  id: string;
}

export interface PagingModel {
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
  pageSkip: number;
}

export interface PaginationParam {
  PageIndex: number;
  PageSize: number;
  SortKey: string;
  SortOrder: string;
  SearchValue: string;
}

export interface OptionType {
  value: string;
  label: string;
}
