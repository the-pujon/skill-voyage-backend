const Category=require('../model/category.schema');

const categoryController={
    /**
     * for create category
     */
    createCategory: async (req,res) => {
        try {
            const newCategory=await Category.create(req.body);
            res.status(201).json(newCategory);
        } catch(error) {
            if(error.code===11000) {
            // Duplicate key error, handle accordingly
                return res.status(400).json({error: 'Duplicate Category Slug or CategoryName'});
            }
            // Other error, handle accordingly
            return res.status(500).json({error: 'Internal Server Error'});
        }
    },

    /**
     * for getting all category
     */
    getAllCategories: async (req,res) => {
        try {
            const categories=await Category.find();
            res.status(200).json(categories);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    /**
     * for getting category by id
     */
    getCategoryById: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }
            res.status(200).json(category);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    updateCategoryById: async (req,res) => {
        try {
            const updatedCategory=await Category.findByIdAndUpdate(
                req.params.categoryId,
                req.body,
                {new: true}
            );
            if(!updatedCategory) {
                return res.status(404).json({error: 'Category not found'});
            }
            res.status(200).json(updatedCategory);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    deleteCategoryById: async (req,res) => {
        try {
            const deletedCategory=await Category.findByIdAndDelete(req.params.categoryId);
            if(!deletedCategory) {
                return res.status(404).json({error: 'Category not found'});
            }
            res.status(200).json(deletedCategory);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },


    createSubCategory: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }

            // Check for duplicate subcategory slug
            const isDuplicateSlug=category.subcategory.some(
                (sub) => sub.SubCategorySlug===req.body.SubCategorySlug
            ) || category.subcategory.some(
                (sub) => sub.SubCategoryName===req.body.SubCategoryName
            )

            if(isDuplicateSlug) {
                return res.status(400).json({error: 'Duplicate Subcategory Slug or Subcategory Name'});
            }

            // Create a new subcategory object
            const newSubCategory={
                SubCategoryName: req.body.SubCategoryName||null,
                SubCategorySlug: req.body.SubCategorySlug||null,
            };

            // Push the new subcategory object into the subcategory array
            category.subcategory.push(newSubCategory);

            // Save the category to the database
            await category.save();

            res.status(201).json(newSubCategory);
        } catch(error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },


    getAllSubCategories: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }
            res.status(200).json(category.subcategory);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    getSubCategoryById: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }

            const subCategory=category.subcategory.id(req.params.subcategoryId);
            if(!subCategory) {
                return res.status(404).json({error: 'SubCategory not found'});
            }

            res.status(200).json(subCategory);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    updateSubCategoryById: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }

            const subCategory=category.subcategory.id(req.params.subcategoryId);
            if(!subCategory) {
                return res.status(404).json({error: 'SubCategory not found'});
            }

            Object.assign(subCategory,req.body);
            await category.save();

            res.status(200).json(subCategory);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    },

    deleteSubCategoryById: async (req,res) => {
        try {
            const category=await Category.findById(req.params.categoryId);
            if(!category) {
                return res.status(404).json({error: 'Category not found'});
            }

            const subCategory=category.subcategory.id(req.params.subcategoryId);
            if(!subCategory) {
                return res.status(404).json({error: 'SubCategory not found'});
            }

            category.subcategory.pull(subCategory);
            await category.save();

            res.status(200).json(subCategory);
        } catch(error) {
            console.log('subcategory delete', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
};

module.exports=categoryController;
