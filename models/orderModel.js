const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    address: {
      type: String,
      required: true,
      default:"2/97"
    },
    city: {
      type: String,
      required: true,
       default:"Salem"
    },
    state: {
      type: String,
      required: true,
       default:"Tamilnadu"
    },
    zip: {
      type: String,
      required: true,
       default:"636001"
    },
    phonenumber: {
      type: String,
      required: true,
      default:"9876543210"
    }
  },
  billingAddresses: [ 
    {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      },
      phonenumber: {
        type: String,
        required: true
      }
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: { 
    type: Date,
      default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 3);
      return now;
    }
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = {Order,}
