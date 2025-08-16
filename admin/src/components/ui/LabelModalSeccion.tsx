function LabelModalSeccion({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block text-base mb-3 font-bold text-[#311800]" {...props}>
      {children}
    </label>
  );
}

export default LabelModalSeccion;