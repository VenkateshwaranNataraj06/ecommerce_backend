const cartDao = require('../dao/cartDao');
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ;


const getCart = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);


    console.log( decoded.id," decoded._id in getbyid order",decoded.role);
    const cart = await cartDao.getCartDao(decoded.id,decoded.role);

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching Cart:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};





const getCartById = async (req, res) => {
  try {
    
    const { id } = req.params;
    const cartById = await cartDao.getCartByIdDao(id);
    
    if (!cartById) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    return res.status(200).json(cartById);
  } catch (error) {
    console.error('Error fetching Cart by ID:', error);
    return res.status(500).json({ message: 'Error fetching Cart by ID', error: error.message });
  }
};

// const createCart = async (req, res) => {
//   try {
//     console.log('Creating Cart...');
//     const cart = await cartDao.createCartDao(req.body);
//     console.log('Cart created:', cart);
//     return res.status(201).json(cart);
//   } catch (error) {
//     console.error('Error creating Cart:', error);
//     return res.status(500).json({ message: 'Error creating Cart', error: error.message });
//   }
// };

const createCart = async (req, res) => {
  try {
       console.log('Creating Cart...');
       const token = req.cookies?.token || req.headers['authorization'];

       if(!token)
       {
        return res.status(400).json({message: "Token is required"})
       }
    const decoded = jwt.verify(token, JWT_SECRET);


    console.log( decoded.id," decoded._id in getbyid order",decoded.role);
    const cart = await cartDao.createCartDao(decoded.id,req.body);
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to Cart:', error);
    return res.status(500).json({ message: 'Error adding to Cart', error: error.message });
  }
};

// Helper function to fetch the product price
const getProductPrice = async (productId) => {
  const product = await Product.findById(productId);
  return product.price;
};

const updatedCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCartData = req.body;

    const updatedCart = await cartDao.updatedCartDao(id, updatedCartData);

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating Cart:', error);
    return res.status(500).json({ message: 'Error updating Cart', error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('delete Cart...');
    const token = req.cookies?.token || req.headers['authorization'];

    if(!token)
    {
     return res.status(400).json({message: "Token is required"})
    }
 const decoded = jwt.verify(token, JWT_SECRET);


 console.log( decoded.id," decoded._id in deletbyid cart",decoded.role);

    const deletedCart = await cartDao.deleteCartDao(decoded.id,id);

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(deletedCart);
  } catch (error) {
    console.error('Error deleting Cart:', error);
    return res.status(500).json({ message: 'Error deleting Cart', error: error.message });
  }
};

module.exports = {
  getCart,
  getCartById,
  createCart,
  updatedCart,
  deleteCart
};
