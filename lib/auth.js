import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);


export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}


export async function createAdminToken(admin) {
  return await new SignJWT({
    adminId: admin.id,
    email: admin.email,
    role: "ADMIN",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}


export async function verifyAdminToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload;
  } catch {
    return null;
  }
}


export async function getCurrentAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    "admin_token"
  )?.value;

  if (!token) {
    return null;
  }

  return await verifyAdminToken(token);
}


export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin || admin.role !== "ADMIN") {
    throw new UnauthorizedError();
  }

  return admin;
}