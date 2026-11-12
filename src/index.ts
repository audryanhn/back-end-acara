import express from "express";
import router from "./routes/routes";

const api = express();

const PORT = 3000;

api.use("/api", router);

api.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
