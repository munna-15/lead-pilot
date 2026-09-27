"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07080A] text-[#F1F5F9]">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <section className="min-w-0 lg:ml-[248px]">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <div>{children}</div>
      </section>
    </main>
  );
}
