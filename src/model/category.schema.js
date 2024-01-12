const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    SubCategoryName: { type: String, default: null, unique: true, sparse: true },
    SubCategorySlug: { type: String, default: null, unique: true, sparse: true },
});

const categorySchema = new mongoose.Schema({
    CategoryName: { type: String, required: true, unique: true },
    CategorySlug: { type: String, required: true, unique: true },
    subcategory: [subcategorySchema],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;