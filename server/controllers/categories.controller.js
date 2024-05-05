import * as CategoriesService from "../services/categories.services.js";

export async function getCategories(req, res, next) {
  try {
    const categories = await CategoriesService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await CategoriesService.getCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const category = await CategoriesService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const updatedCategory = await CategoriesService.updateCategory(
      req.params.id,
      req.body
    );
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await CategoriesService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
