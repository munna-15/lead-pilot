
import api from "./api";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;

  businessType: string;
  budget: string;
  service: string;
  message: string;

  score: number;
  status: "HOT" | "WARM" | "COLD";
  urgency: "HIGH" | "MEDIUM" | "LOW";

  stage: "New" | "Contacted" | "Nurture";

  source: string;
  summary: string;
  createdAt: string;

  followUp: string;
  followUpAt: string | null;
  lastContactedAt: string | null;
  followUpCount: number;
  lastFollowUpType:
    | "initial"
    | "reminder_1"
    | "reminder_2"
    | null;
  nextFollowUpAt: string | null;

  nextAction: string;
}

interface LeadsResponse {
  success: boolean;
  count: number;
  data: Lead[];
  message?: string;
}

interface LeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType?: string;
  budget?: string;
  service: string;
  message?: string;
}

export const getLeads = async (): Promise<LeadsResponse> => {
  const response = await api.get<LeadsResponse>("/leads");
  return response.data;
};

export const getLeadById = async (id: string): Promise<LeadResponse> => {
  const response = await api.get<LeadResponse>(`/leads/${id}`);
  return response.data;
};

export const createLead = async (
  payload: CreateLeadPayload,
): Promise<LeadResponse> => {
  const response = await api.post<LeadResponse>("/leads", payload);
  return response.data;
};

