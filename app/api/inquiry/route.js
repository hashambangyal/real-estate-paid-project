import {
  createInquiry,
  getInquiries,
} from "@/services/inquiryService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";


export async function GET(request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const dateFilter = searchParams.get("dateFilter") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await getInquiries({
      search,
      status,
      dateFilter,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return Response.json(result, { status: 200 });
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
      "GET /api/inquiry error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to get inquiries",
      },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const inquiry = await createInquiry(body);

    return Response.json(
      inquiry,
      { status: 201 }
    );

  } catch (error) {
    console.error(
      "POST /api/inquiries error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to create inquiry",
      },
      { status: 400 }
    );
  }
}