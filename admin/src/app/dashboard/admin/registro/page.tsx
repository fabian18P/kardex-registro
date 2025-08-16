"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function AdminRegistro() {
  useRoleGuard(["admin"]);

  return (
    <div>
      <h1>Registro</h1>
      
    </div>
  );
}