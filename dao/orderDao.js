const {Order }= require('../models/orderModel');



const getOrderDao = async (role, userId) => {
  try {
    console.log("fetching order..........");
    
    console.log(role,"role",userId,"userid");
    
    if (role === "admin") {
      console.log(role, "Role: Admin, fetching all orders");
      const orders = await Order.find()
        .populate('user')
        .populate('products.product');
      return orders;
    } else {
       
        const orders = await Order.find({ user: userId })
          .populate('user')
          .populate('products.product');
        return orders;
      }
    }
   catch (error) {
    throw error;
  }
};















const getOrderByIdDao = async (id) => {
  try {
    console.log("Fetching Order by ID");
    const orderById = await Order.findById(id) 
    return orderById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};


const createOrderDao = async (OrderData) => {
  try {
   console.log("oreder creatre dao>>>>>>",OrderData);
   

    const order =  new Order(OrderData);
    console.log("return from orderdao");
    await order.save();

    console.log("return from orderdao", order);
    
    return order;
  } catch (error) {
    console.log(error);
    
    throw error; 
  }
};


const updatedOrderDao = async (id, updatedOrderData) => {
  try {

    const { user, ...updateData } = updatedOrderData;
    const updatedOrder = await Order.findByIdAndUpdate(id, {...updateData}, {new: true,runValidators: true});
 console.log(updatedOrder," updatedOrderDao>>>>>>>>>>>>>>>>>>>>>>>>");
 
    return updatedOrder;
  } catch (error) {
    
    throw error;
  }
};

const deleteOrderDao=async(id)=>{
  try {
    const deleteOrder=await Order.findByIdAndDelete(id)
    return deleteOrder;
  } catch (error) {
    throw error;
    
  }
}






module.exports = {
  getOrderDao,
  getOrderByIdDao,
  
  createOrderDao,
  updatedOrderDao,
  deleteOrderDao,
 
};



