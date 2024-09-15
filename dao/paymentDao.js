const {Payment }= require('../models/paymentModel');


const getPaymentDao=async()=>{
  try{
    const payment= await Payment.find()
    return payment
  }
  catch(error)
  {
    throw error; 
  }
}

const getPaymentByIdDao = async (id) => {
  try {
    console.log("Fetching Payment by ID");
    const paymentById = await Payment.findById(id) 
    return paymentById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};


const createPaymentDao = async (paymentData) => {
  try {
    const payment =  new Payment(paymentData);
    await payment.save();
    return payment;
  } catch (error) {
    throw error; 
  }
};


const updatedPaymentDao = async (id, updatedPaymentData) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, updatedPaymentData, {new: true,runValidators: true});
 console.log(updatedPayment);
 
    return updatedPayment;
  } catch (error) {
    
    throw error;
  }
};

const deletePaymentDao=async(id)=>{
  try {
    const deletePayment=await Payment.findByIdAndDelete(id)
    return deletePayment;
  } catch (error) {
    throw error;
    
  }
}






module.exports = {
  getPaymentDao,
  getPaymentByIdDao,
  
  createPaymentDao,
  updatedPaymentDao,
  deletePaymentDao,
 
};



