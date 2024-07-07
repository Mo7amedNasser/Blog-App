import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }).min(2).max(15),
  email: z.string({ message: "Email is required" }).min(3).max(20).email(),
  password: z.string({ message: "Password is required" }).min(6, { message: "The password should be longer than 6 characters." }),
});

export const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).min(3).max(20).email(),
  password: z.string({ message: "Password is required" }).min(6),
});

export const createPostSchema = z.object({
  title: z.string({ message: "Title is required" })
  .min(2, { message: "Title should be greater than 2 characters" })
  .max(50, { message: "Title shouldn't be greater than 50 characters" }),
  description: z.string({ message: "Description is required" }).min(10).max(500),
  category: z.string({ message: "Category is required" }).min(2).max(20),
  image: z.string({ message: "Image is required" }),
  completed: z.boolean().optional(),
  author: z.string({ message: "Author ID is required" }),
});