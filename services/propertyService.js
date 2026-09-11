import { prisma } from "@/lib/prisma";
import {
  uploadImages,
  deleteImages} from "@/services/imageService";




export async function getProperties({
  offerType,
  kind,
  status,
  cityId,
  minPrice,
  maxPrice,
  minBedrooms,
  maxBedrooms,
  page = 1,
  limit = 12,
  sortBy = "createdAt",
  sortOrder = "desc",
  search,
  missingFilter,
} = {}) {
  const where = {};
  const andConditions = [];

  // Filters
  if (offerType) {
    where.offerType = offerType;
  }

  if (kind) {
    where.kind = kind;
  }

  if (status) {
    where.status = status;
  }

  if (cityId) {
    where.cityId = cityId;
  }

  // Price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  // Bedroom filter
  if (minBedrooms !== undefined || maxBedrooms !== undefined) {
    where.bedrooms = {};

    if (minBedrooms !== undefined) {
      where.bedrooms.gte = Number(minBedrooms);
    }

    if (maxBedrooms !== undefined) {
      where.bedrooms.lte = Number(maxBedrooms);
    }
  }

  // Search filter (title, address, description)
  if (search && search.trim()) {
    const query = search.trim();
    andConditions.push({
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { address: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  // Missing data filter
  if (missingFilter === "no_images") {
    andConditions.push({ images: { none: {} } });
  } else if (missingFilter === "no_agent") {
    andConditions.push({ agentId: null });
  } else if (missingFilter === "no_city") {
    andConditions.push({ cityId: null });
  } else if (missingFilter === "incomplete") {
    andConditions.push({
      OR: [
        { description: null },
        { address: null },
        { sizeM2: null },
        { images: { none: {} } },
        { agentId: null },
        { cityId: null },
      ],
    });
  }

  if (andConditions.length > 0) {
    where.AND = andConditions;
  }

  // Pagination
  const pageNumber = Math.max(1, Number(page));
  const pageSize = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * pageSize;

  // Allowed sorting fields
  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "price",
    "bedrooms",
    "title",
  ];

  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const finalSortOrder = sortOrder === "asc" ? "asc" : "desc";

  // Fetch properties + total count together
  const properties = await prisma.property.findMany({
    where,

    include: {
      city: true,
      agent: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },

    orderBy: {
      [finalSortBy]: finalSortOrder,
    },

    skip,
    take: pageSize,
  });

  const total = await prisma.property.count({
    where,
  });

  return {
    data: properties,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}

/**
 * Get aggregated statistics for the Properties dashboard
 */
export async function getPropertyStats({ timeframe = "7d" } = {}) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [
    totalProperties,
    propertiesLast30,
    propertiesPrev30,
    withImagesCount,
    withAgentCount,
    withCityCount,
    noImagesCount,
    noAgentCount,
    noCityCount,
    incompleteCount,
    kindGroups,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.property.count({
      where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
    }),
    prisma.property.count({ where: { images: { some: {} } } }),
    prisma.property.count({ where: { agentId: { not: null } } }),
    prisma.property.count({ where: { cityId: { not: null } } }),
    prisma.property.count({ where: { images: { none: {} } } }),
    prisma.property.count({ where: { agentId: null } }),
    prisma.property.count({ where: { cityId: null } }),
    prisma.property.count({
      where: {
        OR: [
          { description: null },
          { address: null },
          { sizeM2: null },
          { images: { none: {} } },
          { agentId: null },
          { cityId: null },
        ],
      },
    }),
    prisma.property.groupBy({
      by: ["kind"],
      _count: { _all: true },
    }),
  ]);

  const calcPercent = (count, total) => {
    if (!total || total === 0) return 0;
    return Number(((count / total) * 100).toFixed(1));
  };

  const calcChange = (recent, prev) => {
    if (prev === 0) return recent > 0 ? 100 : 0;
    return Math.round(((recent - prev) / prev) * 100);
  };

  // Timeframe calculation for Added Over Time
  const daysCount = timeframe === "30d" ? 30 : 7;
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (daysCount - 1));

  const recentCreatedProperties = await prisma.property.findMany({
    where: {
      createdAt: { gte: startDate },
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  const dayBuckets = [];
  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dayBuckets.push({ date: dateStr, label, count: 0 });
  }

  recentCreatedProperties.forEach((p) => {
    const pDateStr = new Date(p.createdAt).toISOString().split("T")[0];
    const bucket = dayBuckets.find((b) => b.date === pDateStr);
    if (bucket) {
      bucket.count += 1;
    }
  });

  const residential =
    kindGroups.find((g) => g.kind === "RESIDENTIAL")?._count._all || 0;
  const commercial =
    kindGroups.find((g) => g.kind === "COMMERCIAL")?._count._all || 0;
  const land =
    kindGroups.find((g) => g.kind === "LAND")?._count._all || 0;
  const warehouse =
    kindGroups.find((g) => g.kind === "WAREHOUSE")?._count._all || 0;

  return {
    metrics: {
      total: {
        count: totalProperties,
        change: calcChange(propertiesLast30, propertiesPrev30),
      },
      withImages: {
        count: withImagesCount,
        percentage: calcPercent(withImagesCount, totalProperties),
      },
      withAgent: {
        count: withAgentCount,
        percentage: calcPercent(withAgentCount, totalProperties),
      },
      withCity: {
        count: withCityCount,
        percentage: calcPercent(withCityCount, totalProperties),
      },
      missingData: {
        count: incompleteCount,
        percentage: calcPercent(incompleteCount, totalProperties),
      },
    },
    missingBreakdown: {
      noImages: noImagesCount,
      noAgent: noAgentCount,
      noCity: noCityCount,
      incompleteDetails: incompleteCount,
    },
    addedOverTime: dayBuckets,
    byType: {
      residential: {
        count: residential,
        percentage: calcPercent(residential, totalProperties),
      },
      commercial: {
        count: commercial,
        percentage: calcPercent(commercial, totalProperties),
      },
      land: {
        count: land,
        percentage: calcPercent(land, totalProperties),
      },
      warehouse: {
        count: warehouse,
        percentage: calcPercent(warehouse, totalProperties),
      },
    },
  };
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id) {
  if (!id) {
    throw new Error("Property ID is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      id,
    },

    include: {
      city: true,
      agent: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
      inquiries: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
}

/**
 * Get a single property by slug
 */
export async function getPropertyBySlug(slug) {
  if (!slug) {
    throw new Error("Property slug is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      slug,
    },

    include: {
      city: true,
      agent: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
}

/**
 * Create a new property
 */



export async function createProperty(data, files = []) {
  const {
    title,
    slug,
    description,
    offerType,
    kind,
    status,
    price,
    currency,
    bedrooms,
    bathrooms,
    sizeM2,
    parkingSpots,
    address,
    latitude,
    longitude,
    cityId,
    agentId,
    amenityIds = [],
  } = data;

  // --------------------------------
  // Basic validation
  // --------------------------------

  if (!title?.trim()) {
    throw new Error("Property title is required");
  }

  if (!slug?.trim()) {
    throw new Error("Property slug is required");
  }

  if (!offerType) {
    throw new Error("Offer type is required");
  }

  if (!kind) {
    throw new Error("Property kind is required");
  }

  if (price === undefined || price === null || price === "") {
    throw new Error("Property price is required");
  }

  if (!agentId) {
    throw new Error("Agent ID is required");
  }

  // --------------------------------
  // Normalize values
  // --------------------------------

  const normalizedPrice = price;

  const normalizedBedrooms =
    bedrooms !== undefined &&
    bedrooms !== null &&
    bedrooms !== ""
      ? Number(bedrooms)
      : undefined;

  const normalizedParkingSpots =
    parkingSpots !== undefined &&
    parkingSpots !== null &&
    parkingSpots !== ""
      ? Number(parkingSpots)
      : undefined;

  const normalizedBathrooms =
    bathrooms !== undefined &&
    bathrooms !== null &&
    bathrooms !== ""
      ? bathrooms
      : undefined;

  const normalizedSizeM2 =
    sizeM2 !== undefined &&
    sizeM2 !== null &&
    sizeM2 !== ""
      ? sizeM2
      : undefined;

  const normalizedLatitude =
    latitude !== undefined &&
    latitude !== null &&
    latitude !== ""
      ? latitude
      : undefined;

  const normalizedLongitude =
    longitude !== undefined &&
    longitude !== null &&
    longitude !== ""
      ? longitude
      : undefined;

  // --------------------------------
  // Validate numeric values
  // --------------------------------

  if (
    normalizedBedrooms !== undefined &&
    Number.isNaN(normalizedBedrooms)
  ) {
    throw new Error("Invalid bedrooms value");
  }

  if (
    normalizedParkingSpots !== undefined &&
    Number.isNaN(normalizedParkingSpots)
  ) {
    throw new Error("Invalid parking spots value");
  }

  // --------------------------------
  // Create property first
  // --------------------------------

  let property = null;
  let uploadedImages = [];

  try {
    property = await prisma.property.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        description,

        offerType,
        kind,
        status: status || "AVAILABLE",

        price: normalizedPrice,
        currency: currency || "MXN",

        bedrooms: normalizedBedrooms,

        bathrooms: normalizedBathrooms,

        sizeM2: normalizedSizeM2,

        parkingSpots: normalizedParkingSpots,

        address,

        latitude: normalizedLatitude,
        longitude: normalizedLongitude,

        cityId,
        agentId,
      },
    });

    // --------------------------------
    // Upload images to Cloudinary
    // --------------------------------

    if (files.length > 0) {
      const folder = `properties/${property.id}`;

      uploadedImages = await uploadImages(
        files,
        folder
      );
    }

    // --------------------------------
    // Save images + amenities
    // --------------------------------

    const result = await prisma.$transaction(
      async (tx) => {
        // ----------------------------
        // Property Images
        // ----------------------------

        if (uploadedImages.length > 0) {
          await tx.propertyImage.createMany({
            data: uploadedImages.map(
              (image, index) => ({
                url: image.url,
                publicId: image.publicId,

                isCover: index === 0,

                order: index,

                propertyId: property.id,
              })
            ),
          });
        }

        // ----------------------------
        // Property Amenities
        // ----------------------------

        if (amenityIds.length > 0) {
          await tx.propertyAmenity.createMany({
            data: amenityIds.map(
              (amenityId) => ({
                propertyId: property.id,
                amenityId,
              })
            ),
          });
        }

        // ----------------------------
        // Return complete property
        // ----------------------------

        return await tx.property.findUnique({
          where: {
            id: property.id,
          },

          include: {
            city: true,

            agent: true,

            images: {
              orderBy: {
                order: "asc",
              },
            },

            amenities: {
              include: {
                amenity: true,
              },
            },
          },
        });
      }
    );

    return result;

  } catch (error) {
    console.error(
      "Create property failed:",
      error
    );

    // --------------------------------
    // Cloudinary cleanup
    // --------------------------------

    if (uploadedImages.length > 0) {
      try {
        await deleteImages(
          uploadedImages.map(
            (image) => image.publicId
          )
        );
      } catch (cleanupError) {
        console.error(
          "Failed to cleanup Cloudinary images:",
          cleanupError
        );
      }
    }

    // --------------------------------
    // Property cleanup
    // --------------------------------

    if (property?.id) {
      try {
        await prisma.property.delete({
          where: {
            id: property.id,
          },
        });
      } catch (deleteError) {
        console.error(
          "Failed to cleanup property:",
          deleteError
        );
      }
    }

    throw error;
  }
}
/**
 * Update an existing property
 */
export async function updateProperty(id, data) {
  if (!id) {
    throw new Error("Property ID is required");
  }

  const {
    title,
    slug,
    description,
    offerType,
    kind,
    status,
    price,
    currency,
    bedrooms,
    bathrooms,
    sizeM2,
    parkingSpots,
    address,
    latitude,
    longitude,
    cityId,
    agentId,
  } = data;

  const property = await prisma.property.update({
    where: {
      id,
    },

    data: {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(description !== undefined && { description }),
      ...(offerType !== undefined && { offerType }),
      ...(kind !== undefined && { kind }),
      ...(status !== undefined && { status }),
      ...(price !== undefined && { price }),
      ...(currency !== undefined && { currency }),

      ...(bedrooms !== undefined && {
        bedrooms: Number(bedrooms),
      }),

      ...(bathrooms !== undefined && {
        bathrooms,
      }),

      ...(sizeM2 !== undefined && {
        sizeM2,
      }),

      ...(parkingSpots !== undefined && {
        parkingSpots: Number(parkingSpots),
      }),

      ...(address !== undefined && { address }),
      ...(latitude !== undefined && { latitude }),
      ...(longitude !== undefined && { longitude }),
      ...(cityId !== undefined && { cityId }),
      ...(agentId !== undefined && { agentId }),
    },

    include: {
      city: true,
      agent: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  return property;
}

/**
 * Delete a property
 */
export async function deleteProperty(id) {
  if (!id) {
    throw new Error("Property ID is required");
  }

  const property = await prisma.property.delete({
    where: {
      id,
    },
  });

  return property;
}



export async function getPropertyAmenities(propertyId) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return property.amenities.map((item) => item.amenity);
}


export async function updatePropertyAmenities(propertyId, amenityIds) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!Array.isArray(amenityIds)) {
    throw new Error("amenityIds must be an array");
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  // Make sure all provided amenities actually exist
  const amenities = await prisma.amenity.findMany({
    where: {
      id: {
        in: amenityIds,
      },
    },
  });

  if (amenities.length !== amenityIds.length) {
    throw new Error("One or more amenities not found");
  }

  // Replace existing amenities with the new list
  await prisma.propertyAmenity.deleteMany({
    where: {
      propertyId,
    },
  });

  if (amenityIds.length > 0) {
    await prisma.propertyAmenity.createMany({
      data: amenityIds.map((amenityId) => ({
        propertyId,
        amenityId,
      })),
    });
  }

  return getPropertyAmenities(propertyId);
}



// ======================================================
// PROPERTY IMAGE MANAGEMENT
// ======================================================

// ------------------------------------------------------
// Get all property images
// ------------------------------------------------------

export async function getPropertyImages(propertyId) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return await prisma.propertyImage.findMany({
    where: {
      propertyId,
    },
    orderBy: {
      order: "asc",
    },
  });
}


// ------------------------------------------------------
// Add more images to existing property
// ------------------------------------------------------

export async function addPropertyImages(
  propertyId,
  files
) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!files || files.length === 0) {
    throw new Error(
      "At least one image is required"
    );
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  let uploadedImages = [];

  try {
    // Get current images
    const existingImages =
      await prisma.propertyImage.findMany({
        where: {
          propertyId,
        },
        orderBy: {
          order: "asc",
        },
      });

    const nextOrder = existingImages.length;

    // Upload to Cloudinary
    uploadedImages = await uploadImages(
      files,
      `properties/${propertyId}`
    );

    // Save image records
    await prisma.propertyImage.createMany({
      data: uploadedImages.map(
        (image, index) => ({
          url: image.url,
          publicId: image.publicId,

          propertyId,

          order: nextOrder + index,

          // If property has no image,
          // first new image becomes cover
          isCover:
            existingImages.length === 0 &&
            index === 0,
        })
      ),
    });

    return await getPropertyImages(propertyId);

  } catch (error) {
    // Cleanup Cloudinary if DB operation fails
    if (uploadedImages.length > 0) {
      try {
        await deleteImages(
          uploadedImages.map(
            (image) => image.publicId
          )
        );
      } catch (cleanupError) {
        console.error(
          "Image cleanup failed:",
          cleanupError
        );
      }
    }

    throw error;
  }
}


// ------------------------------------------------------
// Delete property image
// ------------------------------------------------------

export async function deletePropertyImage(
  propertyId,
  imageId
) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!imageId) {
    throw new Error("Image ID is required");
  }

  const image =
    await prisma.propertyImage.findFirst({
      where: {
        id: imageId,
        propertyId,
      },
    });

  if (!image) {
    throw new Error(
      "Property image not found"
    );
  }

  // Delete from Cloudinary
  await deleteImage(image.publicId);

  // Delete from PostgreSQL
  await prisma.propertyImage.delete({
    where: {
      id: imageId,
    },
  });

  // If deleted image was cover,
  // assign another image as cover
  if (image.isCover) {
    const nextImage =
      await prisma.propertyImage.findFirst({
        where: {
          propertyId,
        },
        orderBy: {
          order: "asc",
        },
      });

    if (nextImage) {
      await prisma.propertyImage.update({
        where: {
          id: nextImage.id,
        },
        data: {
          isCover: true,
        },
      });
    }
  }

  return {
    success: true,
    message:
      "Property image deleted successfully",
  };
}


// ------------------------------------------------------
// Set image as cover
// ------------------------------------------------------

export async function setPropertyImageCover(
  propertyId,
  imageId
) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!imageId) {
    throw new Error("Image ID is required");
  }

  const image =
    await prisma.propertyImage.findFirst({
      where: {
        id: imageId,
        propertyId,
      },
    });

  if (!image) {
    throw new Error(
      "Property image not found"
    );
  }

  await prisma.$transaction([
    // Remove cover from all images
    prisma.propertyImage.updateMany({
      where: {
        propertyId,
      },
      data: {
        isCover: false,
      },
    }),

    // Set selected image as cover
    prisma.propertyImage.update({
      where: {
        id: imageId,
      },
      data: {
        isCover: true,
      },
    }),
  ]);

  return await prisma.propertyImage.findUnique({
    where: {
      id: imageId,
    },
  });
}


// ------------------------------------------------------
// Reorder property image
// ------------------------------------------------------

export async function reorderPropertyImage(
  propertyId,
  imageId,
  newOrder
) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!imageId) {
    throw new Error("Image ID is required");
  }

  const order = Number(newOrder);

  if (
    Number.isNaN(order) ||
    order < 0
  ) {
    throw new Error(
      "Invalid image order"
    );
  }

  const images =
    await prisma.propertyImage.findMany({
      where: {
        propertyId,
      },
      orderBy: {
        order: "asc",
      },
    });

  const currentIndex =
    images.findIndex(
      (image) =>
        image.id === imageId
    );

  if (currentIndex === -1) {
    throw new Error(
      "Property image not found"
    );
  }

  // Don't allow order beyond last position
  const targetIndex = Math.min(
    order,
    images.length - 1
  );

  // Remove image from current position
  const reorderedImages = [
    ...images,
  ];

  const [selectedImage] =
    reorderedImages.splice(
      currentIndex,
      1
    );

  // Insert image at new position
  reorderedImages.splice(
    targetIndex,
    0,
    selectedImage
  );

  // Update all orders in one transaction
  await prisma.$transaction(
    reorderedImages.map(
      (image, index) =>
        prisma.propertyImage.update({
          where: {
            id: image.id,
          },
          data: {
            order: index,
          },
        })
    )
  );

  return await getPropertyImages(
    propertyId
  );
}
