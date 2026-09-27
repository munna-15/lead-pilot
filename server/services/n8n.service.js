const WORKFLOW_NAMES = [
  "Lead Intake & AI Qualification",
  "Lead Follow-up Automation",
];

const getHeaders = () => {
  const apiKey = process.env.N8N_API_KEY;

  return {
    Accept: "application/json",
    "X-N8N-API-KEY": apiKey,
  };
};

const n8nRequest = async (path) => {
  const baseUrl = process.env.N8N_BASE_URL;
  const apiKey = process.env.N8N_API_KEY;

  console.log("N8N_BASE_URL:", baseUrl || "MISSING");
  console.log("N8N_API_KEY:", apiKey ? "LOADED" : "MISSING");

  if (!baseUrl) {
    throw new Error("N8N_BASE_URL is not configured");
  }

  if (!apiKey) {
    throw new Error("N8N_API_KEY is not configured");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1${path}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      `n8n API ${response.status}: ${message || response.statusText}`,
    );
  }

  return response.json();
};

const getWorkflows = async () => {
  const response = await n8nRequest("/workflows?limit=100");

  console.log("N8N WORKFLOWS RESPONSE:", JSON.stringify(response, null, 2));

  return Array.isArray(response?.data) ? response.data : [];
};

const getWorkflowExecutions = async (workflowId) => {
  const executions = [];
  let cursor = null;

  do {
    const params = new URLSearchParams({
      workflowId,
      limit: "100",
      includeData: "false",
    });

    if (cursor) {
      params.set("cursor", cursor);
    }

    const response = await n8nRequest(`/executions?${params.toString()}`);

    if (Array.isArray(response?.data)) {
      executions.push(...response.data);
    }

    cursor = response?.nextCursor || null;
  } while (cursor);

  return executions;
};

const getExecutionStats = (executions) => {
  const successful = executions.filter(
    (execution) => execution.status === "success",
  ).length;

  const failed = executions.filter(
    (execution) =>
      execution.status === "error" || execution.status === "canceled",
  ).length;

  const running = executions.filter(
    (execution) => execution.status === "running",
  ).length;

  const completed = successful + failed;

  const successRate =
    completed > 0 ? Number(((successful / completed) * 100).toFixed(1)) : 0;

  const sorted = [...executions].sort(
    (a, b) =>
      new Date(b.startedAt || 0).getTime() -
      new Date(a.startedAt || 0).getTime(),
  );

  const latestExecution = sorted[0] || null;

  const todayStart = new Date();

  todayStart.setHours(0, 0, 0, 0);

  const runsToday = executions.filter((execution) => {
    if (!execution.startedAt) {
      return false;
    }

    return new Date(execution.startedAt) >= todayStart;
  }).length;

  return {
    runs: executions.length,
    successful,
    failed,
    running,
    completed,
    successRate,
    runsToday,
    lastRun: latestExecution?.startedAt || null,
    lastStatus: latestExecution?.status || null,
  };
};

export const getAutomationStats = async () => {
  const workflows = await getWorkflows();

  const matchedWorkflows = WORKFLOW_NAMES.map((name) => {
    return workflows.find(
      (workflow) =>
        String(workflow.name).trim().toLowerCase() ===
        name.trim().toLowerCase(),
    );
  }).filter(Boolean);

  const workflowStats = await Promise.all(
    matchedWorkflows.map(async (workflow) => {
      const executions = await getWorkflowExecutions(workflow.id);

      const stats = getExecutionStats(executions);

      return {
        id: workflow.id,
        name: workflow.name,
        active: Boolean(workflow.active),
        createdAt: workflow.createdAt || null,
        updatedAt: workflow.updatedAt || null,
        ...stats,
      };
    }),
  );

  const totalRuns = workflowStats.reduce(
    (total, workflow) => total + workflow.runs,
    0,
  );

  const successfulRuns = workflowStats.reduce(
    (total, workflow) => total + workflow.successful,
    0,
  );

  const failedRuns = workflowStats.reduce(
    (total, workflow) => total + workflow.failed,
    0,
  );

  const activeWorkflows = workflowStats.filter(
    (workflow) => workflow.active,
  ).length;

  const completedRuns = successfulRuns + failedRuns;

  const successRate =
    completedRuns > 0
      ? Number(((successfulRuns / completedRuns) * 100).toFixed(1))
      : 0;

  const runsToday = workflowStats.reduce(
    (total, workflow) => total + workflow.runsToday,
    0,
  );

  return {
    totalWorkflows: workflowStats.length,
    activeWorkflows,
    totalRuns,
    successfulRuns,
    failedRuns,
    successRate,
    runsToday,
    workflows: workflowStats,
  };
};
