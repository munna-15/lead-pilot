export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  score: number;
  status: "HOT" | "WARM" | "COLD";
  urgency: "HIGH" | "MEDIUM" | "LOW";
  stage: "New" | "Contacted" | "Nurture";
  source: string;
  summary: string;
  createdAt: string;
  followUp: string;
  nextAction: string;
}

export const leads: Lead[] = [
  {
    id: "LEAD-001",
    name: "Daniel Ahmed",
    company: "Nova Labs",
    email: "daniel@novalabs.com",
    phone: "+880 1712-000001",
    service: "Web Development",
    score: 92,
    status: "HOT",
    urgency: "HIGH",
    stage: "New",
    source: "Website",
    summary:
      "Daniel is interested in building a modern web platform for Nova Labs. The request appears to have a high business priority and requires a full web development solution.",
    createdAt: "September 22, 2026",
    followUp: "Scheduled",
    nextAction: "Initial follow-up",
  },
  {
    id: "LEAD-002",
    name: "Omar Rahman",
    company: "Global Foods",
    email: "omar@globalfoods.com",
    phone: "+880 1712-000002",
    service: "Software Development",
    score: 78,
    status: "WARM",
    urgency: "MEDIUM",
    stage: "Contacted",
    source: "Website",
    summary:
      "Omar is exploring a software solution for Global Foods and has already been contacted by the team.",
    createdAt: "September 21, 2026",
    followUp: "Scheduled",
    nextAction: "Reminder follow-up",
  },
  {
    id: "LEAD-003",
    name: "Sara Karim",
    company: "Studio North",
    email: "sara@studionorth.com",
    phone: "+880 1712-000003",
    service: "UI/UX Design",
    score: 64,
    status: "WARM",
    urgency: "MEDIUM",
    stage: "Contacted",
    source: "Website",
    summary:
      "Sara is interested in a UI/UX design engagement for Studio North and is currently in the contacted stage.",
    createdAt: "September 20, 2026",
    followUp: "Scheduled",
    nextAction: "Reminder follow-up",
  },
  {
    id: "LEAD-004",
    name: "Imran Hossain",
    company: "Vertex Systems",
    email: "imran@vertexsystems.com",
    phone: "+880 1712-000004",
    service: "AI Automation",
    score: 41,
    status: "COLD",
    urgency: "LOW",
    stage: "Nurture",
    source: "Website",
    summary:
      "Imran showed early interest in AI automation but currently has lower buying urgency.",
    createdAt: "September 19, 2026",
    followUp: "Scheduled",
    nextAction: "Nurture follow-up",
  },
];
