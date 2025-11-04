"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 text-white">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <h1 className="text-xl font-semibold tracking-wide">
            <span className="text-sky-400">Next</span>
            <span className="ml-1 font-bold">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
          </h1>
        </Link>

        {/* MENU */}
        {session?.user ? (
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="hover:text-sky-400 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/products"
              className="hover:text-sky-400 transition font-medium"
            >
             Products
            </Link>

            <div className="flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-700 transition">
              <img
                src={session.user.image || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full border border-slate-600 shadow-sm"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">
                  {session.user.name?.split(" ")[0]}
                </span>
                <span className="text-xs text-slate-400 truncate w-28">
                  {session.user.email}
                </span>
              </div>
            </div>

            <button
              onClick={async () => {
                await signOut({ callbackUrl: "/" });
              }}
              className="bg-red-500 hover:bg-red-600 transition px-3 py-1.5 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-sky-500 hover:bg-sky-600 transition px-4 py-2 rounded-md font-medium shadow-md"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
