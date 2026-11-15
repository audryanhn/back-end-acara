import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { IReqUser } from "../utils/interfaces";
import { generateToken } from "../utils/jwt";
import response from "../utils/response";
import { TRegister } from "../utils/types";
import { registerValidateSchema } from "../utils/validation";

export default {
  async register(req: Request, res: Response) {
    try {
      const { fullName, username, email, password, confirmPassword } =
        req.body as unknown as TRegister;
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      response.success(res, "Registration Success", result);
    } catch (error) {
      const err = error as unknown as Error;
      response.badRequest(res, err.message);
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body;

    try {
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
      if (!userByIdentifier) {
        response.badRequest(res, "User Not Found");
        return;
      }
      const validatePassword = encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        response.badRequest(res, "Wrong Password, Try Again");
        return;
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, "Login Successfull", token);
    } catch (error) {
      const err = error as unknown as Error;
      response.badRequest(res, err.message);
    }
  },

  async me(req: IReqUser, res: Response) {
    const user = req.user;

    try {
      const result = await UserModel.findById(user?.id);

      if (!result) {
        response.notFound(res, "User Not Found");
      }

      response.success(res, "Get User Info - Success", result);
    } catch (error) {
      const err = error as unknown as Error;

      response.badRequest(res, err.message);
    }
  },
};
