const {Product }= require('../models/productModel');


const getProductDao=async()=>{
  try{
  
    const products = await Product.find().populate('category', 'name')
    // console.log(products);
    
    return products
  }
  catch(error)
  {
    throw error; 
  }
}

const getProductByIdDao = async (id) => {
  try {
    console.log("Fetching Product by ID");
    const productById = await Product.findById(id) 
    return productById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};


const createProductDao = async (productData) => {
  try {
    const product =  new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw error; 
  }
};


const updatedProductDao = async (id, updatedProductData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, {new: true,runValidators: true});
 console.log(updatedProduct);
 
    return updatedProduct;
  } catch (error) {
    
    throw error;
  }
};

const deleteProductDao=async(id)=>{
  try {
    const deleteProduct=await Product.findByIdAndDelete(id)
    return deleteProduct;
  } catch (error) {
    throw error;
    
  }
}






module.exports = {
  getProductDao,
  getProductByIdDao,
  
  createProductDao,
  updatedProductDao,
  deleteProductDao,
 
};


// try {
//   console.log('Fetching users...');
// const users = await User.User.find();
// console.log('Users fetched:', users);

// res.status(200).json(users);

// } catch (error) {
//   console.log(error);
  
// res.status(500).json({ message: 'Error retrieving users', error });
// }
