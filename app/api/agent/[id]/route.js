import {
  getAgentById,
  updateAgent,
  deleteAgent,
} from "@/services/agentServices";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const agent = await getAgentById(id);
    return Response.json(agent, { status: 200 });
  } catch (error) {
    console.error("GET /api/agents/[id] error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch agent" },
      { status: 404 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;

    const formData = await request.formData();

    const data = {
      name: formData.get("name") || undefined,
      email: formData.get("email") || undefined,
      phone: formData.get("phone") || undefined,
      facebook: formData.get("facebook") || undefined,
      instagram: formData.get("instagram") || undefined,
      bio: formData.get("bio") || undefined,
    };

    const imageFile = formData.get("image");
    const validImageFile =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

    const agent = await updateAgent(id, data, validImageFile);

    return Response.json(agent, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("PATCH /api/agents/[id] error:", error);
    return Response.json(
      { error: error.message || "Failed to update agent" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const agent = await deleteAgent(id);
    return Response.json(agent, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("DELETE /api/agents/[id] error:", error);
    return Response.json(
      { error: error.message || "Failed to delete agent" },
      { status: 400 }
    );
  }
}