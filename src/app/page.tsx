"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../components/button/Button";

const categories = [
  {
    name: "Perfumes Exclusivos",
    desc: "Fragancias premium hechas con ingredientes refinados y de alta calidad.",
    icon: "✨",
  },
  {
    name: "Colecciones de Lujo",
    desc: "Ediciones limitadas y piezas únicas para amantes de la alta perfumería.",
    icon: "💎",
  },
  {
    name: "Fragancias Unisex",
    desc: "Aromas versátiles, modernos y profundamente sofisticados.",
    icon: "🌙",
  },
];

const HomePage = () => {
  const handleClick = () => console.log("Clicked!");

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Efecto de fondo animado */}
      <motion.div
        className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      ></motion.div>

      {/* HERO Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          La Esencia del{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Lujo y la Elegancia
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Descubre perfumes de autor, fragancias exclusivas y colecciones únicas
          seleccionadas para los amantes de la verdadera alta perfumería.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/products"
            className="
              px-8 py-3 rounded-xl font-semibold 
              text-white 
              bg-gradient-to-r from-cyan-500 to-purple-600
              hover:from-cyan-400 hover:to-purple-500
              shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40
              transition-all
            "
          >
            Explorar fragancias
          </Link>
          <Link
            href="/about"
            className="
              px-8 py-3 rounded-xl font-semibold
              border border-cyan-400 text-cyan-300
              hover:bg-cyan-400/20 hover:border-cyan-300
              transition-all
            "
          >
            Nuestra historia
          </Link>
        </motion.div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-24 px-6 md:px-24 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Colecciones destacadas
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="
                bg-slate-900/40 border border-slate-700/40
                rounded-3xl p-8 text-center backdrop-blur-xl
                shadow-lg hover:border-cyan-400/40
                hover:shadow-[0_0_25px_6px_rgba(0,200,255,0.15)]
                transition-all
              "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-5">{cat.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {cat.name}
              </h3>
              <p className="text-gray-400 text-sm">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
