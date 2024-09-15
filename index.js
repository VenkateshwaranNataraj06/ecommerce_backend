// const express= require('express')
// const app=express()
// app.use(express.json())


// app.get('/',(req,res)=>{
//     res.status(200).json({message:"it succesfull"})
// })

// app.listen(4000,()=>console.log('4000 port')
// )
// app.js (or your main server file)
// app.js (or your main server file)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userApi = require('./apis/userApi'); 
const productApi=require('./apis/productApi');
const orderApi = require('./apis/orderApi');
const cartApi = require('./apis/cartApi');
const whislistApi=require('./apis/wishlistApi')
const paymentApi=require('./apis/paymentApi');
const categoryApi=require('./apis/categoryApi');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use('/users', userApi);
app.use('/products', productApi);
app.use('/orders',orderApi);
app.use('/carts', cartApi);
app.use('/payments',paymentApi);
app.use('/category',categoryApi);
app.use('/whislist',whislistApi);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db=process.env.MONGODB_URI
mongoose.connect(db)
  .then(() => {
    console.log('MongoDB connected')
    
    app.listen(4000, () => {
      console.log(`Server running on port 4000`);
    });
    
  }
  
 )
  .catch(err => console.error('MongoDB connection error:', err));


