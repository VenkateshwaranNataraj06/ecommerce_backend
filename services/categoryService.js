const categoryDao = require('../dao/categoryDao');



const getCategory = async (req, res) => {
  try {
    const category = await categoryDao .getCategoryDao();
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching Category:', error);
    return res.status(500).json({ message: 'Error fetching Category' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await categoryDao.getCategoryByIdDao(id);
    
    if (!productById) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json(productById);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Error fetching product by ID', error: error.message });
  }
};

const createCategory= async (req, res) => {
  try {
    console.log('Creating Category...');
    const category = await categoryDao.createCategoryDao(req.body);
    console.log('Category created:', category);
    return res.status(201).json(category);
  } catch (error) {
    console.error('Error creating Category:', error);
    return res.status(500).json({ message: 'Error creating Category', error: error.message });
  }
};

const updatedCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategoryData = req.body;

    const updatedCategory = await categoryDao.updatedCategoryDao(id, updatedCategoryData);

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating Category:', error);
    return res.status(500).json({ message: 'Error updating Category', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryDao.deleteCategoryDao(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting Category:', error);
    return res.status(500).json({ message: 'Error deleting Category', error: error.message });
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updatedCategory,
  deleteCategory
};
