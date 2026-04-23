import express from "express";
import { userLogin, dashboard, registerUser, forgetPassword, changePassword } from "./controller.js";

const router = express.Router();

//dashboard
router.get("/dashboard", dashboard);
//login
router.get("/login", userLogin);
router.post("/login", userLogin);
//register
router.get("/register", registerUser);
router.post("/register", registerUser);
//forgetPassword
router.get("/forgot",forgetPassword);
router.post("/forgot",forgetPassword);
//changePassword
router.get("/change-password", (req, res) => {
  const { token } = req.query;
console.log("QUERY TOKEN:", token); 
  if (!token) {
    return res.send("Invalid token");
  }

  res.render("website/pages/resetPassword", { token });
});

router.post("/change-password/:token",changePassword);


export { router };
