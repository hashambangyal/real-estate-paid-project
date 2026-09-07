"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14px] font-normal text-[#6B7280] hover:text-white hover:bg-[#0B6051] transition-all cursor-pointer"
    >
      <LogOut className="w-[19px] h-[19px] stroke-[1.8]" />
      Logout
    </button>
  );
}