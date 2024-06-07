import * as categoryService from "../services/categories.services.js";

// Create category
export async function createCategory(req, res) {
  const usuario_id = req.usuario.id;
  const { name_category } = req.body;
  try {
    const newCategory = await categoryService.createCategory(
      usuario_id,
      name_category
    );
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all categories
export async function getAllCategories(req, res) {
  const usuario_id = req.usuario.id;
  try {
    const categories = await categoryService.getAllCategories(usuario_id);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Category
export async function getCategory(req, res) {
  const usuario_id = req.usuario.id;
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(usuario_id, id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update category
export async function updateCategory(req, res) {
  const usuario_id = req.usuario.id;
  const { id } = req.params;
  const { name_category } = req.body;
  try {
    const categoryUpdate = await categoryService.updateCategory(
      id,
      usuario_id,
      name_category
    );
    res.json(categoryUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete category
export async function deleteCategory(req, res) {
  const usuario_id = req.usuario.id;
  const { id } = req.params;
  try {
    await categoryService.deleteCategory(id, usuario_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
