import axios from "axios";
import { ProductProps } from "../types";


export const getProducts = async () => {
  const response = await axios.get("/api/products");
  console.log(response.data.data);
  return response.data;
};

export const createProduct = async (product: ProductProps) => {
  
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("category", product.category);
  formData.append("price", String(product.price));
  formData.append("stock", String(product.stock));
  formData.append("description", product.description);
  formData.append("createdAt", product.createdAt);

  if(product.img instanceof File){
    formData.append("image", product.img);
  }
  
  const response = await axios.post('/api/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data; 
};

export const editProduct = async (_id: string, product: ProductProps) => {
  try {
    const formData = new FormData();

    formData.append("_id", _id);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", String(product.price));
    formData.append("stock", String(product.stock));
    formData.append("description", product.description);
    formData.append("createdAt", product.createdAt);

    if (product.img instanceof File) {
      formData.append("image", product.img);
    }

    const response = await axios.put('/api/products', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.log("Error editProduct: ", error);
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
