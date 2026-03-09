import express from "express";
import config from "./src/common/config/envConfig.js";
import { sequelize, DATABASE_URL } from "./src/config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import flash from "connect-flash";

const app = express();

//express-method middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

//ejs config
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

//session config
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // VERY IMPORTANT for localhost //flash will not work if true.
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  }),
);

//connect flash config
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

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

//..................WEBSITE ROUTE................................

//user_auth
import { router as websiteRoutes } from "./src/api/website/user_auth/index.js";
app.use("/freeze-feast", websiteRoutes);

//dashboard
import { router as dashboardRoutes } from "./src/api/website/dashboard/index.js";
app.use("/freeze-feast", dashboardRoutes);

app.listen(config.PORT, (req, res) => {
  console.log(`Server listening on: http://${config.HOST}:${config.PORT}`);
});
