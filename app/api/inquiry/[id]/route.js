import {
  getInquiryById,
  deleteInquiry,
  updateInquiryStatus,
} from "@/services/inquiryService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";


export async function GET(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params;

    const inquiry = await getInquiryById(id);

    return Response.json(
      inquiry,
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    console.error(
      "GET /api/inquiries/[id] error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to get inquiry",
      },
      { status: 404 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params;

    const inquiry = await deleteInquiry(id);

    return Response.json(
      inquiry,
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    console.error(
      "DELETE /api/inquiries/[id] error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to delete inquiry",
      },
      { status: 400 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const updated = await updateInquiryStatus(id, status);

    return Response.json(updated, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("PATCH /api/inquiry/[id] error:", error);

    return Response.json(
      {
        error: error.message || "Failed to update inquiry status",
      },
      { status: 400 }
    );
  }
}