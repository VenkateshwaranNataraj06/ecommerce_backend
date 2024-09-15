const paymentDao = require('../dao/paymentDao');

const getPayment= async (req, res) => {
  try {
    const paymentData = await paymentDao.getPaymentDao();
    return res.status(200).json(paymentData);
  } catch (error) {
    console.error('Error fetching PaymentDao:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentDaoById = await paymentDao.getPaymentByIdDao(id);
    
    if (!paymentDaoById) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    return res.status(200).json(paymentDaoById);
  } catch (error) {
    console.error('Error fetching Payment by ID:', error);
    return res.status(500).json({ message: 'Error fetching Payment by ID', error: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    console.log('Creating PaymentDao...');
    const paymentData = await paymentDao.createPaymentDao(req.body);
    console.log('PaymentDao created:', paymentData);
    return res.status(201).json(paymentData);
  } catch (error) {
    console.error('Error creating PaymentDao:', error);
    return res.status(500).json({ message: 'Error creating PaymentDao', error: error.message });
  }
};

const updatedPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPaymentData = req.body;

    const updatedPayment = await paymentDao.updatedPaymentDao(id, updatedPaymentData);

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.status(200).json(updatedPayment);
  } catch (error) {
    console.error('Error updating Payment:', error);
    return res.status(500).json({ message: 'Error updating Payment', error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await paymentDao.deletePaymentDao(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting Payment:', error);
    return res.status(500).json({ message: 'Error deleting Payment', error: error.message });
  }
};

module.exports = {
  getPayment,
  getPaymentById,
  createPayment,
  updatedPayment,
  deletePayment
};
