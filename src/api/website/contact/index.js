import express from "express";
import { contact} from "./controller.js";

const router = express.Router();

router.get("/contact", contact);
router.post("/contact",contact);

export { router };
