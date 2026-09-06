import {
  getAgents,
  createAgent,
} from "@/services/agentServices";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET() {
  try {
    const agents = await getAgents();

    return Response.json(agents, {
      status: 200,
    });
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
    await requireAdmin()
    const body = await request.json();

    const agent = await createAgent(body);

    return Response.json(agent, {
      status: 201,
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
    console.error("POST /api/agents error:", error);

    return Response.json(
      { error: error.message || "Failed to create agent" },
      { status: 400 }
    );
  }
}