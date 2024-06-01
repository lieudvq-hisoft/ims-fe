import moment from "moment";
import { dateAdvFormat } from "./constants";
import dayjs from "dayjs";

export const isExpiredTimeToken = (loginDate: string, exp: number): boolean => {
  const tokenExpiredTime = moment(loginDate).add(exp, "minute").toDate();
  const currentDate = moment().toDate();
  return tokenExpiredTime > currentDate;
};

export const convertDatePicker = (date: string) => {
  return dayjs(moment(date).format(dateAdvFormat), dateAdvFormat);
};

export const customJsonParse = (jsonString: string) => {
  return JSON.parse(jsonString, (key, value) => {
    if (typeof key === "string") {
      return key.charAt(0).toLowerCase() + key.slice(1);
    }
    return value;
  });
};

export const parseJwt = (token) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  return JSON.parse(window.atob(base64));
};

export const areInArray = (arr: any[], ...elements: any[]) => {
  for (let element of elements) {
    if (arr?.includes(element)) {
      return true;
    }
  }
  return false;
};

export const formatDate = (inputDate: string | undefined) => {
  if (!inputDate) {
    return "(Chưa cập nhập)";
  }

  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateTimeToVnFormat = (inputString: string): string => {
  const date = new Date(inputString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const padZero = (num: number) => num.toString().padStart(2, "0");

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
};

export const getColorByStatus = (status: string): string => {
  switch (status) {
    case "Pending":
    case "OnGoing":
      return "bg-blue-200 text-blue-900";
    case "Public":
    case "New":
    case "Arrived":
      return "bg-violet-200 text-violet-900";
    case "Processing":
    case "InProcess":
      return "bg-yellow-200 text-yellow-900";
    case "Done":
    case "Active":
    case "Solved":
    case "Accept":
    case "Complete":
      return "bg-green-200 text-green-900";
    case "Expired":
    case "CantSolved":
      return "bg-red-200 text-red-900";
    case "End":
      return "bg-gray-200 text-gray-900";
    case "Rejected":
    case "Cancel":
      return "bg-red-200 text-red-900";
    case "CheckIn":
    case "CheckOut":
    case "PayBooking":
      return "bg-orange-200 text-orange-900";
    default:
      return "bg-orange-200 text-orange-900";
  }
};

export const splitString = (inputString: string): string => {
  if (inputString === null) {
    return "";
  }

  if (inputString.length > 60) {
    return inputString.substring(0, 60) + "...";
  } else {
    return inputString;
  }
};

export const truncateString = (input: string, maxLength: number): string => {
  if (input?.length > maxLength) {
    return `${input?.substring(0, maxLength)}...`;
  }
  return input;
};

export const getEmergencyTypeName = (type: number): string => {
  switch (type) {
    case 0:
      return "Chat";
    case 1:
      return "Call";
    case 2:
      return "Police";
    default:
      return "Unknown emergency type";
  }
};

export const removeHyphens = (str: string): string => {
  return str.replace(/-/g, "");
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};
