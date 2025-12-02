"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCart, removeFromCart, updateCart } from "@/src/services/cart";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
  };
  quantity: number;
}

const CartPage = () => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!session?.user?._id) return;

    const fetchCart = async () => {
      try {
        const cartData = await getCart(session.user._id);
        setCart(cartData.cart);
      } catch (error) {
        console.error("Error cargando carrito", error);
      }
    };
    fetchCart();
  }, [session?.user?._id]);

  if (status === "loading")
    return <p className="text-white p-10">{t("Loading session...")}</p>;

  if (status === "unauthenticated")
    return <p className="text-white p-10">{t("You must log in.")}</p>;

  const handleRemove = async (productId: string) => {
    if (!session?.user?._id) return;
    try {
      const updatedCart = await removeFromCart(session.user._id, productId);
      setCart(updatedCart.cart);
      toast.success(t("Product removed"));
    } catch (error) {
      console.error(error);
      toast.error(t("Could not remove product"));
    }
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (!session?.user?._id) return;
    if (quantity < 1) return;

    try {
      const updatedCart = await updateCart(session.user._id, productId, quantity);
      setCart(updatedCart.cart);
    } catch (error) {
      console.error(error);
      toast.error(t("Could not update product quantity"));
    }
  };

const totalPrice = cart.reduce(
  (sum, item) => sum + (item.productId?.price ?? 0) * item.quantity,
  0
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-14">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        {t("Your Cart")}
      </motion.h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          {t("You have no products in your cart.")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl shadow-lg flex flex-col items-center gap-4"
            >
              <div className="relative w-full h-48 flex items-center justify-center bg-black/40 rounded-xl overflow-hidden">
                <Image
                  src={item.productId.image || "/default-product.png"}
                  alt={item.productId.name}
                  width={300}
                  height={300}
                  className="object-contain h-full p-4"
                />
              </div>

              <h3 className="text-xl font-bold text-white text-center">
                {item.productId.name}
              </h3>

              <p className="text-gray-400 text-sm italic">
                {item.productId.category}
              </p>

              <div className="flex justify-between w-full items-center">
                <span className="font-semibold text-violet-200">
                  ${item.productId.price.toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.productId._id)}
                className="w-full py-1.5 rounded-md font-semibold text-sm bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white mt-3"
              >
                {t("Remove")}
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-10 text-right">
          <p className="text-xl font-bold text-gray-200">
            {t("Total")}:{" "}
            <span className="text-cyan-400">${totalPrice.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
