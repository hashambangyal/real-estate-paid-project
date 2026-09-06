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

    return Response.json(agent, {
      status: 200,
    });
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
    await requireAdmin()
    const { id } = await params;
    const body = await request.json();

    const agent = await updateAgent(id, body);

    return Response.json(agent, {
      status: 200,
    });
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
    console.error("PATCH /api/agents/[id] error:", error);

    return Response.json(
      { error: error.message || "Failed to update agent" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params;

    const agent = await deleteAgent(id);

    return Response.json(agent, {
      status: 200,
    });
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
    console.error("DELETE /api/agents/[id] error:", error);

    return Response.json(
      { error: error.message || "Failed to delete agent" },
      { status: 400 }
    );
  }
}