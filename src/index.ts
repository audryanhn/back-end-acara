import express from "express";
import router from "./routes/routes";
import bodyParser from "body-parser";
import connect from "./utils/database";

const app = express();
const PORT = 3000;

async function init() {
  try {
    const result = await connect();
    app.use(bodyParser.json());

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
