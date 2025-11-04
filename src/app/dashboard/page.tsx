"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 px-8 py-10">
      {/* Header */}
      <header className="mb-10 border-b border-slate-800 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight"
        >
          Panel de Administración
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mt-1 text-sm"
        >
          Bienvenido,{" "}
          <span className="font-medium text-slate-200">
            {session?.user?.name ?? "Administrador"}
          </span>{" "}
          — gestiona los datos de tu tienda tecnológica
        </motion.p>
      </header>

      {/* Métricas */}
      <section className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-12">
        {[
          {
            title: "Productos",
            value: "128",
            color: "from-blue-500/20 to-blue-700/10 border-blue-500/30",
          },
          {
            title: "Usuarios",
            value: "512",
            color: "from-purple-500/20 to-purple-700/10 border-purple-500/30",
          },
          {
            title: "Pedidos",
            value: "73",
            color: "from-emerald-500/20 to-emerald-700/10 border-emerald-500/30",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-5 rounded-xl border bg-gradient-to-br ${item.color} backdrop-blur-md shadow-md`}
          >
            <p className="text-sm text-slate-400">{item.title}</p>
            <h3 className="text-3xl font-bold mt-2 text-white">{item.value}</h3>
          </motion.div>
        ))}
      </section>

      {/* Tabla de gestión */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Actividad reciente</h2>
          <button className="text-sm bg-slate-800 px-3 py-1 rounded-md hover:bg-slate-700 transition-colors">
            Ver todo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Acción</th>
                <th className="py-2">Usuario</th>
                <th className="py-2">Fecha</th>
                <th className="py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1,
                  action: "Nuevo producto agregado",
                  user: "Admin",
                  date: "03 Nov 2025",
                  status: "Completado",
                },
                {
                  id: 2,
                  action: "Usuario eliminado",
                  user: "Admin",
                  date: "02 Nov 2025",
                  status: "Pendiente",
                },
                {
                  id: 3,
                  action: "Pedido actualizado",
                  user: "Admin",
                  date: "01 Nov 2025",
                  status: "Completado",
                },
              ].map((row) => (
                <motion.tr
                  key={row.id}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-slate-800/70"
                >
                  <td className="py-3 text-slate-400">{row.id}</td>
                  <td className="py-3">{row.action}</td>
                  <td className="py-3 text-slate-300">{row.user}</td>
                  <td className="py-3 text-slate-400">{row.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Completado"
                          ? "bg-green-500/10 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardPage;
