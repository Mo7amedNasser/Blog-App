import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db.config";
import { verifyToken } from "@/utils/verifyToken";
import { CreatePost } from "@/utils/dtos";
import { createPostSchema } from "@/utils/validations";
import { Post } from "@prisma/client";

/**
 * @method GET
 * @route  ~/api/posts
 * @dec    Get All Posts
 * @access public
 */
export async function GET() {
  try {
    const posts = await db.post.findMany();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

/**
 * @method POST
 * @route  ~/api/posts
 * @dec    Create New Post
 * @access private
 */
export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (user === null) {
      return NextResponse.json(
        { message: "Access denied, You can't create post without an account" },
        { status: 403 }
      );
    }

    const body = await req.json() as CreatePost;

    const validation = createPostSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const newPost: Post = await db.post.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        drafted: body.drafted,
        author: {
          connect: { id: user.id },
        },
        category: body.category
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};