function LabelModalInput({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block text-base mt-3 text-[#311800]" {...props}>
      {children}
    </label>
  );
}

export default LabelModalInput;