"use client";
import { LabelPanelTitle } from "@/components/ui";
import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminDashboard() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <LabelPanelTitle>Dashboard</LabelPanelTitle>
    </div>
  );
}