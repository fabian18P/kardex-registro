"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminGalpon() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <h1>Galpon</h1>
      {/* contenido */}
    </div>
  );
}