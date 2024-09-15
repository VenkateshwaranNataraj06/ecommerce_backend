const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true 
    },
    category: {
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: [true, 'Category is required'],
      trim:true
      
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'] 
    },
    images: {
        type: [String],
        required: [true, 'Images are required'],
        validate: {
            validator: function(arr) {
                return Array.isArray(arr) && arr.every(img => typeof img === 'string' && img.trim() !== '');
            },
            message: 'Each image URL must be a valid non-empty string.'
        }
    },
    brand:{
        type: String,

    },
    stock: {
        type: Number,
        require:true,
        default: 1,
        min: [0, 'Stock must be a non-negative integer'] ,
        

    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
