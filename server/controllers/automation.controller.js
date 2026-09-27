import { getAutomationStats } from "../services/n8n.service.js";

export const getAutomationStatsController = async (req, res) => {
  try {
    const data = await getAutomationStats();

res.status(200).json({
  success: true,
  data,
});

  } catch (error) {
    console.error("Get automation stats error:", error);


res.status(500).json({
  success: false,
  message:
    error instanceof Error
      ? error.message
      : "Failed to fetch automation statistics",
});

  }
};
