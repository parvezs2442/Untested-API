import express from "express";
import { getHealth, getReleases } from "../controllers/packageController.js";

const router = express.Router();

router.get("/health/:name/:version", getHealth);
router.get("/releases/:name", getReleases);

export default router;