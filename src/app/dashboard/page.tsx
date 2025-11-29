"use client";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 px-6 py-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Bienvenido {session?.user?.name ?? "Administrador"}
        </p>
      </header>

      {/* Métricas básicas */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="p-5 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Productos</p>
          <h2 className="text-2xl font-semibold mt-1">—</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Usuarios</p>
          <h2 className="text-2xl font-semibold mt-1">—</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Pedidos</p>
          <h2 className="text-2xl font-semibold mt-1">—</h2>
        </div>
      </section>

      {/* Tabla simple */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Actividad reciente</h2>
          <button className="text-sm bg-slate-800 text-white px-3 py-1.5 rounded-md">
            Ver todo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2 text-left">ID</th>
                <th className="py-2 text-left">Acción</th>
                <th className="py-2 text-left">Usuario</th>
                <th className="py-2 text-left">Fecha</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100">
                <td className="py-3">—</td>
                <td className="py-3">Sin datos</td>
                <td className="py-3">—</td>
                <td className="py-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
