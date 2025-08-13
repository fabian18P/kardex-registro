"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRoleGuard(allowedRoles: string[]) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // No hay usuario, redirigir a login
      router.push("");
      return;
    }

    if (!allowedRoles.includes(user.rol_nombre)) {
      // Usuario sin permiso, redirigir a su dashboard según rol
      switch (user.rol_nombre) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "operario":
          router.push("/dashboard/operario");
          break;
        case "visitante":
          router.push("/dashboard/visitante");
          break;
        default:
          router.push("auth/login");
          break;
      }
    }
  }, [user, allowedRoles, router]);
}