const orderDao = require('../dao/orderDao');
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ;

const getOrder = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);


    console.log( decoded.id," decoded._id in getbyid order",decoded.role);
    const order = await orderDao.getOrderDao(decoded.role,decoded.id);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching Order:', error.message);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderById = await orderDao.getOrderByIdDao(id);
    
    if (!orderById) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(orderById);
  } catch (error) {
    console.error('Error fetching Order by ID:', error);
    return res.status(500).json({ message: 'Error fetching Order by ID', error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log('Creating Order...',req.body);
    const token = req.cookies?.token || req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);
   console.log(req.body,"Creating Order...'");
   

    console.log( decoded.id," decoded._id in getbyid order",decoded.role);
    const order = await orderDao.createOrderDao(req.body);
    console.log('Order created:', order);

    return res.status(200).json(order);

  } catch (error) {
    console.error('Error creating Order:', error);
    return res.status(500).json({ message: 'Error creating Order', error: error.message });
  }
};

const updatedOrder = async (req, res) => {
  try {
  
    
    const { id } = req.params;
    const updatedOrderData = req.body;

    const updatedOrder = await orderDao.updatedOrderDao(id, updatedOrderData);
    console.log("updatedOrder service",updatedOrder);

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating Order:', error);
    return res.status(500).json({ message: 'Error updating Order', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderDao.deleteOrderDao(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting Order:', error);
    return res.status(500).json({ message: 'Error deleting Order', error: error.message });
  }
};

module.exports = {
  getOrder,
  getOrderById,
  createOrder,
  updatedOrder,
  deleteOrder
};
