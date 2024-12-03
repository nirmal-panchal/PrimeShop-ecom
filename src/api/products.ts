import axios from "axios";
import { Product } from "../types";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
