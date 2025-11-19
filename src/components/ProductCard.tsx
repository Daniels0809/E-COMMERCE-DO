import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  category: string;
  price: number;
  stock: number;
  img?: string;
  description: string;
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProductCard: React.FC<Props> = ({
  name,
  category,
  price,
  stock,
  img,
  description,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const validImg =
    img && (img.startsWith("http") || img.startsWith("/"))
      ? img
      : "/default-product.png";

  return (
    <div
      className="
    group
    relative
    bg-gradient-to-br from-[#050509] via-[#0c0f18] to-[#07070d]
    rounded-3xl border border-violet-500/10  shadow-[0_0_35px_rgba(0,0,0,0.7)]
    overflow-hidden  transition-all duration-700 hover:shadow-0_0_45px_rgba(140,80,255,0.35)]  hover:border-violet-400/30
    hover:-translate-y-2"
    >
      {/* LUZ SUPERIOR */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-violet-500/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

      {/* AURA INTERIOR */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,60,255,0.12),transparent_70%)] opacity-70 pointer-events-none" />

      {/* Imagen */}
      <div className="relative h-64 w-full flex items-center justify-center bg-black/40">
        <Image
          src={validImg}
          alt={name}
          width={480}
          height={480}
          className="
        object-contain h-full p-6
        transition-all duration-500
        group-hover:scale-105 
        group-hover:drop-shadow-[0_0_28px_rgba(120,60,255,0.35)]
      "
        />

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,45,255,0.25),transparent_75%)] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        {/* NOMBRE */}
        <h3
          className="text-xl font-bold tracking-wide bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
        >
          {name}
        </h3>

        <p className="text-violet-300/70 text-sm mb-3 italic tracking-wide">
          {category}
        </p>

        {/* PRECIO + STOCK */}
        <div className="flex justify-between text-sm mb-3">
          <span className="font-semibold text-violet-200 text-base">
            ${price.toFixed(2)}
          </span>
          <span className="text-gray-400">{stock} units</span>
        </div>

        {/* DESCRIPCIÓN */}
        <span className="block text-gray-300/90 text-sm mb-3 leading-relaxed tracking-wide">
          {description}
        </span>

        <p className="text-xs text-gray-500 opacity-70 mb-3">
          Added: {createdAt?.split("T")[0]}
        </p>
        {/* BOTÓN AÑADIR */}
        <button
          onClick={() => console.log("Add to cart:", name)}
          className="
          w-full py-1.5 rounded-md font-semibold text-sm bg-gradient-to-r from-blue-700 to-violet-700 hover:from-blue-600 hover:to-violet-600 shadow-[0_0_10px_rgba(120,60,255,0.25)] hover:shadow-0_0_18px_rgba(120,60,255,0.45)] transition-all duration-400 text-white tracking-wide mb-4"
        >
          Añadir al carrito
        </button>

        {/* BOTONES ADMIN */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="
      flex-1 
      py-1.5
      rounded-md 
      font-semibold 
      text-sm
      bg-gradient-to-r from-violet-600 to-blue-600
      hover:from-violet-500 hover:to-blue-500
      transition-all duration-300
      text-white tracking-wide
    "
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="
      flex-1 
      py-1.5
      rounded-md 
      font-semibold 
      text-sm
      bg-gradient-to-r from-red-700 to-red-800
      hover:from-red-600 hover:to-red-700
      transition-all duration-300
      text-white tracking-wide
    "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
