import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProductCard: React.FC<Props> = ({
  name,
  category,
  price,
  stock,
  image,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const validImg =
    image && (image.startsWith("http") || image.startsWith("/"))
      ? image
      : "/default-product.png";

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-64 w-full flex items-center justify-center bg-slate-900">
        <Image
          src={validImg}
          alt={name}
          width={400}
          height={400}
          className="object-contain h-full p-4"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-sky-400 truncate">{name}</h3>
        <p className="text-gray-400 text-sm mb-3">{category}</p>

        <div className="flex justify-between text-sm text-gray-300 mb-4">
          <span>💰 ${price.toFixed(2)}</span>
          <span>📦 {stock} units</span>
        </div>

        <p className="text-xs text-gray-500">Added: {createdAt?.split("T")[0]}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onEdit}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md font-semibold"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;