import Link from "next/link";
import { ButtonSidebar } from "@/components/ui";

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-[#311800]">
      <ul className="text-[#D9D9D9]">
        <Link href="/admin-dashboard">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden md:block text-2xl font-bold">CIGA SAC</p>
          </div>
        </Link>
        <hr className="ml-2 mr-2 shadow-md text-[#EFA52F]"/>
        <Link href="/all-appointments">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden text-xs md:block">Nombre de la persona</p>
          </div>
        </Link>
        <hr className="ml-2 mr-2 text-[#EFA52F]"/>

        <ButtonSidebar href="/dashboard" icon="/iconPanel/dashboard.svg" text="Dashboard" />
        <ButtonSidebar href="/usuario" icon="/iconPanel/usuario.svg" text="Usuarios" />
        <ButtonSidebar href="/registro" icon="/iconPanel/registro.svg" text="Registro" />
        <ButtonSidebar href="/gallina" icon="/iconPanel/gallina.svg" text="Gallinas" />
        <ButtonSidebar href="/consumo" icon="/iconPanel/consumo.svg" text="Consumo" />
        <ButtonSidebar href="/galpon" icon="/iconPanel/galpon.svg" text="Galpon" />
      </ul>
    </div>
  );
};

export default Sidebar;