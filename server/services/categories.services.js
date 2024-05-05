import { Category } from "../models/categories.js";
import { CategoryDto } from "../DTO/categories.dto.js";

export async function createCategory(categoryData) {
  try {
    const newCategory = await Category.create(categoryData);
    return new CategoryDto(
      newCategory.id,
      newCategory.name,
      newCategory.createdAT,
      newCategory.user_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCategoryById(id) {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      return new CategoryDto(
        category.id,
        category.name,
        category.createdAT,
        category.user_id
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCategories() {
  try {
    const categories = await Category.findAll();
    return categories.map(
      (category) =>
        new CategoryDto(
          category.id,
          category.name,
          category.createdAT,
          category.user_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCategory(id, categoryData) {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      Object.assign(category, categoryData);
      await category.save();
      return new CategoryDto(
        category.id,
        category.name,
        category.createdAT,
        category.user_id
      );
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCategory(id) {
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
