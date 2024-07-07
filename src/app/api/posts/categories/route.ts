import { NextResponse } from "next/server";
import { db } from "@/lib/db.config";

/**
 * @method GET
 * @route  ~/api/posts/categories
 * @dec    Get All Categories
 * @access private
 */
// export async function GET() {
//   try {
//     const categories = await db.category.findMany();

//     return NextResponse.json(categories, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };