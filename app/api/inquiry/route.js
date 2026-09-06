import {
  createInquiry,
  getInquiries,
} from "@/services/inquiryService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";


export async function GET() {
  try {
    await requireAdmin()
    const inquiries = await getInquiries();

    return Response.json(
      inquiries,
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
      "GET /api/inquiries error:",
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