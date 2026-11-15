import { NextFunction, Request, Response } from "express";
import { IReqUser } from "../utils/interfaces";
import { getUserData } from "../utils/jwt";
import response from "../utils/response";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers?.authorization;

    if (!authorization) {
      response.forbidden(res, "You are not authorized");
      return;
    }

    const [prefix, accessToken] = authorization.split(" ");

    if (!(prefix === "Bearer" && accessToken)) {
      response.unauthorized(res, "Wrong auth method or expired accessToken");
      return;
    }

    const user = getUserData(accessToken);

    if (!user) {
      response.unauthorized(res, "No User Found, Try to login First");
      return;
    }

    (req as IReqUser).user = user;

    next();
  } catch (error) {
    const err = error as unknown as Error;
    response.forbidden(res, err.message);
  }
};
