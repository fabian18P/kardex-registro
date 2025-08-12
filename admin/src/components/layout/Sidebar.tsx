import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-white border-r">
      <ul className="text-[#515151] mt-5">
        <Link href="/admin-dashboard">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden md:block">Panel de Control</p>
          </div>
        </Link>
        <Link href="/all-appointments">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden md:block">Citas</p>
          </div>
        </Link>
        <Link href="/add-doctor">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden md:block">Agregar Doctor</p>
          </div>
        </Link>
        <Link href="/doctor-list">
          <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer">
            <img className="w-10 min-w-5" src="/logo.svg" alt="" />
            <p className="hidden md:block">Lista de Doctores</p>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;