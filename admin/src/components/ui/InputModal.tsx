function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className="block w-full border-1 border-color-[#311800] rounded-md bg-gray-100 mt-2 pl-3 pr-3 py-1 text-base text-gray-900 sm:text-sm/6"
        {...props}
    />
  );
}

export default Input;