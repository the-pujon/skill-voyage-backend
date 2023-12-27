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
//const mongoose = require('mongoose');

//const subcategorySchema = new mongoose.Schema({
//    SubCategoryName: { type: String, default: null },
//    SubCategorySlug: {
//        type: String,
//        default: null,
//        validate: {
//            validator: async function (value) {
//                const category = await mongoose.model('Category').findOne({
//                    'subcategory.SubCategorySlug': value,
//                });
//                console.log('category', category)
//                return !category;
//            },
//            message: 'SubCategorySlug must be unique.',
//        },
//    },
//});

//const categorySchema = new mongoose.Schema({
//    CategoryName: { type: String, required: true },
//    CategorySlug: { type: String, required: true, unique: true },
//    subcategory: [subcategorySchema],
//});

//const Category = mongoose.model('Category', categorySchema);

//module.exports = Category;
