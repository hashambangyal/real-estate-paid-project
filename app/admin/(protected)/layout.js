import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminCacheProvider } from "@/context/AdminCacheContext";

export default async function AdminLayout({
  children,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminCacheProvider>
      <div className="flex">
        {/* Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </AdminCacheProvider>
  );
}