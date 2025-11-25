"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  mode: "create" | "edit" | "delete";
  perfume: {
    _id?: string;
    name: string;
    category: string;
    price: number;
    img: string | File;
    stock: number;
    description: string;
    createdAt: string;
  };

  setPerfume: React.Dispatch<
    React.SetStateAction<{
      _id?: string;
      name: string;
      category: string;
      price: number;
      img: string | File;
      stock: number;
      description: string;
      createdAt: string;
    }>
  >;
}

export const PerfumeModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  perfume,
  setPerfume,
}) => {
  if (!isOpen) return null;
  return (
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-300/60 via-gray-400/40 to-gray-500/30 backdrop-blur-md transition-all duration-300">
      <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-200 relative animate-fadeIn">
        {/* Título */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {mode === "create"
            ? "Crear Nuevo Producto"
            : mode === "edit"
            ? "Editar Producto"
            : "Eliminar Producto"}
        </h2>

        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={perfume.name}
              onChange={(e) => setPerfume({ ...perfume, name: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="perfume Title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={perfume.category}
              onChange={(e) =>
                setPerfume({
                  ...perfume,
                  category: e.target.value,
                })
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Magic, Drama, etc..."
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={perfume.price}
              onChange={(e) =>
                setPerfume({ ...perfume, price: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-lg px-3 py-1 w-24 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPerfume({ ...perfume, img: file });
                }
              }}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {mode === "edit" &&
              typeof perfume.img === "string" &&
              perfume.img.startsWith("http") && (
                <img
                  src={perfume.img}
                  alt="Vista previa"
                  className="mt-2 w-24 h-24 object-cover rounded-lg border"
                />
              )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={perfume.stock}
              onChange={(e) =>
                setPerfume({ ...perfume, stock: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-lg px-3 py-1 w-24 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/*Description*/}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={perfume.description}
              onChange={(e) =>
                setPerfume({ ...perfume, description: String(e.target.value) })
              }
              className="border border-gray-300 rounded-lg px-3 py-1 w-24 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* CreatedAt */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="text"
              value={perfume.createdAt}
              onChange={(e) =>
                setPerfume({ ...perfume, createdAt: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-1 w-40 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-all"
            >
              Cancelar
            </button>

            {mode === "delete" ? (
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
              >
                Confirmar Eliminación
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                  mode === "create"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {mode === "create"
                  ? "Crear Producto"
                  : mode === "edit"
                  ? "Actualizar Producto"
                  : mode === "delete"
                  ? "Eliminar Producto"
                  : ""}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
