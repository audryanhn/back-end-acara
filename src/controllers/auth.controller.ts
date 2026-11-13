import { Request, Response } from "express";
import { TRegister } from "../utils/types";
import { registerValidateSchema } from "../utils/validation";
import response from "../utils/response";
import UserModel from "../models/user.model";

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
};
