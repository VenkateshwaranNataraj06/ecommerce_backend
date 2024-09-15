const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
     type: String,
     required: true,
     trim:true,
     unique: true 
    },
  password: { 
    type: String,
    trim:true,
    required: true
 },
 
 role: {
  type: String,
  enum: ['admin', 'user'], 
  default: 'user' 
},
phonenumber:{
  type:String,
  required:true
 
},
image:{
  type:String
}
   
}, { timestamps: true });

userSchema.virtual('username').get(function() {
  return `${this.firstname} ${this.lastname}`.trim();
});


userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });


const User=mongoose.model('User',userSchema);

module.exports={
    User,
}