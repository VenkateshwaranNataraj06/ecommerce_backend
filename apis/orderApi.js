const express = require('express');
const orderApi = express.Router();

const {validateOrder}=require('../middleware/orderMiddelWare')
const authMiddelware=require('../middleware/authUserMiddelware')
const orderService=require('../services/orderService')
orderApi.use(authMiddelware.authUser)
orderApi.post('/',validateOrder, orderService.createOrder);



orderApi.get('/',orderService.getOrder);
  

orderApi.get('/:id',orderService.getOrderById)


// orderApi.put('/:id',authMiddelware.verifyRole('admin'),validateOrder, orderService.updatedOrder);  
orderApi.put('/:id',validateOrder, orderService.updatedOrder);  


orderApi.delete('/:id', orderService.deleteOrder)


module.exports = orderApi;
