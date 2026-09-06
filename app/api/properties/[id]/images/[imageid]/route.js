import {
  deletePropertyImage,
  setPropertyImageCover,
  reorderPropertyImage,
} from "@/services/propertyService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";


// ======================================================
// DELETE IMAGE
// ======================================================

export async function DELETE(
  request,
  { params }
) {
  try {
    await requireAdmin()
    const {
      id: propertyId,
      imageId,
    } = await params;

    const result =
      await deletePropertyImage(
        propertyId,
        imageId
      );

    return Response.json(
      result,
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
      "DELETE property image error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to delete property image",
      },
      { status: 400 }
    );
  }
}


// ======================================================
// PATCH IMAGE
// Cover OR Order
// ======================================================

export async function PATCH(
  request,
  { params }
) {
  try {
    await requireAdmin()
    const {
      id: propertyId,
      imageId,
    } = await params;

    const body =
      await request.json();

    // --------------------------------
    // Set cover image
    // --------------------------------

    if (body.isCover === true) {
      const image =
        await setPropertyImageCover(
          propertyId,
          imageId
        );

      return Response.json(
        {
          success: true,
          message:
            "Cover image updated successfully",
          image,
        },
        { status: 200 }
      );
    }

    // --------------------------------
    // Reorder image
    // --------------------------------

    if (body.order !== undefined) {
      const images =
        await reorderPropertyImage(
          propertyId,
          imageId,
          body.order
        );

      return Response.json(
        {
          success: true,
          message:
            "Image order updated successfully",
          images,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        error:
          "Nothing to update. Provide isCover or order.",
      },
      { status: 400 }
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
      "PATCH property image error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to update property image",
      },
      { status: 400 }
    );
  }
}