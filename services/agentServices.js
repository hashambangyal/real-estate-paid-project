import { prisma } from "@/lib/prisma";

export async function createAgent(data) {
  const {
    name,
    email,
    phone,
    facebook,
    instagram,
    avatarUrl,
    bio,
  } = data;

  if (!name || !email || !phone) {
    throw new Error("Name, email and phone are required");
  }

  const agent = await prisma.agent.create({
    data: {
      name,
      email,
      phone,
      facebook,
      instagram,
      avatarUrl,
      bio,
    },
  });

  return agent;
}

export async function getAgents() {
  return await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAgentById(id) {
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const agent = await prisma.agent.findUnique({
    where: {
      id,
    },
  });

  if (!agent) {
    throw new Error("Agent not found");
  }

  return agent;
}

export async function updateAgent(id, data) {
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const {
    name,
    email,
    phone,
    facebook,
    instagram,
    avatarUrl,
    bio,
  } = data;

  const agent = await prisma.agent.update({
    where: {
      id,
    },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(facebook !== undefined && { facebook }),
      ...(instagram !== undefined && { instagram }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(bio !== undefined && { bio }),
    },
  });

  return agent;
}

export async function deleteAgent(id) {
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const agent = await prisma.agent.delete({
    where: {
      id,
    },
  });

  return agent;
}
