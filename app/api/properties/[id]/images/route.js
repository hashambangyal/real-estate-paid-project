import {
  getPropertyImages,
  addPropertyImages,
} from "@/services/propertyService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

// ======================================================
// GET /api/properties/[id]/images
// Get all images
// ======================================================

export async function GET(
  request,
  { params }
) {
  try {
    const { id } = await params;

    const images =
      await getPropertyImages(id);

    return Response.json(
      {
        success: true,
        images,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "GET property images error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to fetch property images",
      },
      { status: 404 }
    );
  }
}


// ======================================================
// POST /api/properties/[id]/images
// Add more images
// ======================================================

export async function POST(
  request,
  { params }
) {
  try {
    await requireAdmin()
    const { id } = await params;

    const formData =
      await request.formData();

    const files =
      formData
        .getAll("images")
        .filter(
          (file) =>
            file &&
            typeof file.arrayBuffer ===
              "function"
        );

    if (files.length === 0) {
      return Response.json(
        {
          error:
            "At least one image is required",
        },
        { status: 400 }
      );
    }

    const images =
      await addPropertyImages(
        id,
        files
      );

    return Response.json(
      {
        success: true,
        message:
          "Images added successfully",
        images,
      },
      { status: 201 }
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
      "POST property images error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to add property images",
      },
      { status: 400 }
    );
  }
}