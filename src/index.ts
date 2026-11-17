import bodyParser from "body-parser";
import express from "express";
import router from "./routes/api";
import connect from "./utils/database";
import response from "./utils/response";
import docs from "./docs/route";
import cors from "cors";

const app = express();
const PORT = 3000;

async function init() {
  try {
    const result = await connect();
    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      response.success(res, "Server is running", null);
      return;
    });

    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });

    console.log("Database status : ", result);
  } catch (error) {
    console.log(error);
  }
}

init();
