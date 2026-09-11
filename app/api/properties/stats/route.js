import { getPropertyStats } from "@/services/propertyService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET(request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "7d";

    const stats = await getPropertyStats({ timeframe });

    return Response.json(stats, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("GET /api/properties/stats error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch property stats" },
      { status: 500 }
    );
  }
}
