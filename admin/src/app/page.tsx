import { Button, Input, Label } from "@/components/ui";

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
        
        <div>
          <div className="pt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="mt-2">
                  <Input id="email" name="email" type="email" required placeholder="Alguien@gmail.com"/>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="font-semibold text-sm text-[#EFA52F] hover:text-[#FFC15F]">
                    ¿Olvido su Contraseña?
                  </a>
                </div>
                <div className="mt-2">
                  <Input id="contrasena" name="contrasena" type="password" required placeholder="********"/>
                </div>
              </div>

              <Button type="submit">Ingresar</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}