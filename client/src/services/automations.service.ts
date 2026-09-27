import api from "./api";

export interface AutomationWorkflow {
  id: string;
  name: string;
  active: boolean;

  createdAt: string | null;
  updatedAt: string | null;

  runs: number;
  successful: number;
  failed: number;
  running: number;
  completed: number;

  successRate: number;
  runsToday: number;

  lastRun: string | null;
  lastStatus: string | null;
}

export interface AutomationStats {
  totalWorkflows: number;
  activeWorkflows: number;

  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;

  successRate: number;
  runsToday: number;

  workflows: AutomationWorkflow[];
}

interface AutomationResponse {
  success: boolean;
  data: AutomationStats;
  message?: string;
}

export const getAutomationStats = async (): Promise<AutomationStats> => {
  const response = await api.get<AutomationResponse>("/automations");


return response.data.data;

};
