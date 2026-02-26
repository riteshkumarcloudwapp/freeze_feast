import express from "express";
import config from "./src/common/config/envConfig.js";
import { sequelize, DATABASE_URL } from "./src/config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app = express();

//express-method middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

//ejs config
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

//database connection
try {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
  console.log("Connected URL:", DATABASE_URL);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

//...............WEBSITE ROUTE................................

//user_auth
import { router as websiteRoutes } from "./src/api/website/user_auth/index.js";
app.use("/freeze-feast", websiteRoutes);

app.listen(config.PORT, (req, res) => {
  console.log(`Server listening on: http://${config.HOST}:${config.PORT}`);
});
