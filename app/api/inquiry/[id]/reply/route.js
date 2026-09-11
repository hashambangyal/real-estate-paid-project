import { replyToInquiry } from "@/services/inquiryService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function POST(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { subject, message } = body;

    if (!message || !message.trim()) {
      return Response.json(
        { error: "Reply message cannot be empty" },
        { status: 400 }
      );
    }

    const updatedInquiry = await replyToInquiry(id, { subject, message });

    return Response.json(
      {
        success: true,
        message: "Reply sent successfully",
        inquiry: updatedInquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/inquiry/[id]/reply error:", error);
    return Response.json(
      {
        error: error.message || "Failed to send reply to inquiry",
      },
      { status: 500 }
    );
  }
}
