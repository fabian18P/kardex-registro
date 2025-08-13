import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr] bg-[#F5F5F5]">
      <aside className="row-span-2"><Sidebar/></aside>
      <header className="border-b"><Navbar/></header>
      <main className="p-6">{children}</main>
    </div>
  );
}