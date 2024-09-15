const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whislistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    items: [
        {
          product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
            
            price:{
                type:Number,
                require:true
            }
        }
    ],
  
    
},
    {
        timestamps: true
    }
);
whislistSchema.set('strictPopulate', false);
const Whislist=mongoose.model('Whislist', whislistSchema);
module.exports={
   Whislist,
}
