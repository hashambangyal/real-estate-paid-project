export async function addPropertyImage(propertyId, data) {
  return prisma.propertyImage.create({
    data: {
      propertyId,
      url: data.url,
      isCover: data.isCover ?? false,
      order: data.order ?? 0,
    },
  });
}

export async function updatePropertyImage(imageId, data) {
  return prisma.propertyImage.update({
    where: {
      id: imageId,
    },
    data: {
      ...(data.url !== undefined && { url: data.url }),
      ...(data.order !== undefined && { order: data.order }),
      ...(data.isCover !== undefined && { isCover: data.isCover }),
    },
  });
}

export async function deletePropertyImage(imageId) {
  return prisma.propertyImage.delete({
    where: {
      id: imageId,
    },
  });
}


export async function setCoverImage(propertyId, imageId) {
  return prisma.$transaction(async (tx) => {
    await tx.propertyImage.updateMany({
      where: {
        propertyId,
      },
      data: {
        isCover: false,
      },
    });

    return tx.propertyImage.update({
      where: {
        id: imageId,
      },
      data: {
        isCover: true,
      },
    });
  });
}