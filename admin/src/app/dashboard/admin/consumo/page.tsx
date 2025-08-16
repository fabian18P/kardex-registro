"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminConsumo() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <h1>Consumo</h1>
      {/* contenido */}
    </div>
  );
}