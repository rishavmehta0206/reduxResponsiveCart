import axios from "axios";
const API_URL = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const fetchData = {
  fetchProducts,
};

export default fetchData;