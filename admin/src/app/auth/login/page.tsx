import LoginFrom from "@/components/auth/LoginForm";

export default function Example() {
  return (
    <>
      <div className="w-screen h-screen bg-[#2F1700]">
        <div className="flex items-center space-x-4 justify-center pt-24">
          <img alt="cigaSac" src="/logo.svg" className="h-24 w-auto" />
          <h2 className="text-6xl font-bold text-[#EFA52F]">
            CIGA SAC
          </h2>
        </div>
        
        <div className="pt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginFrom />
        </div>
      </div>
    </>
  );
}