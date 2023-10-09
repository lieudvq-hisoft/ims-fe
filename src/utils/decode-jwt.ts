import jwt from 'jsonwebtoken';

export const decodeJwt = (token : string) => {
    return jwt.decode(token);
};
