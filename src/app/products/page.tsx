"use client";
import ProductCard from "@/src/components/ProductCard";
import { getProducts } from "@/src/services/product";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProductProps {
  _id?: string;
  name: string;
  category: string;
  price: number;
  img: string;
  stock: number;
  description: string;
  createdAt: string;
}

interface DataProductsResponse {
  ok: boolean;
  data: ProductProps[];
}

const ProductsPage = () => {
  const [dataProducts, setDataProducts] = useState<DataProductsResponse>({
    ok: false,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setDataProducts(products);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-14">

      {/* 🔥 HEADER / HERO */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Imperium Perfums
        </h1>

        <p className="mt-3 text-lg text-gray-300 max-w-xl mx-auto font-light">
          El poder de una esencia eterna.
        </p>

        {/* línea decorativa futurista */}
        <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-cyan-500/50 shadow-md" />
      </motion.div>

      {/* 🌐 GRILLA DE PRODUCTOS */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {dataProducts.data?.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 0px 35px 8px rgba(0,180,255,0.25)"
            }}
            transition={{ duration: 0.35 }}
            className="
              relative group 
              bg-slate-900/40 border border-slate-700/50 
              rounded-3xl p-6 backdrop-blur-xl 
              shadow-lg hover:border-cyan-400/40 
              transition-all overflow-hidden
            "
          >
            {/* Glow interno */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl transition-all"></div>

            <ProductCard
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              img={product.img}
              description={product.description}
              createdAt={product.createdAt}
              onEdit={() => openEditModal(product)}
              onDelete={() => deleteProduct(product._id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductsPage;
