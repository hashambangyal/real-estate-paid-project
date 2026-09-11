import { getInquiryStats } from "@/services/inquiryService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const stats = await getInquiryStats();
    return Response.json(stats, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/inquiry/stats error:", error);
    return Response.json(
      { error: error.message || "Failed to get inquiry stats" },
      { status: 500 }
    );
  }
}
