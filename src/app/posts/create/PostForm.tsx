"use client";

import React, { useState } from "react";
import axios from "axios";
import { DOMAIN } from "@/helpers/constants";
import { toast } from "react-toastify";
import { SpinnerBtn } from "@/components/home/SpinnerStyles";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/uploads/UploadImage";
// import { Category } from "@prisma/client";

interface Props {
  authorId: string | undefined;
  // initCategories: Category[];
}

const PostForm = ({ authorId }: Props) => {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Category[]>(initCategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !title || !description || !category || !status) {
      toast.error("Please complete all fields");
    }

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/posts`, {
        title: title,
        description: description,
        category: category,
        image: image,
        author: authorId,
        drafted: status,
      });

      router.push("/posts");
      setLoading(false);
      toast.success("Post created successfully");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value === "draft");
  };

  const handleImageUpload = (url: string) => {
    setImage(url);
  };

  return (
    <div>
      <div className="flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-gray-200 mt-10 border-b-2 w-52 pb-2">
          Create a post
        </h2>
      </div>
      <div className="bg-gray-900 mt-10 flex items-center justify-center">
        <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <ImageUpload onUpload={handleImageUpload} />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-400"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-400"
              >
                Category
              </label>
              {/* <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select> */}
              <input onChange={(e) => setCategory(e.target.value)} type="text" />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-400"
              >
                Status
              </label>
              <select
                id="status"
                value={status ? "draft" : "publish"}
                onChange={handleStatusChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
                  loading
                    ? "bg-transparent"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? <SpinnerBtn /> : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
