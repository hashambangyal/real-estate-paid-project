import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import Sidebar from "@/component/admin/Sidebar";

export default async function AdminLayout({
  children,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex ">

      {/* Sidebar */}
      {/* <aside className="w-64 bg-white border-r min-h-screen p-6">

        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link href="/admin/dashboard">
            Dashboard
          </Link>

          <Link href="/admin/properties">
            Properties
          </Link>

          <Link href="/admin/agents">
            Agents
          </Link>

          <Link href="/admin/amenities">
            Amenities
          </Link>

          <Link href="/admin/cities">
            Cities
          </Link>

          <Link href="/admin/inquiries">
            Inquiries
          </Link>

        </nav>

        <div className="mt-10">
          <LogoutButton />
        </div>

      </aside> */}
       < Sidebar/>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}