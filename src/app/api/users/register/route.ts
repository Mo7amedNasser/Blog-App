import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db.config";
import { RegisterUser } from "@/utils/dtos";
import { registerSchema } from "@/utils/validations";
import bcrypt from "bcryptjs";
import { setJwtCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route  ~/api/users/register
 * @dec    Create New User
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as RegisterUser;

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { message: "This user is already registered." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const newUser = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: password,
      },
    });

    const cookie = setJwtCookie({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      admin: newUser.isAdmin
    });

    return NextResponse.json(
      {
        ...newUser,
        message: "Registered & Authenticated"
      },
      {
        status: 201,
        headers: { "Set-Cookie": cookie }
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
