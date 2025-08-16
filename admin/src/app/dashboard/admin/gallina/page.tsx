"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminGallina() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <h1>Gallina</h1>
      {/* contenido */}
    </div>
  );
}