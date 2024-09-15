const validateWhislist = (req, res, next) => {

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
    
      if (typeof item.price !== 'number' || item.price <= 0) {
        console.log(item.price);
        
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
    }
  console.log("validate whislist completed");
  
    next();
  };
  
  module.exports = {
    validateWhislist,
  };
  