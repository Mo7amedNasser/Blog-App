import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db.config";
import bcrypt from "bcryptjs";
import { LoginUser } from "@/utils/dtos";
import { loginSchema } from "@/utils/validations";
import { setJwtCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route  ~/api/users/login
 * @dec    Login User
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as LoginUser;

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique(
      { where: { email: body.email } }
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password'},
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    const cookie = setJwtCookie({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin
    });

    return NextResponse.json({ message: 'Authenticated' },
      {
        status: 200,
        headers: { "Set-Cookie": cookie }
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
