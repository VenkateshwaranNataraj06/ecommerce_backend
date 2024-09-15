const express = require('express');
const cartApi = express.Router(); 
const cartService=require('../services/cartService')
const {validateCart}=require('../middleware/cartMiddelWare')
const authUserMiddleware=require('../middleware/authUserMiddelware')
cartApi.use(authUserMiddleware.authUser)

cartApi.post('/',validateCart,cartService.createCart)
  

cartApi.get('/',cartService.getCart)
cartApi.get('/', cartService.getCartById)

cartApi.get('/:id', cartService.getCartById)
 

cartApi.put('/:id',validateCart,cartService.updatedCart)
  


cartApi.delete('/:id',cartService.deleteCart)
  

module.exports = cartApi; 