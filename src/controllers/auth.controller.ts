import { Request, Response } from "express";
import { TRegister } from "../types/types";

export default {
  register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;
  },
};
