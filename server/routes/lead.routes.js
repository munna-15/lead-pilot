import express from "express";

import {
  createLead,
  getLeadById,
  getLeads,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);

export default router;
