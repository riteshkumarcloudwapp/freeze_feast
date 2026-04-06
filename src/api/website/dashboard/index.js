import express from "express";
import { category, about } from "./controller.js";

const router = express.Router();

router.get("/product-list", category);

router.get("/about", about);

export { router };
