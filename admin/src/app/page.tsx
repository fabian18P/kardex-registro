// src/app/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookiesList = await cookies(); // Espera a que se resuelvan las cookies
  const role = cookiesList.get('role')?.value as 'admin' | 'operario' | 'visitante' | undefined;

  if (role) {
    redirect(`/dashboard/${role}`); // Redirige al panel según el rol
  }

  redirect('/auth/login'); // Redirige correctamente al login
}