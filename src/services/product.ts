import axios from "axios";
import { ProductProps } from "../types";


export const getProducts = async () => {
  const response = await axios.get("/api/products");
  console.log(response.data.data);
  return response.data;
};

export const createProduct = async (product: ProductProps) => {
  const response = await axios.post('/api/products', product);
  return response.data; 
};

export const editProduct = async (_id: string, product: ProductProps) => {
  try {
    const response = await axios.put(`/api/products`, {_id, ...product});
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteProduct = async (_id: string) => {
  try {
    const response = await axios.delete(`/api/products/${_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
