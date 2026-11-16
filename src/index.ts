import bodyParser from "body-parser";
import express from "express";
import router from "./routes/routes";
import connect from "./utils/database";
import response from "./utils/response";

const app = express();
const PORT = 3000;

async function init() {
  try {
    const result = await connect();
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      response.success(res, "Server is running", null);
      return;
    });

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });

    console.log("Database status : ", result);
  } catch (error) {
    console.log(error);
  }
}

init();
