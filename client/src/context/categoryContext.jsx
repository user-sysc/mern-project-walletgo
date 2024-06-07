import { createContext, useContext, useState } from "react";
import {
  createCategoryRequest,
  getCategoriesRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
} from "../api/category/categoryAuth";

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory is already in use");
  }
  return context;
};

export function CategoryProvider({ children }) {
  const [categories, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await getCategoriesRequest();
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (Categoria) => {
    const res = await createCategoryRequest(Categoria);
    console.log(res);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await deleteCategoryRequest(id);
      if (res.status == 204)
        setCategory(categories.filter((Categoria) => Categoria.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id, Categoria) => {
    try {
      await updateCategoryRequest(id, Categoria);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        createCategory,
        deleteCategory,
        updateCategory,
        getCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
