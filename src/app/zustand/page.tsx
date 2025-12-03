"use client";
import { usePersonStore } from "@/src/store/person/person.store";
import Link from "next/link";

export const Zustand = () => {
  const firstname = usePersonStore((state) => state.firstname);
  const lastname = usePersonStore((state) => state.lastname);
  const setFirstname = usePersonStore((state) => state.setFirstname);
  const setLastname = usePersonStore((state) => state.setLastname);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Hola {firstname} {lastname}
      </h1>

      <div className="flex flex-col space-y-4 mb-8">
        <input
          placeholder="Nombre"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-center">
        <Link href="/profile" className="text-black">
          <button className="bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Ir al perfil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Zustand;
