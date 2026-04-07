import express from "express";
import { category, about, contact } from "./controller.js";

const router = express.Router();

router.get("/product-list", category);

router.get("/about", about);

router.get("/contact", contact);

export { router };
