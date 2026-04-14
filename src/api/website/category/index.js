import express from "express";
import { category} from "./controller.js";

const router = express.Router();

router.get("/category", category);

export { router };