const productDao = require('../dao/productDao');

const getProduct = async (req, res) => {
  try {
    const products = await productDao.getProductDao();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productDao.getProductByIdDao(id);
    
    if (!productById) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json(productById);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Error fetching product by ID', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('Creating product...');
   
      const { name, category, description, price, brand,stock,  images } = req.body;
      console.log('Request Body:', req); // Check if fields are being parsed correctly
      console.log('Uploaded File:', req.files);
      console.log('Uploaded File:', req.files);
      
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => `https://ecommerce-backend-5y1u.onrender.com/uploads/${file.filename}`);
      } else if (images && images.length > 0) {
        
        imagePaths = Array.isArray(images) ? images : [images];
      } else {
        return res.status(400).json({ error: 'At least one image is required' });
      }
  
      const productData = {
        name,
        category,
        description,
        price,
        brand,
        stock,
        images:imagePaths// include image URL or path
      };
    const product = await productDao.createProductDao( productData);
    // console.log('Product created:', product);
    return res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const updatedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;
 
    

    const updatedProduct = await productDao.updatedProductDao(id, updatedProductData);

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productDao.deleteProductDao(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updatedProduct,
  deleteProduct
};
