import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "@/services/propertyService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const property = await getPropertyById(id);

    return Response.json(property, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/properties/[id] error:", error);

    return Response.json(
      { error: error.message || "Failed to fetch property" },
      { status: 404 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params;
    const body = await request.json();

    const property = await updateProperty(id, body);

    return Response.json(property, {
      status: 200,
    });
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
    console.error("PATCH /api/properties/[id] error:", error);

    return Response.json(
      { error: error.message || "Failed to update property" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params;

    const property = await deleteProperty(id);

    return Response.json(property, {
      status: 200,
    });
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
    console.error("DELETE /api/properties/[id] error:", error);

    return Response.json(
      { error: error.message || "Failed to delete property" },
      { status: 400 }
    );
  }
}