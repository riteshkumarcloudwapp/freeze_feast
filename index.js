import express from "express";
import { config } from "./src/config/envConfig.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(config.PORT, (req, res) => {
  console.log(`Server listning on: https://${config.HOST}:${config.PORT}`);
});
