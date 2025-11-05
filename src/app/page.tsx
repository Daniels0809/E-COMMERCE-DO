"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    name: "Domótica Inteligente",
    desc: "Controla tu hogar con sistemas automatizados y asistentes virtuales.",
    icon: "",
  },
  {
    name: "Componentes Electrónicos",
    desc: "Encuentra placas, sensores y módulos para tus proyectos.",
    icon: "",
  },
  {
    name: "Robótica y Automatización",
    desc: "Motores, controladores y kits robóticos de última generación.",
    icon: "",
  },
];

const HomePage = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Efecto de fondo animado */}
      <motion.div
        className="absolute w-72 h-72 bg-sky-500/20 rounded-full blur-3xl top-10 left-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      ></motion.div>

      {/* HERO Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tecnología, Innovación y{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Automatización
          </span>
        </motion.h1>

        <motion.p
          className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Explora el futuro con nuestro e-commerce especializado en dispositivos,
          sensores, robótica y soluciones inteligentes para tu hogar o negocio.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/products"
            className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Explorar productos
          </Link>
          <Link
            href="/about"
            className="border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Conócenos
          </Link>
        </motion.div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-24 px-6 md:px-24 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Categorías destacadas
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-sky-500/10 hover:border-sky-400 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-slate-400 text-sm">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;

//crear rama develop y desplegarla tambien
