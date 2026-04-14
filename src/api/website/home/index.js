import express from "express";
import { home} from "./controller.js";

const router = express.Router();

router.get("/", home);

export { router };
