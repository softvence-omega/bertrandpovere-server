import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (payload: object, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn,
    } as SignOptions);

    return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
    generateToken,
    verifyToken,
};
export type JwtPayloadType = JwtPayload & {
    email: string;
    role: string;
    iat: number;
    exp: number;
    userId?: Types.ObjectId;
};
export type JwtTokenType = string | JwtPayloadType | null;