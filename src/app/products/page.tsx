"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Cámara Inteligente Wi-Fi 4K",
    category: "Seguridad y Automatización",
    price: 599000,
    img: "/products/camara.jpg",
    description:
      "Control remoto desde tu smartphone con visión nocturna y detección de movimiento.",
  },
  {
    id: 2,
    name: "Asistente Virtual NeoVoice",
    category: "Domótica y Voz",
    price: 429000,
    img: "/products/asistente.jpg",
    description:
      "Controla tus dispositivos inteligentes con comandos de voz y conecta tu hogar al futuro.",
  },
  {
    id: 3,
    name: "Sensor de Movimiento SmartSense",
    category: "Automatización",
    price: 199000,
    img: "/products/sensor.jpg",
    description:
      "Sensor PIR inalámbrico con conexión Wi-Fi y compatibilidad con Alexa y Google Home.",
  },
  {
    id: 4,
    name: "Bombillo RGB Inteligente",
    category: "Iluminación",
    price: 149000,
    img: "/products/bombillo.jpg",
    description:
      "Cambia el color de tu espacio con control desde app móvil o comandos de voz.",
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-10 py-10">

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          Bienvenido a <span className="text-cyan-400">TechStore</span>
        </motion.h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Donde la tecnología se encuentra con la innovación.  
          Descubre los dispositivos más modernos para un hogar más inteligente.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 backdrop-blur-md shadow-md hover:shadow-cyan-400/20 transition-all"
          >
            <div className="relative w-full h-56 bg-slate-900 rounded-xl overflow-hidden mb-4 group">
              <Image
                src={product.img}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 right-3 bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                {product.category}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-1 text-white tracking-wide">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-bold text-cyan-400">
                ${product.price.toLocaleString()}
              </span>
              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "#22d3ee",
                  color: "#0f172a",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-xl font-semibold shadow-md transition-all"
              >
                Añadir al carrito
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-20 text-gray-500 text-sm"
      >
        © 2025 <span className="text-cyan-400">TechStore</span> | Innovación y Tecnología para tu Hogar
      </motion.footer>
    </div>
  );
};

export default ProductsPage;
