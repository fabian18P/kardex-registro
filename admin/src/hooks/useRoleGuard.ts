"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRoleGuard(allowedRoles: string[]) {
  const { user, loading } = useAuth(); // Añadimos el estado de 'loading'
  const router = useRouter();

  useEffect(() => {
    // No hacer nada si el estado de carga no ha terminado
    if (loading) return;

    // Si no hay usuario, redirige al login
    if (user === null) {
      router.replace("/auth/login");
      return;
    }

    // Si el usuario no tiene el rol permitido, redirige a su dashboard
    if (!allowedRoles.includes(user.rol_nombre)) {
      switch (user.rol_nombre) {
        case "admin":
          router.replace("/dashboard/admin");
          break;
        case "operario":
          router.replace("/dashboard/operario");
          break;
        case "visitante":
          router.replace("/dashboard/visitante");
          break;
        default:
          router.replace("/");
          break;
      }
    }
  }, [user, allowedRoles, router, loading]); // Asegúrate de incluir 'loading' en las dependencias
}