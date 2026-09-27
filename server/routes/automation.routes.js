import express from "express";

import { getAutomationStatsController } from "../controllers/automation.controller.js";

const router = express.Router();

router.get("/", getAutomationStatsController);

export default router;
