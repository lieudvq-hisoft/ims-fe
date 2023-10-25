export interface LoginResponse {
  access_token: string;
  token_type: string;
  userID: string;
  expires_in: number;
  userName: string;
  phoneNumber?: string;
  userAva: string;
  currentNoticeCount: 0;
}

export interface User {
  id: string;
  phoneNumber: string;
  userName: string;
  fullname: string;
  email: string;
  password: string;
  address: string
}