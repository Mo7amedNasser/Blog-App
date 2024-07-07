"use server";

import { DOMAIN } from "@/helpers/constants";
import { Post, Category } from "@prisma/client";

// Fetch all posts from [~/api/posts]
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${DOMAIN}/api/posts`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching posts: ${error}`);
  }
};

// Fetch all categories from [~/api/posts/categories]
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${DOMAIN}/api/posts/categories`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};
