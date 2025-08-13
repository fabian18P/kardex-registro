"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function OperarioDashboard() {
  useRoleGuard(["operario"]);

  return (
    <div>
      <h1>Panel Operario</h1>
      {/* contenido */}
    </div>
  );
}