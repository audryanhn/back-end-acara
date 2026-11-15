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
> {
  id?: Types.ObjectId;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}
