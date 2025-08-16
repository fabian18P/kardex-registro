function ButtonLogin({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex w-full justify-center rounded-md bg-[#EFA52F] py-3 text-sm font-semibold text-[#2F1700] shadow-xs hover:bg-[#FFC15F]"
        {...props}
    >
      {children}
    </button>
  );
}

export default ButtonLogin