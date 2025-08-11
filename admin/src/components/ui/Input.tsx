function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="block w-full rounded-md bg-gray-50 pl-3 pr-3 py-3 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
        {...props}
    />
  );
}

export default Input;