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
import { useSession } from "next-auth/react";
import { getCart, addToCart } from "@/src/services/cart";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


interface ProductProps {
  _id?: string;
  name: string;
  category: string;
  price: number;
  image: string | File;
  stock: number;
  description: string;
  createdAt: string;
}

interface DataProductsResponse {
  ok: boolean;
  data: ProductProps[];
  totalPages: number;
}

const ProductsPage = () => {
  const { t } = useTranslation();
  const [dataProducts, setDataProducts] = useState<DataProductsResponse>({
    ok: false,
    data: [],
    totalPages: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductProps>({
    name: "",
    category: "",
    price: 0,
    image: "",
    stock: 0,
    description: "",
    createdAt: "",
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);


  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts({
        page,
        search,
        category: categoryFilter,
      });
      setDataProducts(products);
    };
    fetchData();
  }, [page, search, categoryFilter]);

  useEffect(() => {
  const fetchCart = async () => {
    try {
      if (session?.user?._id) {
        const cartData = await getCart(session.user._id);
        setCart(cartData.cart);
      }
    } catch (error) {
      console.error("Error al cargar carrito", error);
    }
  };
  if (session?.user?._id) {
    fetchCart();
  }
}, [session]);


  if (status === "loading") {
    return <p className="text-white p-10">Cargando sesión...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="text-white p-10">Debes iniciar sesión.</p>;
  }

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct({
      name: "",
      category: "",
      price: 0,
      image: "",
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
      if (!selectedProduct._id) return;
      await editProduct(selectedProduct._id, selectedProduct);
    } else if (modalMode === "delete") {
      if (!selectedProduct._id) return;
      await deleteProduct(selectedProduct._id);
    }

    const products = await getProducts({
      page,
      search,
      category: categoryFilter,
    });
    setDataProducts(products);
    setIsModalOpen(false);
  };

const handleAddToCart = async (productId: string) => {
    console.log("### CLICK ADD TO CART ###");
  console.log("Session", session?.user);
  console.log("POST a:", `/api/cart?userId=${session?.user?._id}`);
  

  try {
    if (!session?.user?._id) return;

    const updatedCart = await addToCart(session.user._id, productId, 1);

    console.log("Carrito actualizado:", updatedCart);
    setCart(updatedCart.cart);

    toast.success(
      <div>
        Producto agregado al carrito.{" "}
        <a href="/cart" className="underline text-cyan-400">
          Ver carrito
        </a>
      </div>
    );
  } catch (error) {
    console.error("Error agregando al carrito", error);
    toast.error("No se pudo agregar al carrito");
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Imperium Perfums
        </h1>
        <p className="mt-3 text-lg text-gray-300 max-w-xl mx-auto font-light">
          {t("The power of an eternal essence.")}
        </p>
        <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-cyan-500/50 shadow-md" />
      </motion.div>

      {/* Admin create button */}
      {isAdmin && (
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-300"
          >
            {t("Create Product")}
          </button>
        </div>
      )}

      {/* Filtros */}
<div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
  {/* Input de búsqueda */}
  <div className="relative w-full sm:w-64">
    <input
      type="text"
      placeholder={t("Search products...")}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-md"
    />
    {/* Icono de búsqueda */}
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>
    </span>
  </div>

</div>

      {/* Productos */}
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
          <div
            key={product._id}
            className="relative group bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl shadow-lg hover:border-cyan-400/40 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl transition-all"></div>
            <ProductCard
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              image={typeof product.image === "string" ? product.image : ""}
              description={product.description}
              createdAt={product.createdAt}
              onEdit={isAdmin ? () => openEditModal(product) : undefined}
              onDelete={isAdmin ? () => openDeleteModal(product) : undefined}
              isAdmin={isAdmin}
              onAddToCart={() => handleAddToCart(product._id!)}
            />
          </div>
        ))}
      </motion.div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400 disabled:opacity-50"
        >
          {t("Previous")}
        </button>

        <span className="px-4 py-2 text-white">
          {t("Page")} {page} {t("of")} {dataProducts.totalPages || 1}
        </span>

        <button
          disabled={page === dataProducts.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400 disabled:opacity-50"
        >
          {t("Next")}
        </button>
      </div>

      {/* Modal */}
      {isAdmin && (
        <PerfumeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          mode={modalMode}
          perfume={selectedProduct}
          setPerfume={setSelectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
