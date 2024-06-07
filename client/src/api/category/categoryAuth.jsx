import axios from "../axios.jsx";

export const createCategoryRequest = (Categoria) =>
  axios.post("/category", Categoria);
export const getCategoriesRequest = () => axios.get("/categories");
export const getCategoryRequest = (id) => axios.get(`/categories/${id}`);
export const deleteCategoryRequest = (id) => axios.delete(`/categories/${id}`);
export const updateCategoryRequest = (id, Categoria) =>
  axios.put(`/categories/${id}`, Categoria);
