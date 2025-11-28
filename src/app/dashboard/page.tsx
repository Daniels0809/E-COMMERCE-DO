"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-gray-100 px-8 py-10">
      {/* Header */}
      <header className="mb-12 border-b border-slate-800 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent"
        >
          Dashboard — Imperium Perfums
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mt-2 text-sm"
        >
          Bienvenido{" "}
          <span className="font-medium text-slate-200">
            {session?.user?.name ?? "Administrador"}
          </span>
          . Gestiona productos, pedidos y actividad de tu boutique de perfumería.
        </motion.p>
      </header>

      {/* Métricas */}
      <section className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-16">
        {[
          {
            title: "Perfumes registrados",
            value: "128",
            color:
              "from-cyan-500/15 to-cyan-800/10 border-cyan-400/30 shadow-cyan-500/10",
          },
          {
            title: "Usuarios activos",
            value: "512",
            color:
              "from-purple-500/15 to-purple-800/10 border-purple-400/30 shadow-purple-500/10",
          },
          {
            title: "Pedidos del mes",
            value: "73",
            color:
              "from-pink-500/15 to-pink-800/10 border-pink-400/30 shadow-pink-500/10",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`
              p-6 rounded-2xl border backdrop-blur-xl 
              bg-gradient-to-br ${item.color}
              shadow-xl transition-all
            `}
          >
            <p className="text-sm text-slate-400">{item.title}</p>
            <h3 className="text-4xl font-bold mt-2 text-white tracking-tight">
              {item.value}
            </h3>
          </motion.div>
        ))}
      </section>

      {/* Actividad Reciente */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="
          bg-slate-900/40 rounded-2xl border border-slate-800 
          p-8 shadow-[0_0_20px_rgba(0,200,255,0.05)] 
          backdrop-blur-xl
        "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Actividad reciente
          </h2>

          <button className="text-sm bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
            Ver todo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="py-3">ID</th>
                <th className="py-3">Acción</th>
                <th className="py-3">Usuario</th>
                <th className="py-3">Fecha</th>
                <th className="py-3">Estado</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  id: 1,
                  action: "Nuevo perfume agregado",
                  user: "Admin",
                  date: "03 Nov 2025",
                  status: "Completado",
                },
                {
                  id: 2,
                  action: "Producto eliminado",
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
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-slate-800/70"
                >
                  <td className="py-4 text-slate-400">{row.id}</td>
                  <td className="py-4 text-slate-200">{row.action}</td>
                  <td className="py-4 text-slate-300">{row.user}</td>
                  <td className="py-4 text-slate-400">{row.date}</td>
                  <td className="py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium border
                        ${
                          row.status === "Completado"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/30"
                            : "bg-yellow-500/10 text-yellow-300 border-yellow-400/30"
                        }
                      `}
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
