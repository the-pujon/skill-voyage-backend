const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Create Category
router.post('/', categoryController.createCategory);

// Get All Categories
router.get('/', categoryController.getAllCategories);

// Get Category by ID
router.get('/:categoryId', categoryController.getCategoryById);

// Update Category by ID
router.put('/:categoryId', categoryController.updateCategoryById);

// Delete Category by ID
router.delete('/:categoryId', categoryController.deleteCategoryById);

// Create SubCategory
router.post('/:categoryId/subcategories', categoryController.createSubCategory);

// Get All SubCategories of a Category
router.get('/:categoryId/subcategories', categoryController.getAllSubCategories);

// Get SubCategory by ID
router.get('/:categoryId/subcategories/:subcategoryId', categoryController.getSubCategoryById);

// Update SubCategory by ID
router.put('/:categoryId/subcategories/:subcategoryId', categoryController.updateSubCategoryById);

// Delete SubCategory by ID
router.delete('/:categoryId/subcategories/:subcategoryId', categoryController.deleteSubCategoryById);

module.exports = router;
