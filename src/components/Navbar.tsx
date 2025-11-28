"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">

        {/* LOGO */}
        <Link href="/" className="group select-none">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:opacity-90 transition">
              Imperium
            </span>{" "}
            <span className="text-slate-300 group-hover:text-white transition">
              Perfums
            </span>
          </h1>
        </Link>

        {/* MENU */}
        {session?.user ? (
          <div className="flex items-center gap-6">

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="hover:text-cyan-400 transition font-medium"
            >
              Dashboard
            </Link>

            {/* Products */}
            <Link
              href="/products"
              className="hover:text-cyan-400 transition font-medium"
            >
              Productos
            </Link>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 hover:border-cyan-400/40 transition-all">
              <img
                src={session.user.image || "/default-avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border border-slate-600 shadow-md object-cover"
              />

              <div className="flex flex-col leading-tight max-w-[140px]">
                <span className="text-sm font-semibold text-white truncate">
                  {session.user.name?.split(" ")[0]}
                </span>
                <span className="text-xs text-slate-400 truncate">
                  {session.user.email}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 rounded-md text-sm font-medium bg-red-500/80 hover:bg-red-600 transition shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3 flex items-center">

            {/* Login */}
            <button
              onClick={() => signIn()}
              className="px-4 py-2 rounded-md font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition shadow-md"
            >
              Iniciar sesión
            </button>

            {/* Register */}
            <Link
              href="/register"
              className="px-4 py-2 rounded-md font-medium bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition shadow-md"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
