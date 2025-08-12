const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-10 h-10 cursor-pointer' src="/logo.svg"/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Administrador-Operario-Visitador</p>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Cerrar sesión</button>
    </div>
  );
};

export default Navbar;