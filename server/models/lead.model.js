import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    businessType: {
      type: String,
      trim: true,
      default: "",
    },

    budget: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    service: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    leadScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    status: {
      type: String,
      enum: ["HOT", "WARM", "COLD"],
      default: "COLD",
      index: true,
    },

    urgency: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "LOW",
      index: true,
    },

    leadStage: {
      type: String,
      enum: ["new", "contacted", "nurture"],
      default: "new",
      index: true,
    },

    source: {
      type: String,
      trim: true,
      default: "Manual",
      index: true,
    },

    summary: {
      type: String,
      trim: true,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    followUpAt: {
      type: Date,
      default: null,
      index: true,
    },

    lastContactedAt: {
      type: Date,
      default: null,
    },

    followUpCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastFollowUpType: {
      type: String,
      enum: ["initial", "reminder_1", "reminder_2", null],
      default: null,
    },

    nextFollowUpAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    collection: "leads",
    timestamps: false,
    versionKey: false,
  },
);

leadSchema.index({ leadStage: 1, followUpAt: 1 });
leadSchema.index({ leadStage: 1, nextFollowUpAt: 1 });
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ service: 1, createdAt: -1 });

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
