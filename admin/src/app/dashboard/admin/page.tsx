"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminDashboard() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <h1>Panel Admin</h1>
      {/* contenido */}
    </div>
  );
}