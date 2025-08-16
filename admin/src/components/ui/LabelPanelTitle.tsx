function LabelPanelTitle({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block text-base sm:text-4xl text-[#311800] font-bold" {...props}>
      {children} <p className="hidden sm:block text-base text-[#311800] font-normal">Bienvenido al panel de {children}!</p>
    </label>
  );
}

export default LabelPanelTitle;
