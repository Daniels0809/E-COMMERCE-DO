"use client";
import { usePersonStore } from "@/src/store/person/person.store";
import Link from "next/link";

export const Profile = () => {
  const firstname = usePersonStore((state) => state.firstname);
  const lastname = usePersonStore((state) => state.lastname);

  return (
    <div className="m-10 max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Perfil del Usuario
      </h1>

      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700">
          <span className="font-semibold">Nombre:</span>{" "}
          {firstname || "No definido"}{" "}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium text-gray-700">
          <span className="font-semibold">Apellido:</span>{" "}
          {lastname || "No definido"}{" "}
        </p>
      </div>
      <div className="text-center">
        <Link href="/zustand" className="text-black">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Ir al zustand
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
