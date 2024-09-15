const validatePayment = (req, res, next) => {
    const { orderId, userId, paymentStatus, paymentAmount, currency, paymentDate } = req.body;
  
  
    if (typeof orderId !== 'string' || orderId.trim() === '') {
      return res.status(400).json({ message: 'Invalid orderId' });
    }
  
   
    if (typeof userId !== 'string' || userId.trim() === '') {
      return res.status(400).json({ message: 'Invalid userId' });
    }
  
    
    if (typeof paymentStatus !== 'string' || paymentStatus.trim() === '') {
      return res.status(400).json({ message: 'Invalid paymentStatus' });
    }
  
   
    if (typeof paymentAmount !== 'number' || paymentAmount <= 0) {
      return res.status(400).json({ message: 'Invalid paymentAmount. It should be a positive number.' });
    }
  
  
    if (currency && typeof currency !== 'string') {
      return res.status(400).json({ message: 'Invalid currency format' });
    }
  

    if (paymentDate && isNaN(Date.parse(paymentDate))) {
      return res.status(400).json({ message: 'Invalid paymentDate format' });
    }
  
   
    next();
  };
  
  module.exports = {
    validatePayment,
  };
  