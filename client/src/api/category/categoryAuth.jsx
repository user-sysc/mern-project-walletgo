import axios from "../axios";

export const getCategoriesRequest = () => axios.get("/categories");
export const getCategoryRequest = (id) => axios.get(`/categories/${id}`);
export const createCategoryRequest = (Categoria) =>
  axios.post("/categories", Categoria);
export const deleteCategoryRequest = (id) => axios.delete(`/categories/${id}`);
export const updateCategoryRequest = (id, Categoria) =>
  axios.put(`/categories/${id}`, Categoria);
