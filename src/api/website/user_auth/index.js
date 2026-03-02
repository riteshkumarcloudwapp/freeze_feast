import express from "express";
import { userLogin, dashboard, registerUser } from "./controller.js";

const router = express.Router();

//dashboard
router.get("/dashboard", dashboard);
//login
router.get("/login", userLogin);
router.post("/login", userLogin);
//register
router.get("/register", registerUser);
router.post("/register", registerUser);

export { router };
