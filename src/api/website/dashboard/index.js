import express from "express";
import { home, category, about, contact, cart } from "./controller.js";

const router = express.Router();

router.get("/index", home);

router.get("/product-list", category);

router.get("/about", about);

router.get("/contact", contact);

router.get("/cart.html", cart);

export { router };
