import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import cloudinary from "../lib/cloudinary.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const AGENT_ID = "cmtrd9nzl0002moumbt5ntufn";
/*
|--------------------------------------------------------------------------
| PROPERTY IMAGE SOURCES
|--------------------------------------------------------------------------
|
| Cloudinary will download these images and store them in:
|
| properties/<property-id>
|
| Each property gets 3 images.
|
*/

const propertyImages = [
  [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
    "https://images.unsplash.com/photo-1600047508788-7869e4b0c6e5?w=1200&q=85",
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85",
  ],

  [
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=85",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
  ],
];

/*
|--------------------------------------------------------------------------
| PROPERTY DATA
|--------------------------------------------------------------------------
*/

const properties = [
  {
    title: "Modern Family House in Nogales",
    slug: "modern-family-house-in-nogales",
    description:
      "Beautiful modern family home located in a quiet residential area of Nogales. The property offers spacious bedrooms, modern bathrooms, private parking and a comfortable backyard.",
    offerType: "SALE",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "2850000",
    currency: "MXN",
    bedrooms: 3,
    bathrooms: "2.5",
    sizeM2: "185",
    parkingSpots: 2,
    address: "Colonia Centro, Nogales, Sonora",
    latitude: "31.316700",
    longitude: "-110.945800",
    city: "Nogales, Sonora",
    amenities: [
      "Garage",
      "Garden",
      "Air Conditioning",
    ],
  },

  {
    title: "Luxury Villa with Private Pool",
    slug: "luxury-villa-private-pool-nogales",
    description:
      "Elegant luxury villa featuring a private swimming pool, large living areas and beautifully designed interiors. Perfect for families looking for comfort and privacy.",
    offerType: "SALE",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "6250000",
    currency: "MXN",
    bedrooms: 4,
    bathrooms: "3.5",
    sizeM2: "320",
    parkingSpots: 3,
    address: "Residencial Los Lagos, Nogales, Sonora",
    latitude: "31.300200",
    longitude: "-110.939100",
    city: "Nogales, Sonora",
    amenities: [
      "Pool",
      "Garage",
      "Garden",
      "24h Security",
    ],
  },

  {
    title: "Affordable 2 Bedroom Apartment",
    slug: "affordable-2-bedroom-apartment-nogales",
    description:
      "Comfortable apartment suitable for a small family or professionals. Located close to shops, restaurants and major roads.",
    offerType: "RENT",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "14500",
    currency: "MXN",
    bedrooms: 2,
    bathrooms: "2.0",
    sizeM2: "95",
    parkingSpots: 1,
    address: "Colonia Kennedy, Nogales, Sonora",
    latitude: "31.309500",
    longitude: "-110.948200",
    city: "Nogales, Sonora",
    amenities: [
      "Parking",
      "Air Conditioning",
      "24h Security",
    ],
  },

  {
    title: "Contemporary 4 Bedroom Residence",
    slug: "contemporary-4-bedroom-residence-nogales",
    description:
      "Spacious contemporary residence with four bedrooms, modern kitchen, large living room and private outdoor space.",
    offerType: "SALE",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "4180000",
    currency: "MXN",
    bedrooms: 4,
    bathrooms: "3.0",
    sizeM2: "260",
    parkingSpots: 2,
    address: "Residencial El Greco, Nogales, Sonora",
    latitude: "31.315900",
    longitude: "-110.934700",
    city: "Nogales, Sonora",
    amenities: [
      "Garage",
      "Garden",
      "Laundry Room",
    ],
  },

  {
    title: "Commercial Office Space Downtown",
    slug: "commercial-office-space-downtown-nogales",
    description:
      "Professional commercial office space in a strategic downtown location. Ideal for agencies, consulting firms and growing businesses.",
    offerType: "RENT",
    kind: "COMMERCIAL",
    status: "AVAILABLE",
    price: "28000",
    currency: "MXN",
    bedrooms: null,
    bathrooms: "2.0",
    sizeM2: "210",
    parkingSpots: 4,
    address: "Avenida Obregon, Downtown Nogales",
    latitude: "31.318600",
    longitude: "-110.945200",
    city: "Nogales, Sonora",
    amenities: [
      "Parking",
      "Air Conditioning",
      "24h Security",
    ],
  },

  {
    title: "Large Industrial Warehouse",
    slug: "large-industrial-warehouse-nogales",
    description:
      "Large industrial warehouse suitable for logistics, storage and commercial operations. Excellent access for delivery vehicles.",
    offerType: "RENT",
    kind: "WAREHOUSE",
    status: "AVAILABLE",
    price: "65000",
    currency: "MXN",
    bedrooms: null,
    bathrooms: "2.0",
    sizeM2: "850",
    parkingSpots: 8,
    address: "Parque Industrial Nuevo Nogales",
    latitude: "31.286300",
    longitude: "-110.952700",
    city: "Nogales, Sonora",
    amenities: [
      "Parking",
      "24h Security",
      "Loading Area",
    ],
  },

  {
    title: "Residential Land Near City Center",
    slug: "residential-land-near-city-center-nogales",
    description:
      "Excellent residential land opportunity located close to the city center. Suitable for development of a private residence or small residential project.",
    offerType: "SALE",
    kind: "LAND",
    status: "AVAILABLE",
    price: "1750000",
    currency: "MXN",
    bedrooms: null,
    bathrooms: null,
    sizeM2: "420",
    parkingSpots: null,
    address: "Colonia Municipal, Nogales, Sonora",
    latitude: "31.321100",
    longitude: "-110.941300",
    city: "Nogales, Sonora",
    amenities: [],
  },

  {
    title: "Elegant 3 Bedroom Townhouse",
    slug: "elegant-3-bedroom-townhouse-nogales",
    description:
      "Elegant townhouse with modern interiors, spacious bedrooms and a private garage. A great option for families seeking a low-maintenance home.",
    offerType: "SALE",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "3450000",
    currency: "MXN",
    bedrooms: 3,
    bathrooms: "2.5",
    sizeM2: "205",
    parkingSpots: 2,
    address: "Residencial La Mesa, Nogales, Sonora",
    latitude: "31.305800",
    longitude: "-110.926400",
    city: "Nogales, Sonora",
    amenities: [
      "Garage",
      "Garden",
      "Air Conditioning",
      "24h Security",
    ],
  },

  {
    title: "Modern Executive Apartment",
    slug: "modern-executive-apartment-nogales",
    description:
      "Modern executive apartment designed for professionals. Features open-plan living space, contemporary finishes and convenient parking.",
    offerType: "RENT",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "18500",
    currency: "MXN",
    bedrooms: 2,
    bathrooms: "2.0",
    sizeM2: "110",
    parkingSpots: 2,
    address: "Colonia San Carlos, Nogales, Sonora",
    latitude: "31.311900",
    longitude: "-110.929800",
    city: "Nogales, Sonora",
    amenities: [
      "Parking",
      "Air Conditioning",
      "24h Security",
    ],
  },

  {
    title: "Premium Family Residence",
    slug: "premium-family-residence-nogales",
    description:
      "Premium family residence with generous living areas, modern architecture, multiple bedrooms and excellent outdoor space.",
    offerType: "SALE",
    kind: "RESIDENTIAL",
    status: "AVAILABLE",
    price: "5100000",
    currency: "MXN",
    bedrooms: 4,
    bathrooms: "3.5",
    sizeM2: "295",
    parkingSpots: 3,
    address: "Residencial California, Nogales, Sonora",
    latitude: "31.298700",
    longitude: "-110.921600",
    city: "Nogales, Sonora",
    amenities: [
      "Garage",
      "Garden",
      "Pool",
      "24h Security",
      "Air Conditioning",
    ],
  },
];

/*
|--------------------------------------------------------------------------
| CLOUDINARY UPLOAD
|--------------------------------------------------------------------------
*/

async function uploadImageToCloudinary(imageUrl, propertyId, order) {
  console.log(`      Uploading image ${order + 1}...`);

  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: `properties/${propertyId}`,
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/*
|--------------------------------------------------------------------------
| CITY
|--------------------------------------------------------------------------
*/

async function getOrCreateCity(cityName) {
  return await prisma.city.upsert({
    where: {
      name: cityName,
    },
    update: {},
    create: {
      name: cityName,
    },
  });
}

/*
|--------------------------------------------------------------------------
| AMENITY
|--------------------------------------------------------------------------
*/

async function getOrCreateAmenity(amenityName) {
  return await prisma.amenity.upsert({
    where: {
      name: amenityName,
    },
    update: {},
    create: {
      name: amenityName,
    },
  });
}

/*
|--------------------------------------------------------------------------
| ADD PROPERTY IMAGES
|--------------------------------------------------------------------------
*/

async function addPropertyImages(propertyId, imageUrls) {
  const existingImages = await prisma.propertyImage.count({
    where: {
      propertyId,
    },
  });

  /*
   * If property already has 3 or more images,
   * don't upload duplicates.
   */

  if (existingImages >= 3) {
    console.log(
      `      Already has ${existingImages} images. Skipping.`
    );

    return;
  }

  const uploadedImages = [];

  try {
    for (
      let index = existingImages;
      index < imageUrls.length;
      index++
    ) {
      const uploaded = await uploadImageToCloudinary(
        imageUrls[index],
        propertyId,
        index
      );

      uploadedImages.push({
        url: uploaded.url,
        publicId: uploaded.publicId,
        propertyId,
        isCover: index === 0,
        order: index,
      });
    }

    if (uploadedImages.length > 0) {
      await prisma.propertyImage.createMany({
        data: uploadedImages,
      });
    }

    console.log(
      `      ${uploadedImages.length} images saved to database.`
    );
  } catch (error) {
    console.error(
      `      Image upload failed for property ${propertyId}`
    );

    /*
     * Cleanup Cloudinary if database insertion fails.
     */

    for (const image of uploadedImages) {
      try {
        await cloudinary.uploader.destroy(
          image.publicId
        );
      } catch (cleanupError) {
        console.error(
          `      Failed to cleanup ${image.publicId}`
        );
      }
    }

    throw error;
  }
}

/*
|--------------------------------------------------------------------------
| ADD AMENITIES
|--------------------------------------------------------------------------
*/

async function addPropertyAmenities(
  propertyId,
  amenityNames
) {
  if (!amenityNames || amenityNames.length === 0) {
    return;
  }

  for (const amenityName of amenityNames) {
    const amenity =
      await getOrCreateAmenity(amenityName);

    await prisma.propertyAmenity.upsert({
      where: {
        propertyId_amenityId: {
          propertyId,
          amenityId: amenity.id,
        },
      },
      update: {},
      create: {
        propertyId,
        amenityId: amenity.id,
      },
    });
  }
}

/*
|--------------------------------------------------------------------------
| CREATE PROPERTY
|--------------------------------------------------------------------------
*/

async function createSeedProperty(
  propertyData,
  imageUrls
) {
  console.log(
    `\n🏠 ${propertyData.title}`
  );

  /*
   * Find/create city
   */

  const city = await getOrCreateCity(
    propertyData.city
  );

  /*
   * Check if property already exists.
   */

  let property =
    await prisma.property.findUnique({
      where: {
        slug: propertyData.slug,
      },
    });

  /*
   * Create property only if it doesn't exist.
   */

  if (!property) {
    property = await prisma.property.create({
      data: {
        title: propertyData.title,

        slug: propertyData.slug,

        description:
          propertyData.description,

        offerType:
          propertyData.offerType,

        kind:
          propertyData.kind,

        status:
          propertyData.status,

        price:
          propertyData.price,

        currency:
          propertyData.currency,

        bedrooms:
          propertyData.bedrooms,

        bathrooms:
          propertyData.bathrooms,

        sizeM2:
          propertyData.sizeM2,

        parkingSpots:
          propertyData.parkingSpots,

        address:
          propertyData.address,

        latitude:
          propertyData.latitude,

        longitude:
          propertyData.longitude,

        cityId:
          city.id,

        agentId:
          AGENT_ID,
      },
    });

    console.log(
      `   ✅ Property created: ${property.id}`
    );
  } else {
    console.log(
      `   ℹ️ Property already exists: ${property.id}`
    );

    /*
     * Make sure existing property is connected
     * to the requested agent.
     */

    if (property.agentId !== AGENT_ID) {
      property =
        await prisma.property.update({
          where: {
            id: property.id,
          },
          data: {
            agentId: AGENT_ID,
          },
        });

      console.log(
        `   🔗 Agent relation updated`
      );
    }
  }

  /*
   * Add amenities
   */

  await addPropertyAmenities(
    property.id,
    propertyData.amenities
  );

  /*
   * Add 3 images
   */

  await addPropertyImages(
    property.id,
    imageUrls
  );

  return property;
}

/*
|--------------------------------------------------------------------------
| VERIFY AGENT
|--------------------------------------------------------------------------
*/

async function verifyAgent() {
  console.log(
    "\n🔎 Checking agent..."
  );

  const agent =
    await prisma.agent.findUnique({
      where: {
        id: AGENT_ID,
      },
    });

  if (!agent) {
    throw new Error(
      `Agent not found: ${AGENT_ID}`
    );
  }

  console.log(
    `✅ Agent found: ${agent.name}`
  );

  console.log(
    `   Email: ${agent.email}`
  );
}

/*
|--------------------------------------------------------------------------
| MAIN
|--------------------------------------------------------------------------
*/

async function main() {
  console.log(
    "\n========================================"
  );

  console.log(
    "   PROPERTY SEED STARTED"
  );

  console.log(
    "========================================\n"
  );

  /*
   * 1. Verify agent
   */

  await verifyAgent();

  /*
   * 2. Create properties
   */

  for (
    let index = 0;
    index < properties.length;
    index++
  ) {
    const propertyData =
      properties[index];

    const images =
      propertyImages[index];

    await createSeedProperty(
      propertyData,
      images
    );
  }

  /*
   * 3. Final statistics
   */

  const propertyCount =
    await prisma.property.count({
      where: {
        agentId: AGENT_ID,
      },
    });

  const imageCount =
    await prisma.propertyImage.count({
      where: {
        property: {
          agentId: AGENT_ID,
        },
      },
    });

  console.log(
    "\n========================================"
  );

  console.log(
    "   PROPERTY SEED COMPLETED ✅"
  );

  console.log(
    "========================================"
  );

  console.log(
    `Agent ID: ${AGENT_ID}`
  );

  console.log(
    `Properties: ${propertyCount}`
  );

  console.log(
    `Images: ${imageCount}`
  );

  console.log(
    "========================================\n"
  );
}

/*
|--------------------------------------------------------------------------
| ERROR HANDLING
|--------------------------------------------------------------------------
*/

main()
  .catch((error) => {
    console.error(
      "\n❌ SEED FAILED\n"
    );

    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });