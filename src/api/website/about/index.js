import express from "express";
import { about} from "./controller.js";

const router = express.Router();

router.get("/about", about);

export { router };
