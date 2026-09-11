import { getProperties} from "@/services/propertyService";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

import {
  createProperty,
} from "@/services/propertyService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const properties = await getProperties({
      offerType:
        searchParams.get("offerType") ||
        undefined,

      kind:
        searchParams.get("kind") ||
        undefined,

      status:
        searchParams.get("status") ||
        undefined,

      cityId:
        searchParams.get("cityId") ||
        undefined,

      minPrice:
        searchParams.get("minPrice") ||
        undefined,

      maxPrice:
        searchParams.get("maxPrice") ||
        undefined,

      minBedrooms:
        searchParams.get("minBedrooms") ||
        undefined,

      maxBedrooms:
        searchParams.get("maxBedrooms") ||
        undefined,

      page: searchParams.get("page")
        ? parseInt(searchParams.get("page"), 10)
        : 1,

      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit"), 10)
        : 12,


      sortBy:
        searchParams.get("sortBy") ||
        "createdAt",

      sortOrder:
        searchParams.get("sortOrder") ||
        "desc",

      search:
        searchParams.get("search") ||
        undefined,

      missingFilter:
        searchParams.get("missingFilter") ||
        undefined,
    });

    return Response.json(
      properties,
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "GET /api/properties error:",
      error
    );

    return Response.json(
      {
        error: "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // --------------------------------
    // Read multipart/form-data
    // --------------------------------

    await requireAdmin();

    const formData =
      await request.formData();

    // --------------------------------
    // Extract property fields
    // --------------------------------

    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),

      offerType: formData.get("offerType"),
      kind: formData.get("kind"),
      status: formData.get("status"),

      price: formData.get("price"),
      currency: formData.get("currency"),

      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),

      sizeM2: formData.get("sizeM2"),

      parkingSpots:
        formData.get("parkingSpots"),

      address: formData.get("address"),

      latitude:
        formData.get("latitude"),

      longitude:
        formData.get("longitude"),

      cityId:
        formData.get("cityId"),

      agentId:
        formData.get("agentId"),
    };

    // --------------------------------
    // Get amenity IDs
    // --------------------------------

    const amenityIds =
      formData.getAll("amenityIds");

    data.amenityIds = amenityIds;

    // --------------------------------
    // Get uploaded image files
    // --------------------------------

    const files =
      formData
        .getAll("images")
        .filter(
          (file) =>
            file &&
            typeof file.arrayBuffer ===
              "function"
        );

    // --------------------------------
    // Create property
    // --------------------------------

    const property =
      await createProperty(
        data,
        files
      );

    return Response.json(
      property,
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
      "POST /api/properties error:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Failed to create property",
      },
      { status: 400 }
    );
  }
}