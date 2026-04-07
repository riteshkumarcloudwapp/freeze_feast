import express from "express";
import { userLogin, dashboard, registerUser, forgetPassword } from "./controller.js";

const router = express.Router();

//dashboard
router.get("/dashboard", dashboard);
//login
router.get("/login", userLogin);
router.post("/login", userLogin);
//register
router.get("/register", registerUser);
router.post("/register", registerUser);
//forget
router.get("/forgot",forgetPassword);
router.post("/forgot",forgetPassword);

export { router };
