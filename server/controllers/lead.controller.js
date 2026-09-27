import Lead from "../models/lead.model.js";

const normalizeLead = (lead) => ({
  id: lead.leadId,
  name: lead.name,
  company: lead.company,
  email: lead.email,
  phone: lead.phone,
  businessType: lead.businessType || "",
  budget: lead.budget || "",
  service: lead.service,
  message: lead.message || "",

  score: lead.leadScore,
  status: lead.status,
  urgency: lead.urgency,

  stage:
    lead.leadStage === "contacted"
      ? "Contacted"
      : lead.leadStage === "nurture"
        ? "Nurture"
        : "New",

  source: lead.source,
  summary: lead.summary || "",
  createdAt: lead.createdAt,

  followUp:
    lead.nextFollowUpAt || lead.followUpAt ? "Scheduled" : "Not scheduled",

  followUpAt: lead.followUpAt || null,
  lastContactedAt: lead.lastContactedAt || null,
  followUpCount: lead.followUpCount || 0,
  lastFollowUpType: lead.lastFollowUpType || null,
  nextFollowUpAt: lead.nextFollowUpAt || null,

  nextAction:
    lead.lastFollowUpType === "initial"
      ? "Initial follow-up"
      : lead.lastFollowUpType === "reminder_1"
        ? "Reminder follow-up"
        : lead.lastFollowUpType === "reminder_2"
          ? "Final reminder"
          : lead.leadStage === "nurture"
            ? "Nurture follow-up"
            : "Initial follow-up",
});

const isValidLead = (lead) => {
  return Boolean(
    lead?.leadId &&
    typeof lead.leadId === "string" &&
    lead.name &&
    typeof lead.name === "string" &&
    lead.email &&
    typeof lead.email === "string" &&
    lead.phone &&
    typeof lead.phone === "string" &&
    lead.company &&
    typeof lead.company === "string" &&
    lead.service &&
    typeof lead.service === "string" &&
    lead.createdAt &&
    !Number.isNaN(new Date(lead.createdAt).getTime()),
  );
};

const generateLeadId = () => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `LEAD-${timestamp}-${randomPart}`;
};

const triggerLeadIntakeWorkflow = async (lead) => {
  const webhookUrl = process.env.N8N_LEAD_INTAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_LEAD_INTAKE_WEBHOOK_URL is not configured");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId: lead.leadId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        businessType: lead.businessType,
        budget: lead.budget,
        service: lead.service,
        message: lead.message,
        source: lead.source,
        createdAt: lead.createdAt,
      }),
    });

    if (!response.ok) {
      console.error(
        `n8n lead intake failed: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("n8n lead intake trigger error:", error);
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    const validLeads = leads.filter(isValidLead);

    res.status(200).json({
      success: true,
      count: validLeads.length,
      data: validLeads.map(normalizeLead),
    });
  } catch (error) {
    console.error("Get leads error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      leadId: req.params.id,
    }).lean();

    if (!lead || !isValidLead(lead)) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: normalizeLead(lead),
    });
  } catch (error) {
    console.error("Get lead by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};

export const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      businessType,
      budget,
      service,
      message,
    } = req.body;

    if (!name || !email || !phone || !company || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, company, and service are required",
      });
    }

    const normalizedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPhone = String(phone).trim();
    const normalizedCompany = String(company).trim();
    const normalizedService = String(service).trim();

    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedPhone ||
      !normalizedCompany ||
      !normalizedService
    ) {
      return res.status(400).json({
        success: false,
        message: "Required lead fields cannot be empty",
      });
    }

    const lead = await Lead.create({
      leadId: generateLeadId(),
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      company: normalizedCompany,
      businessType: businessType ? String(businessType).trim() : "",
      budget: budget ? String(budget).trim() : "",
      service: normalizedService,
      message: message ? String(message).trim() : "",

      leadScore: 0,
      status: "COLD",
      urgency: "LOW",
      leadStage: "new",
      source: "Manual",
      summary: "",

      followUpAt: null,
      lastContactedAt: null,
      followUpCount: 0,
      lastFollowUpType: null,
      nextFollowUpAt: null,
    });

    const leadData = lead.toObject();

    triggerLeadIntakeWorkflow(leadData);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: normalizeLead(leadData),
    });
  } catch (error) {
    console.error("Create lead error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A lead with this identifier already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};
