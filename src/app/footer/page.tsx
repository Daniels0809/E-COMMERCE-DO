"use client";

import Link from "next/link";
import { SiInstagram, SiFacebook, SiYoutube, SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-14 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-3 text-white">
            Imperium Perfums
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Perfumería de lujo, aromas exclusivos y experiencias olfativas inolvidables.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Navegación</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-cyan-400 transition">Inicio</Link></li>
            <li><Link href="/products" className="hover:text-cyan-400 transition">Perfumes</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400 transition">Nosotros</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Soporte</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-cyan-400 transition">Preguntas frecuentes</Link></li>
            <li><Link href="#" className="hover:text-cyan-400 transition">Política de envíos</Link></li>
            <li><Link href="#" className="hover:text-cyan-400 transition">Garantías</Link></li>
            <li><Link href="#" className="hover:text-cyan-400 transition">Términos y condiciones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Síguenos</h3>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <SiInstagram size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <SiFacebook size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <SiTiktok size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <SiYoutube size={22} />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Imperium Perfums — Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
