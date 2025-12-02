import axios from "axios";

export const getCart = async (userId: string) => {
  const res = await axios.get(`/api/cart?userId=${userId}`);
  return res.data;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  console.log(productId)
  const res = await axios.post(`/api/cart?userId=${userId}`, {
    productId,
    quantity,
  });

  return res.data;
};

export const updateCart = async (userId: string, productId: string, quantity: number) => {
  const res = await axios.patch(`/api/cart?userId=${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (userId: string, productId: string) => {
  const res = await axios.delete(`/api/cart?userId=${userId}`, {
    data: { productId },
  });
  return res.data;
};

