import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  profilePicture: string;
  activationCode: string;
  createdAt: string;
}

export interface IUserToken extends Omit<
  IUser,
  | "fullName"
  | "username"
  | "email"
  | "password"
  | "activationCode"
  | "profilePicture"
  | "isActive"
  | "createdAt"
> {
  id?: Types.ObjectId;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface ISendMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}
