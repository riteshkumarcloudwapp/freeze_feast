import express from "express";
import { userProfile } from "./controller.js";
import createMulter from "../../../utils/multer.js";

const router = express.Router();
const upload = createMulter("profile_picture");

//user profile
router.get("/profile",userProfile);
router.post("/profile", upload.single("profile_picture"), userProfile);

export { router };
