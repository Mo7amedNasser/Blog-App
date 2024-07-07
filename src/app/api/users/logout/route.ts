import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @route  ~/api/users/logout
 * @dec    Logout User
 * @access public
 */
export function GET() {
  try {
    cookies().delete("_auth_token");

    return NextResponse.json(
      { message: "User Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
