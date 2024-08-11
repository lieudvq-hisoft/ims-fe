import {
  StockLocation,
  StockLocationPaging,
  StockLocationInfo,
  StockLocationCreate,
  StockLocationUpdateParent,
  StockLocationUpdate,
} from "@models/stockLocation";
import { StockQuantPaging } from "@models/stockQuant";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getStockLocations = async (
  token?: string,
  pageIndex?: number,
  pageSize?: number,
  searchText?: string
): Promise<StockLocationPaging> => {
  const response = await httpClient.get({
    token: token,
    url: apiLinks.stockLocation.get,
    params: {
      pageIndex,
      pageSize,
      SortKey: "CompleteName",
      SortOrder: "ASC",
      SearchText: searchText,
    },
  });
  return response.data;
};

const getStockLocationInfo = async (
  token?: string,
  id?: string
): Promise<StockLocationInfo> => {
  const response = await httpClient.get({
    token: token,
    url: `${apiLinks.stockLocation.getInfo}/${id}`,
  });
  return response.data;
};

const getForSelectParent = async (
  token?: string,
  id?: string
): Promise<StockLocation[]> => {
  const response = await httpClient.get({
    token: token,
    url: id
      ? `${apiLinks.stockLocation.getSelectParent}/${id}`
      : `${apiLinks.stockLocation.getSelectParent}`,
  });
  return response.data;
};

const deleteStockLocation = async (
  token?: string,
  id?: string
): Promise<any> => {
  const response = await httpClient.delete({
    token: token,
    url: `${apiLinks.stockLocation.delete}/${id}`,
  });
  return response.data;
};

const getForSelect = async (
  token?: string
): Promise<StockLocation[]> => {
  const response = await httpClient.get({
    token: token,
    url: `${apiLinks.stockLocation.getForSelect}`,
  });
  return response.data;
};

const getStockQuants = async (
  token?: string,
  locationId?: string,
  pageIndex?: number,
  pageSize?: number,
  searchText?: string
): Promise<StockQuantPaging> => {
  const response = await httpClient.get({
    token: token,
    url: `${apiLinks.stockLocation.getStockQuant}/${locationId}`,
    params: {
      pageIndex,
      pageSize,
      SortKey: "CreateDate",
      SortOrder: "ASC",
      SearchText: searchText,
    },
  });
  return response.data;
};

const updateStockLocation = async (
  token?: string,
  data?: StockLocationUpdate
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: `${apiLinks.stockLocation.update}`,
    data: data,
  });
  return response.data;
};

const createStockLocation = async (
  token?: string,
  data?: StockLocationCreate
): Promise<StockLocation> => {
  const response = await httpClient.post({
    token: token,
    url: `${apiLinks.stockLocation.create}`,
    data: data,
  });
  return response.data;
};

const updateStockLocationParent = async (
  token?: string,
  data?: StockLocationUpdateParent
): Promise<any> => {
  const response = await httpClient.put({
    token: token,
    url: `${apiLinks.stockLocation.updateParent}`,
    data: data,
  });
  return response.data;
};

const getLocationWarehouse = async (
  token?: string,
  warehouseId?: string
): Promise<StockLocation[]> => {
  const response = await httpClient.get({
    token: token,
    url: `${apiLinks.stockLocation.getLocationWarehouse}/${warehouseId}`,
  });
  return response.data;
};

const stockLocation = {
  getStockLocations,
  getStockLocationInfo,
  getForSelectParent,
  getForSelect,
  deleteStockLocation,
  getStockQuants,
  updateStockLocation,
  createStockLocation,
  updateStockLocationParent,
  getLocationWarehouse,
};

export default stockLocation;
