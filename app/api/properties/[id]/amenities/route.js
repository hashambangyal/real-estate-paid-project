import {
  getPropertyAmenities,
  updatePropertyAmenities,
} from "@/services/propertyService";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const amenities = await getPropertyAmenities(id);

    return Response.json(amenities, {
      status: 200,
    });
  } catch (error) {
    console.error(
      "GET /api/properties/[id]/amenities error:",
      error
    );

    return Response.json(
      { error: error.message || "Failed to fetch property amenities" },
      { status: 404 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { amenityIds } = body;

    const amenities = await updatePropertyAmenities(
      id,
      amenityIds
    );

    return Response.json(amenities, {
      status: 200,
    });
  } catch (error) {
    console.error(
      "PUT /api/properties/[id]/amenities error:",
      error
    );

    return Response.json(
      {
        error:
          error.message || "Failed to update property amenities",
      },
      { status: 400 }
    );
  }
}