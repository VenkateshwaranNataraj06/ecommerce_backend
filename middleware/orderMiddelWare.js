// const validateOrder = (req, res, next) => {
//     const { user, products, totalPrice, shippingAddress, status } = req.body;
//   console.log(req.body,"validateOrder");
  
 
//     req.body.user = typeof user === 'string' ? user?.trim() : user;
//     req.body.shippingAddress = typeof shippingAddress === 'object' ? {
//       address: typeof shippingAddress.address === 'string' ? shippingAddress?.address?.trim() : shippingAddress.address,
//       city: typeof shippingAddress.city === 'string' ? shippingAddress?.city?.trim() : shippingAddress.city,
//       state: typeof shippingAddress.state === 'string' ? shippingAddress?.state?.trim() : shippingAddress.state,
//       zip: typeof shippingAddress.zip === 'string' ? shippingAddress?.zip?.trim() : shippingAddress.zip, 
      
//       phonenumber : typeof shippingAddress.phonenumber === 'string' ? shippingAddress?.phonenumber?.trim() : shippingAddress?.phonenumber
//     } : shippingAddress;
//     req.body.status = typeof status === 'string' ? status?.trim() : status;

  

//     if (typeof req.body.user !== 'string' || req.body.user.length === 0) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }
  
//     if (!Array.isArray(req.body.products) || req.body.products.some(p => 
//       typeof p.product !== 'string' || p.product.trim().length === 0 || 
//       typeof p.quantity !== 'number' || p.quantity <= 0 || 
//       typeof p.price !== 'number' || p.price <= 0)) {
//       return res.status(400).json({ message: 'Invalid products' });
//     }
  
//     if (typeof req.body.totalPrice !== 'number' || req.body.totalPrice <= 0) {
//       return res.status(400).json({ message: 'Invalid total price' });
//     }
  
//     if (typeof req.body.shippingAddress !== 'object' || 
//       typeof req.body.shippingAddress.address !== 'string' || req.body.shippingAddress.address.trim().length === 0 ||
//       typeof req.body.shippingAddress.city !== 'string' || req.body.shippingAddress.city.trim().length === 0 ||
//       typeof req.body.shippingAddress.state !== 'string' || req.body.shippingAddress.state.trim().length === 0 ||
//       typeof req.body.shippingAddress.zip !== 'string' || req.body.shippingAddress.zip.trim().length === 0) {
//       return res.status(400).json({ message: 'Invalid shipping address' });
//     }
  
//     if (!['Processing', 'Shipped', 'Delivered'].includes(req.body.status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }
  
//     // if ( !req.body.phonenumber) {
//     //   console.log(typeof req.body.phonenumber,"typeof req.body.phonenumber  ",req.body.phonenumber);
      
//     //   return res.status(400).json({ message: 'Invalid phone number' });

//     // }
  
//     next();
//   };
  
//   module.exports = {
//     validateOrder,
//   };
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ; 

const validateOrder = (req, res, next) => {
  const { user, products, totalPrice, shippingAddress, billingAddresses, status } = req.body;
  const token = req.cookies?.token || req.headers['authorization'];
  const decoded = jwt.verify(token, JWT_SECRET);

  const { id } = req.params;
//   console.log( decoded.id," decoded._id in getbyid order",decoded.role);
//   console.log(req.body, "validateOrder",user,totalPrice,req.body.user );
//   console.log("req.body user,totalPrice,",req.body.user );
  // Trim and sanitize input values
  req.body.user = typeof user === 'string' ?decoded.id?.trim() : decoded.id;

//   req.body.shippingAddress = typeof shippingAddress === 'object' ? {
//       address: typeof shippingAddress.address === 'string' ? shippingAddress.address.trim() : shippingAddress.address,
//       city: typeof shippingAddress.city === 'string' ? shippingAddress.city.trim() : shippingAddress.city,
//       state: typeof shippingAddress.state === 'string' ? shippingAddress.state.trim() : shippingAddress.state,
//       zip: typeof shippingAddress.zip === 'string' ? shippingAddress.zip.trim() : shippingAddress.zip,
//       phonenumber: typeof shippingAddress.phonenumber === 'string' ? shippingAddress.phonenumber.trim() : shippingAddress.phonenumber
//   } : shippingAddress;
  req.body.status = typeof status === 'string' ? status.trim() : status;

  // Validate user ID
  if (typeof req.body.user !== 'string' || req.body.user.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
  }

 // Validate products array
 if(!id){
  if (!Array.isArray(req.body.products) || req.body.products.some(p =>
      typeof p.product !== 'string' || p.product.trim().length === 0 ||
      typeof p.quantity !== 'number' || p.quantity <= 0 ||
      typeof p.price !== 'number' || p.price <= 0
  )) {
    
      return res.status(400).json({ message: 'Invalid products' });
  }
}

  // Validate total price
  if ( req.body.totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid total price' });
  }

  // Validate shipping address
//   if (typeof req.body.shippingAddress !== 'object' ||
//       typeof req.body.shippingAddress.address !== 'string' || req.body.shippingAddress.address.trim().length === 0 ||
//       typeof req.body.shippingAddress.city !== 'string' || req.body.shippingAddress.city.trim().length === 0 ||
//       typeof req.body.shippingAddress.state !== 'string' || req.body.shippingAddress.state.trim().length === 0 ||
//       typeof req.body.shippingAddress.zip !== 'string' || req.body.shippingAddress.zip.trim().length === 0 ||
//       typeof req.body.shippingAddress.phonenumber !== 'string' || req.body.shippingAddress.phonenumber.trim().length === 0
//   ) {
//       return res.status(400).json({ message: 'Invalid shipping address' });
//   }

  // Validate billing addresses array
  if (!Array.isArray(req.body.billingAddresses) || req.body.billingAddresses.some(address =>
      typeof address.address !== 'string' || address.address.trim().length === 0 ||
      typeof address.city !== 'string' || address.city.trim().length === 0 ||
      typeof address.state !== 'string' || address.state.trim().length === 0 ||
      typeof address.zip !== 'string' || address.zip.trim().length === 0 ||
      typeof address.phonenumber !== 'string' || address.phonenumber.trim().length === 0
  )) {
      return res.status(400).json({ message: 'Invalid billing addresses' });
  }

  // Validate status
  if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status' });
  }

  next();
};

module.exports = {
  validateOrder,
};
