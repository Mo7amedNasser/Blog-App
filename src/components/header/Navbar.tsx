import React from 'react';
import Link from 'next/link';
import { cookies } from "next/headers";
import { verifyTokenForClient } from "@/utils/verifyToken";

const Navbar = () => {
  const token = cookies().get("_auth_token")?.value || "";
  const payload = verifyTokenForClient(token);

  return (
    <nav className="bg-slate-900 border-b-2 border-slate-200 shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
        </Link>
        <ul className="flex items-center space-x-2 md:space-x-4">
          <li>
            <Link href="/posts" className="text-white hover:text-blue-300">Posts</Link>
          </li>
          {payload ? (
            <>
              <li>
                <Link href="/profile" className="text-white hover:text-blue-300">Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-white hover:text-blue-300">Login</Link>
              </li>
              <li>
                <Link href="/register" className="text-white hover:text-blue-300">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
