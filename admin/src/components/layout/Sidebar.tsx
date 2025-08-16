"use client";
import Link from "next/link";
import { ButtonSidebar } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
   const { user} = useAuth(); 
  return (
    <div className="min-h-screen w-16 md:w-full bg-[#311800] transition-all duration-100">
      <ul className="text-[#D9D9D9]">
        {user && (
          <>
            <Link href="/dashboard/admin">
              <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
                <img className="w-10 min-w-5" src="/logo.svg" alt="" />
                <p className="hidden md:block text-2xl font-bold">CIGA SAC</p>
              </div>
            </Link>
            <hr className="ml-2 mr-2 shadow-md text-[#EFA52F]"/>
            <Link href="/all-appointments">
              <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
                <img className="w-10 min-w-5" src="/logo.svg" alt="" />
                <p className="hidden text-xs md:block">{`${user.primer_nombre.toUpperCase()}`} {`${user.apellido_paterno.toUpperCase()}`}</p>
              </div>
            </Link>
            <hr className="ml-2 mr-2 text-[#EFA52F]"/>
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/dashboard`} icon="/iconPanel/dashboard.svg" text="Dashboard" />
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/usuario`} icon="/iconPanel/usuario.svg" text="Usuarios" />
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/registro`} icon="/iconPanel/registro.svg" text="Registro" />
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/gallina`} icon="/iconPanel/gallina.svg" text="Gallinas" />
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/consumo`} icon="/iconPanel/consumo.svg" text="Consumo" />
            <ButtonSidebar href={`/dashboard/${user.rol_nombre}/galpon`} icon="/iconPanel/galpon.svg" text="Galpon" />
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;