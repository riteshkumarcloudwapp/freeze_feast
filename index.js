import express from "express";
import config from "./src/common/config/envConfig.js";
import { sequelize, DATABASE_URL } from "./src/config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import flashMessages from "./src/common/middleware/flashMessages.js";

const app = express();

//express-method middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

//ejs config
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

//template config
app.use("/templates", express.static(path.join(process.cwd(), "src/templates")));

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
app.use(flashMessages);


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

// ADD THIS HERE (VERY IMPORTANT)
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


//..................WEBSITE ROUTE................................

//USER
//dashboard
import { router as homeRoutes } from "./src/api/website/home/index.js";
app.use("/freeze-feast", homeRoutes);

//category
import {router as categoryRoutes} from "./src/api/website/category/index.js"
app.use("/freeze-feast", categoryRoutes);

//about
import {router as aboutRoutes} from "./src/api/website/about/index.js"
app.use("/freeze-feast",aboutRoutes);

//contact
import {router as contactRoutes} from "./src/api/website/contact/index.js"
app.use("/freeze-feast",contactRoutes);

//cart
import {router as cartRoutes} from "./src/api/website/cart/index.js"
app.use("/freeze-feast",cartRoutes);

//user_auth
import { router as websiteRoutes } from "./src/api/website/user_auth/index.js";
app.use("/freeze-feast", websiteRoutes);

//user
import {router as userRoutes} from "./src/api/website/user/index.js";
app.use("/freeze-feast",userRoutes);







app.listen(config.PORT, (req, res) => {
  console.log(`Server listening on: http://${config.HOST}:${config.PORT}`);
});
