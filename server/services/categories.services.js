import { Categoria } from "../models/categories.js";
import { CategoryDTO } from "../DTO/categories.dto.js";

// Create Category
export async function createCategory(usuario_id, name_category) {
  try {
    await verifyCategory(name_category, usuario_id);

    const newCategoria = await Categoria.create({
      usuario_id,
      name_category,
    });
    return new CategoryDTO(
      newCategoria.id,
      newCategoria.name_category,
      newCategoria.createdAT,
      newCategoria.usuario_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all categories
export async function getAllCategories(usuario_id) {
  try {
    const categories = await Categoria.findAll({
      where: {
        usuario_id,
      },
    });
    return categories.map(
      (categories) =>
        new CategoryDTO(
          categories.id,
          categories.name_category,
          categories.createdAT,
          categories.usuario_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// get category
export async function getCategory(usuario_id, id) {
  try {
    const category = await Categoria.findOne({
      where: {
        usuario_id,
        id,
      },
    });
    if (category) {
      return new CategoryDTO(
        category.id,
        category.name_category,
        category.createdAT,
        category.usuario_id
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// Update category
export async function updateCategory(id, usuario_id, name_category) {
  try {
    const category = await Categoria.findOne({
      where: {
        id,
        usuario_id,
      },
    });
    category.name_category = name_category;
    await category.save();
    return new CategoryDTO(
      category.id,
      category.name_category,
      category.createdAT,
      category.usuario_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete Category
export async function deleteCategory(id, usuario_id) {
  try {
    await Categoria.destroy({
      where: {
        id,
        usuario_id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function verifyCategory(name_category, usuario_id) {
  const categoryFound = await Categoria.findOne({
    where: { name_category, usuario_id },
  });

  if (categoryFound) {
    throw new Error("Category already exists");
  }
}
