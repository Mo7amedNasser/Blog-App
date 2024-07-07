import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

// Verify Token For API End-Point
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const authToken = request.cookies.get("_auth_token");
    const token = authToken?.value as string;

    if (!token) return null;

    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
};

// Verify Token For Client Side (Website)
export function verifyTokenForClient(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    if (!userPayload) return null;

    return userPayload;
  } catch (error) {
    return null;
  }
};
