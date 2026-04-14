import express from "express";
import { cart} from "./controller.js";

const router = express.Router();

router.get("/cart", cart);

export { router };
