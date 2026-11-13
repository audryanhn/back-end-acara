import { Request, Response } from "express";
import { TRegister } from "../utils/types";
import { registerValidateSchema } from "../utils/validation";
import response from "../utils/response";

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
      response.success(res, "Registration Success", {
        fullName,
        username,
        email,
      });
    } catch (error) {
      const err = error as unknown as Error;
      response.badRequest(res, err.message);
    }
  },
};
