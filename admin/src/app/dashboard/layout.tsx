import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <aside>
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}