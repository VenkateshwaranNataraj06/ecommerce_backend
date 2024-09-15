const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim:true
        }, 
        description: {
            type: String,
            trim: true
        },
        image:{
            type:String,
            trim:true,
            required: true,
        }
    
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports={
    Category,
}