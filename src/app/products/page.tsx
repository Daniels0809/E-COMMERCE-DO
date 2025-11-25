"use client";
import ProductCard from "@/src/components/ProductCard";
import { PerfumeModal } from "@/src/components/ProductModal";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "@/src/services/product";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { string } from "yup";

interface ProductProps {
  _id?: string;
  name: string;
  category: string;
  price: number;
  img: string | File;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductProps>({
    name: "",
    category: "",
    price: 0,
    img: "",
    stock: 0,
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setDataProducts(products);
    };
    fetchData();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct({
      name: "",
      category: "",
      price: 0,
      img: "",
      stock: 0,
      description: "",
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductProps) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openDeleteModal = (product: ProductProps) => {
    setModalMode("delete");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (modalMode === "create") {
      await createProduct(selectedProduct);
    } else if (modalMode === "edit") {
      if (!selectedProduct._id) {
        console.warn("No se puede editar un producto sin un _id");
        return;
      }
      await editProduct(selectedProduct._id, selectedProduct);
    } else if (modalMode === "delete") {
      if (!selectedProduct._id) {
        console.log("No se puede eliminar el producto sin _id");
        return;
      }
      console.log(selectedProduct._id)
      await deleteProduct(selectedProduct._id);
    }

    const products = await getProducts();
    setDataProducts(products);

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-14">
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

        <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-cyan-500/50 shadow-md" />
      </motion.div>

      <div className="mb-10">
        <button
          onClick={openCreateModal}
          className="mb-10 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold"
        >
          Crear producto
        </button>
      </div>
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
              boxShadow: "0px 0px 35px 8px rgba(0,180,255,0.25)",
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
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl transition-all"></div>

            <ProductCard
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              img={typeof product.img === "string" ? product.img : ""}
              description={product.description}
              createdAt={product.createdAt}
              onEdit={() => openEditModal(product)}
              onDelete={() => openDeleteModal(product)}
            />
          </motion.div>
        ))}
      </motion.div>

      <PerfumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        perfume={selectedProduct}
        setPerfume={setSelectedProduct}
      />
    </div>
  );
};

export default ProductsPage;
