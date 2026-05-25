import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="md:ml-[220px] flex-1 min-h-screen pt-[56px] md:pt-0 pb-24 md:pb-0">
        <Header />
        {children}
      </main>
    </div>
  );
}