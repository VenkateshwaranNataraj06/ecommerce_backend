
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ; 

const validateOrder = (req, res, next) => {
  const { user, products, totalPrice, shippingAddress, billingAddresses, status } = req.body;
  const token = req.cookies?.token || req.headers['authorization'];
  const decoded = jwt.verify(token, JWT_SECRET);

  const { id } = req.params;

  req.body.user = typeof user === 'string' ?decoded.id?.trim() : decoded.id;

//   req.body.shippingAddress = typeof shippingAddress === 'object' ? {
//       address: typeof shippingAddress.address === 'string' ? shippingAddress.address.trim() : shippingAddress.address,
//       city: typeof shippingAddress.city === 'string' ? shippingAddress.city.trim() : shippingAddress.city,
//       state: typeof shippingAddress.state === 'string' ? shippingAddress.state.trim() : shippingAddress.state,
//       zip: typeof shippingAddress.zip === 'string' ? shippingAddress.zip.trim() : shippingAddress.zip,
//       phonenumber: typeof shippingAddress.phonenumber === 'string' ? shippingAddress.phonenumber.trim() : shippingAddress.phonenumber
//   } : shippingAddress;
  req.body.status = typeof status === 'string' ? status.trim() : status;


  if (typeof req.body.user !== 'string' || req.body.user.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
  }


 if(!id){
  if (!Array.isArray(req.body.products) || req.body.products.some(p =>
      typeof p.product !== 'string' || p.product.trim().length === 0 ||
      typeof p.quantity !== 'number' || p.quantity <= 0 ||
      typeof p.price !== 'number' || p.price <= 0
  )) {
    
      return res.status(400).json({ message: 'Invalid products' });
  }
}

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

  if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status' });
  }

  next();
};

module.exports = {
  validateOrder,
};
