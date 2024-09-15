const {Cart }= require('../models/cartModel');
const mongoose = require('mongoose'); 



const getCartDao = async (userId,role ) => {
  try {
    console.log("fetching Cart..........");
    
    console.log(role,"role",userId,"userid");
    
    if (role === "admin") {
      console.log(role, "Role: Admin, fetching all Carts");
      const carts = await Cart.find()
        .populate('user')
        .populate('items.product');
      return carts;
    } else {
       console.log(userId,"userid else");
   
       
        const carts = await Cart.find({ user: userId })
         .populate('user')
        .populate('items.product');
       

          console.log("carts",carts);
          
        return carts;
      }
    }
   catch (error) {
    throw error;
  }
};

const getCartByIdDao = async (id) => {
  try {
    console.log("Fetching Cart by ID");
    const cartById = await Cart.findById(id) 
    return cartById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};



const createCartDao = async (userId,cartData) => {
  try {
  
    const { product, quantity,price } = cartData.items[0];

    
    if (!  product|| !quantity) {
      throw new Error("Product ID and quantity are required.");
    }

   
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    console.log("Populated Cart:", JSON.stringify(cart, null, 2));
    if (!cart) {
     
      cart = new Cart({
        user: userId,
        items: [{
          product: product,
          quantity: quantity,
          price: price
        }]
      });
    } else {
    
      const itemIndex = cart.items.findIndex(item => {
        
      return  item.product._id.toString() === product
      });

      

      if (itemIndex > -1) {
        
        cart.items[itemIndex].quantity += quantity;
      } else {
 
        cart.items.push({
          product:product,
          quantity: quantity,
          price: price
        });
      }
    }

    await cart.save();


    return cart;
  } catch (error) {
    throw error;
  }
};


const updatedCartDao = async (id, updatedCartData) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, updatedCartData, {new: true,runValidators: true});
 console.log(updatedCart);
 
    return updatedCart;
  } catch (error) {
    
    throw error;
  }
};







const deleteCartDao = async (userId, productId) => {
  console.log("cart dao...", productId, userId);

  try {
   
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
 console.log("Populated Cart:", JSON.stringify(cart, null, 2));

    if (cart) {
     
      const itemIndex = cart.items.findIndex(item => {
        
        console.log(item.product._id.toString(),"jhgjg",productId);
        
        return item.product._id.toString() === productId;




      });
      console.log(itemIndex, "itemindex");

      if (itemIndex > -1) {
       
        const item = cart.items[itemIndex];

        if (item.quantity > 1) {
          
          item.quantity -= 1;
        } else {
         
          cart.items.splice(itemIndex, 1);
        }
  
       
        cart = await cart.save();

        console.log("Populated Cart:", JSON.stringify(cart, null, 2));
        
        return cart;
      } else {
        console.log("Item not found in the cart.");
        return null;
      }
    } else {
      console.log("Cart not found for the user.");
      return null;
    }
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};





module.exports = {
  getCartDao,
  getCartByIdDao,
  
  createCartDao,
  updatedCartDao,
  deleteCartDao,
 
};



