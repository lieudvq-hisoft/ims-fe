import moment from "moment";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD HH:mm:ss";

export const isExpiredTimeToken = (loginDate: string, exp: number): boolean => {    
    const tokenExpiredTime = moment(loginDate).add(exp, "seconds").toDate();
    const currentDate = moment().toDate();
    return tokenExpiredTime > currentDate;
};

export const convertDatePicker = (date: string) => {
    return dayjs(moment(date).format(dateFormat), dateFormat);
};