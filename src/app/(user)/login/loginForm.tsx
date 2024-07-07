"use client";

import React, { useState } from "react";
import axios from "axios";
import { DOMAIN } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SpinnerBtn } from "@/components/home/SpinnerStyles";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });

      router.replace("/");
      setLoading(false);

      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-48 mx-auto">
      <form
        onSubmit={formSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-700 border-b-2 w-fit pb-2">
            Login
          </h2>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-slate-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            placeholder="email@business.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-slate-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-gray-800"
            placeholder="••••••"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
            loading
              ? "bg-transparent"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? <SpinnerBtn /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
