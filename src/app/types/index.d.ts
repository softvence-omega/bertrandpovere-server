import { JwtPayloadType } from "../utils/JWT";



declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadType;
        }
    }
}


export type TNotification = {
    message: string;
    slug?:string;
    status:"READ" | "UNREAD";
    _id?:string
    createdAt?:string
    updatedAt?:string
}
