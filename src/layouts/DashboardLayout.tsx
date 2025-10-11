import { Sidebar } from "@/features/dashboard";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="grid grid-cols-[120px_1fr] lg:grid-cols-[240px_1fr] h-screen">
      <Sidebar />
      <main className="container ml-60 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
