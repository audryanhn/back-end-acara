import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
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

      response.success(res, "Login Successfull", userByIdentifier);
    } catch (error) {
      const err = error as unknown as Error;
      response.badRequest(res, err.message);
    }
  },
};
