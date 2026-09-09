import { getDashboardStats } from "@/services/dashboardService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const stats = await getDashboardStats();

    return Response.json(stats, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("GET /api/dashboard/stats error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
