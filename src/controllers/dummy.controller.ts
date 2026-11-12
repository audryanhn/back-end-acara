import { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    res
      .status(200)
      .json({
        status: "200 - success",
        message: "dummy response - test change",
      });
  },
};
