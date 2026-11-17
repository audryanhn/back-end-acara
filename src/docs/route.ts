import express, { Express } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

export default function docs(app: Express) {
  // const css = fs.readFileSync(
  //   path.resolve(
  //     __dirname,
  //     "../../node_modules/swagger-ui-dist/swagger-ui.css"
  //   ),
  //   "utf-8"
  // );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

  app.use(
    "/api-docs",
    express.static(path.join(__dirname, "../../node_modules/swagger-ui-dist")),
  );
}
