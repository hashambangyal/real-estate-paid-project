import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createAdminToken } from "@/lib/auth";


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
    } = body;


    if (!email?.trim()) {
      return Response.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }


    if (!password) {
      return Response.json(
        {
          error: "Password is required",
        },
        {
          status: 400,
        }
      );
    }

    
    console.time("DB-CONNECTION");
    await prisma.$queryRaw`SELECT 1`;
        console.timeEnd("DB-CONNECTION");

      console.time("DB-QUERY");   
    const admin = await prisma.admin.findUnique({
      where: {
        email: email
          .trim()
          .toLowerCase(),
      },
    });
     console.timeEnd("DB-QUERY");
    if (!admin) {
      return Response.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    console.time("BCRYPT");
    
    const passwordMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    console.timeEnd("BCRYPT");
    if (!passwordMatch) {
      return Response.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }


    const token =
      await createAdminToken(admin);


    const response = NextResponse.json(
      {
        success: true,

        message:
          "Login successful",

        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
      {
        status: 200,
      }
    );


    response.cookies.set(
      "admin_token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24 ,
      }
    );


    return response;

  } catch (error) {

    console.error(
      "POST /api/auth/login error:",
      error
    );


    return Response.json(
      {
        error:
          "Failed to login",
      },
      {
        status: 500,
      }
    );
  }
}