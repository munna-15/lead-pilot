"use client";

import { useState } from "react";

import {
  Building2,
  LoaderCircle,
  Mail,
  MessageSquare,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { createLead } from "@/services/leads.service";

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onLeadCreated: () => void | Promise<void>;
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  budget: "",
  service: "",
  message: "",
};

export default function AddLeadModal({
  open,
  onClose,
  onLeadCreated,
}: AddLeadModalProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  function handleChange(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        businessType: form.businessType.trim(),
        budget: form.budget.trim(),
        service: form.service.trim(),
        message: form.message.trim(),
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to create lead");
      }

      setForm(initialForm);

      await onLeadCreated();
    } catch (error: unknown) {
      console.error("Create lead error:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        };

        setError(
          axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to create lead. Please try again.",
        );

        return;
      }

      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("Failed to create lead. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) {
      return;
    }

    setForm(initialForm);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#1B222C] bg-[#0D1014] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-[#1B222C] px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#64748B]">
              Lead management
            </p>

            <h2 className="mt-1.5 font-[var(--font-space-grotesk)] text-xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              Add new lead
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Create a lead manually for qualification and follow-up.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#0A0C0F] text-[#64748B] transition-colors duration-200 hover:border-[#283341] hover:text-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Contact information
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Name
                  </label>

                  <div className="relative">
                    <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />

                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        handleChange("name", event.target.value)
                      }
                      placeholder="Daniel Ahmed"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        handleChange("email", event.target.value)
                      }
                      placeholder="daniel@company.com"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Phone
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        handleChange("phone", event.target.value)
                      }
                      placeholder="+880 1712-000000"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Company
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />

                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) =>
                        handleChange("company", event.target.value)
                      }
                      placeholder="Nova Labs"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Project information
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Business type
                  </label>

                  <input
                    type="text"
                    value={form.businessType}
                    onChange={(event) =>
                      handleChange("businessType", event.target.value)
                    }
                    placeholder="SaaS, Restaurant, Agency..."
                    disabled={loading}
                    className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Budget
                  </label>

                  <input
                    type="text"
                    value={form.budget}
                    onChange={(event) =>
                      handleChange("budget", event.target.value)
                    }
                    placeholder="৳50,000 - ৳100,000"
                    disabled={loading}
                    className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Service
                  </label>

                  <select
                    value={form.service}
                    onChange={(event) =>
                      handleChange("service", event.target.value)
                    }
                    required
                    disabled={loading}
                    className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-4 text-sm text-[#F1F5F9] outline-none transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="" className="bg-[#0D1014]">
                      Select a service
                    </option>

                    <option value="Web Development" className="bg-[#0D1014]">
                      Web Development
                    </option>

                    <option
                      value="Software Development"
                      className="bg-[#0D1014]"
                    >
                      Software Development
                    </option>

                    <option value="AI Automation" className="bg-[#0D1014]">
                      AI Automation
                    </option>

                    <option value="UI/UX Design" className="bg-[#0D1014]">
                      UI/UX Design
                    </option>

                    <option value="Digital Solutions" className="bg-[#0D1014]">
                      Digital Solutions
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#CBD5E1]">
                    Project details
                  </label>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-[#475569]" />

                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        handleChange("message", event.target.value)
                      }
                      placeholder="Describe what the client needs..."
                      rows={5}
                      disabled={loading}
                      className="w-full resize-none rounded-xl border border-[#1B222C] bg-[#0A0C0F] py-3 pl-10 pr-4 text-sm leading-6 text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#1B222C] px-6 py-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-11 rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-5 text-sm font-medium text-[#94A3B8] transition-colors duration-200 hover:border-[#283341] hover:text-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#38BDF8] px-5 text-sm font-semibold text-[#061014] transition-colors duration-200 hover:bg-[#7DD3FC] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create lead"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
