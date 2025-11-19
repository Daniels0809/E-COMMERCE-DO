'use client'
import React, { useState } from "react";
import axios from "axios";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        role: role,
        password: pass,
      });

      setSuccessMsg("¡Registro exitoso! Ya puedes iniciar sesión.");
      setName("");
      setEmail("");
      setPass("");
      setRole("user")
    } catch (error: any) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message || "Hubo un error al registrarte."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro</h1>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            placeholder="Tu nombre"
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            placeholder="email@correo.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={pass}
            placeholder="********"
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-500 text-sm font-medium">{successMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:bg-blue-400"
        >
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage