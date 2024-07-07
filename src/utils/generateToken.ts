import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { JWTPayload } from "./types";

// Generate a JWT to encrypt the user data
export function generateJWT(jwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d"
  });

  return token;
};

// Set a cookie to store the JWT
export function setJwtCookie(jwtPayload: JWTPayload) : string {
  const token = generateJWT(jwtPayload);

  const cookie = serialize("_auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return cookie;
};
