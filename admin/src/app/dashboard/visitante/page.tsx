"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function VisitanteDashboard() {
  useRoleGuard(["visitante"]);

  return (
    <div>
      <h1>Panel Visitante</h1>
      {/* contenido */}
    </div>
  );
}