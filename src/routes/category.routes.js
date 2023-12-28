const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

const {verifyAdmin, verifyJWT} = require('../middlewares/auth')

// Create Category
router.post('/',verifyJWT, categoryController.createCategory);

// Get All Categories
router.get('/', categoryController.getAllCategories);

// Get Category by ID
router.get('/:categoryId', categoryController.getCategoryById);

// Update Category by ID
router.put('/:categoryId',verifyJWT, categoryController.updateCategoryById);

// Delete Category by ID
router.delete('/:categoryId',verifyJWT, categoryController.deleteCategoryById);

// Create SubCategory
router.post('/:categoryId/subcategories',verifyJWT, categoryController.createSubCategory);

// Get All SubCategories of a Category
router.get('/:categoryId/subcategories', categoryController.getAllSubCategories);

// Get SubCategory by ID
router.get('/:categoryId/subcategories/:subcategoryId', categoryController.getSubCategoryById);

// Update SubCategory by ID
router.put('/:categoryId/subcategories/:subcategoryId',verifyJWT, categoryController.updateSubCategoryById);

// Delete SubCategory by ID
router.delete('/:categoryId/subcategories/:subcategoryId',verifyJWT, categoryController.deleteSubCategoryById);

module.exports = router;
