const validateCart = (req, res, next) => {

    const { items} = req.body;
    // console.log(user);
    
  

    // if (typeof user !== 'string' || user.trim() === '') {
    //   return res.status(400).json({ message: 'Invalid user ID' });
    // }
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items must be a non-empty array' });
    }
  
   
    for (const item of items) {
      if (typeof item.product !== 'string' || item.product.trim() === '') {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
      }
      if (typeof item.price !== 'number' || item.price <= 0) {
        console.log(item.price);
        
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
    }
  console.log("validate cart cokmpleted");
  
    next();
  };
  
  module.exports = {
    validateCart,
  };
  