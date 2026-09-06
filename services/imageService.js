import cloudinary from "@/lib/cloudinary";

function uploadBufferToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

export async function uploadImage(file, folder) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid image file");
  }

  if (!file.type?.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  return await uploadBufferToCloudinary(
    buffer,
    folder
  );
}

export async function uploadImages(files, folder) {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedImages = [];

  try {
    for (const file of files) {
      const uploadedImage = await uploadImage(
        file,
        folder
      );

      uploadedImages.push(uploadedImage);
    }

    return uploadedImages;
  } catch (error) {
    if (uploadedImages.length > 0) {
      try {
        await deleteImages(
          uploadedImages.map(
            (image) => image.publicId
          )
        );
      } catch (cleanupError) {
        console.error(
          "Cloudinary cleanup failed:",
          cleanupError
        );
      }
    }

    throw new Error(
      "Failed to upload property images"
    );
  }
}

export async function deleteImage(publicId) {
  if (!publicId) {
    throw new Error("Cloudinary public ID is required");
  }

  try {
    return await cloudinary.uploader.destroy(
      publicId
    );
  } catch (error) {
    console.error(
      "Cloudinary delete failed:",
      error
    );

    throw new Error(
      "Failed to delete image"
    );
  }
}

export async function deleteImages(publicIds) {
  if (!publicIds || publicIds.length === 0) {
    return;
  }

  await Promise.all(
    publicIds.map((publicId) =>
      deleteImage(publicId)
    )
  );
}