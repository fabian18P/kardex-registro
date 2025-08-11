function Label({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="block text-base font-medium text-gray-50"
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;