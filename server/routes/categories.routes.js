import * as CategoryController from "../controllers/categories.controller.js";
import { userRequeried } from "../middlewares/user.middlewares.js";
import { Router } from "express";

const router = Router();

router.post("/category", userRequeried, CategoryController.createCategory); //create category
router.get("/categories", userRequeried, CategoryController.getAllCategories); // get all categories
router.get("/categories/:id", userRequeried, CategoryController.getCategory); // get category
router.put("/categories/:id", userRequeried, CategoryController.updateCategory); // update category
router.delete(
  "/categories/:id",
  userRequeried,
  CategoryController.deleteCategory
); // delete category

export default router;
