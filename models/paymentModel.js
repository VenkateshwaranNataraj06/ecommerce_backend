const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    require:true
  },
 
  paymentStatus: {
    type: String, 
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR' 
  },
  
  paymentDate: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports =
{ Payment,
}
