import {
  getAgents,
  createAgent,
} from "@/services/agentServices";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET() {
  try {
    const agents = await getAgents();
    return Response.json(agents, { status: 200 });
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return Response.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await requireAdmin();

    const formData = await request.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      facebook: formData.get("facebook") || undefined,
      instagram: formData.get("instagram") || undefined,
      bio: formData.get("bio") || undefined,
    };

    const imageFile = formData.get("image");
    const validImageFile =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

    const agent = await createAgent(data, validImageFile);

    return Response.json(agent, { status: 201 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/agents error:", error);
    return Response.json(
      { error: error.message || "Failed to create agent" },
      { status: 400 }
    );
  }
}