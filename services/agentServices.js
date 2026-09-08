import { prisma } from "@/lib/prisma";
import { uploadImage } from "./imageService";

export async function createAgent(data, imageFile) {
  const {
    name,
    email,
    phone,
    facebook,
    instagram,
    bio,
  } = data;

  if (!name || !email || !phone) {
    throw new Error("Name, email and phone are required");
  }

  let avatarUrl;

  if (imageFile) {
    const uploaded = await uploadImage(imageFile, "agents");
    avatarUrl = uploaded.url;
  }

  const agent = await prisma.agent.create({
    data: {
      name,
      email,
      phone,
      facebook,
      instagram,
      bio,
      ...(avatarUrl && { avatarUrl }),
    },
  });

  return agent;
}

export async function getAgents() {
  return await prisma.agent.findMany({
    include: {
      properties: {
        include: {
          images: true,
          city: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAgentById(id) {
  const agent = await prisma.agent.findUnique({
    where: { id },
    include: {
      properties: {
        include: {
          images: true,
          city: true,
        },
      },
    },
  });
  if (!agent) throw new Error("Agent not found");
  return agent;
}

export async function updateAgent(id, data, imageFile) {
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const {
    name,
    email,
    phone,
    facebook,
    instagram,
    bio,
  } = data;

  let avatarUrl;

  if (imageFile) {
    const uploaded = await uploadImage(imageFile, "agents");
    avatarUrl = uploaded.url;
  }

  const agent = await prisma.agent.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(facebook !== undefined && { facebook }),
      ...(instagram !== undefined && { instagram }),
      ...(bio !== undefined && { bio }),
      ...(avatarUrl && { avatarUrl }),
    },
  });

  return agent;
}

export async function deleteAgent(id) {
  if (!id) {
    throw new Error("Agent ID is required");
  }

  try {
    const agent = await prisma.agent.delete({
      where: { id },
    });
    return agent;
  } catch (error) {
    if (error.code === 'P2003') {
      throw new Error(
        "Ye agent delete nahi ho sakta kyunke iske sath properties assigned hain. Pehle properties ko kisi doosre agent ko assign karein ya delete karein."
      );
    }
    throw error;
  }
}