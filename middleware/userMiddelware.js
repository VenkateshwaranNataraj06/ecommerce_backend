const {User}=require('../models/userModel')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwtSecretKey =process.env.JWT_SECRET;
app.use(cookieParser()); 
const phoneNocheck = /^[0-9]{10}$/;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

const validateUser = async (req, res, next) => {
  console.log("validate usermiddeleware",req.body);
  
  const token = req.cookies?.token || req.headers['authorization'];
  console.log("token validate usere middelware" ,token);
  
  const decoded = jwt.verify(token,jwtSecretKey);
  decoded._id
  console.log( decoded.id," decoded._id");
  const {id}=req.params||decoded._id
  
  const { firstname,lastname, email, password ,phonenumber} = req.body;


  
  const trimmedFirstname = firstname?.trim();
  const trimmedLastname=lastname?.trim()
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  
  const phoneno= typeof phonenumber === 'string' && phonenumber.trim() !== '' && phoneNocheck .test( phonenumber)
  



  const isValidUser = typeof trimmedFirstname === 'string' && trimmedFirstname !== ''&&typeof trimmedLastname === 'string' && trimmedLastname !== '';
  if (!isValidUser) {
    
    
    
      return res.status(400).json({ message: 'Username cannot be empty' });
  }



  const isValidEmailId = isValidEmail(trimmedEmail);
  if (!isValidEmailId) {
  
      return res.status(400).json({ message: 'Email is not valid' });
  }
  
 if(!phoneno)
 {

  return res.status(400).json({ message: 'Phone Number not null is in proper format 10 digit' });
 }
  // if(id && trimmedPassword ){
  //   return res.status(400).json({password:})

  // }

  const isValidPassword = typeof trimmedPassword === 'string' && trimmedPassword !== '' && trimmedPassword.length >= 6;
  if (!isValidPassword) {

      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  
  
  try {
    
      const userExists = await User.findOne({
          email: trimmedEmail,
          _id: { $ne: id }
      });
     
      if (userExists) {
       
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      console.log(firstname,lastname, email, password ,phonenumber,"firstname,lastname, email, password ,phonenumber");
     
      next();
  } catch (error) {
   
    

      console.error('Error checking user existence:', error.message);
      return res.status(500).json({ error: 'internal server eroror' });
  }
};



const validateUserSignUp = async (req, res, next) => {

 
  const { firstname,lastname, email, password ,phonenumber} = req.body;

  
  const trimmedFirstname = firstname?.trim();
  const trimmedLastname=lastname?.trim()
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  const phoneno= typeof phonenumber === 'string' && phonenumber.trim() !== '' && phoneNocheck .test( phonenumber)
  



  const isValidUser = typeof trimmedFirstname === 'string' && trimmedFirstname !== ''&&typeof trimmedLastname === 'string' && trimmedLastname !== '';
  if (!isValidUser) {
    
      return res.status(400).json({ message: 'Username cannot be empty' });
  }



  const isValidEmailId = isValidEmail(trimmedEmail);
  if (!isValidEmailId) {
    
      return res.status(400).json({ message: 'Email is not valid' });
  }
  
 if(!phoneno)
 {
  return res.status(400).json({ message: 'Phone Number not null is in proper format 10 digit' });
 }
 

  const isValidPassword = typeof trimmedPassword === 'string' && trimmedPassword !== '' && trimmedPassword.length >= 6;
  if (!isValidPassword) {
    
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  
  
  try {
    
      const userExists = await User.findOne({
          email: trimmedEmail,
         
      });
     
      if (userExists) {
        console.log("validateUser usermiddelwarre");
          return res.status(400).json({ message: 'User with this email already exists' });
      }


     
      next();
  } catch (error) {

      console.error('Error checking user existence:', error.message);
      return res.status(500).json({ error: 'internal server eroror' });
  }
};

// const validateUser = async (req, res, next) => {
//   const { id } = req.params; 
//   const { username, email, password } = req.body;


//   const trimmedUsername = username?.trim();
//   const trimmedEmail = email?.trim();
//   const trimmedPassword = password?.trim();

//  if (typeof trimmedUsername !== 'string' || trimmedUsername === '') {
//     return res.status(400).json({ error: 'Username cannot be empty' });
//   }

  
//   const isValidEmailId = isValidEmail(trimmedEmail);
//   if (!isValidEmailId) {
//     return res.status(400).json({ error: 'Invalid email address' });
//   }

  
//   if ( ((trimmedPassword) && (trimmedPassword.length < 6))) {
//     console.log( trimmedPassword.length );
    
//     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
//   }

//   try {
   
//     const userExists = await User.findOne({
//       email: trimmedEmail,
//       _id: { $ne: id }
//     });

//     if (userExists) {
//       return res.status(400).json({ error: 'User with this email already exists' });
//     }

//     next();
//   } catch (error) {
//     console.error('Error checking user existence:', error.message);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };















const loginValidateUser = async (req, res, next) => {
  const { email, password } = req.body;


  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();


  const isValidEmailId = isValidEmail(trimmedEmail);
  console.log("Email:", email, "Trimmed Email:", trimmedEmail);


  const isValidPassword = (typeof trimmedPassword === 'string' &&
    trimmedPassword !== '' &&
    trimmedPassword.length >= 6);

  console.log("Password:", password, "Trimmed Password:", trimmedPassword);

  if (trimmedEmail === '') {
    return res.status(400).json({ message: 'Email cannot be empty' });
  }


  if (!isValidEmailId) {
    return res.status(400).json({ message: 'Email is not valid' });
  }


  if (!isValidPassword) {
   
    
    return res.status(400).json({ message: 'Password must not be empty and must be at least 6 characters long' });

  }
  

  next();
};



// const verifyRole =(requiredRole)=>{

// return  (req, res, next) => {
//   console.log('Cookies:', req.cookies); // Check if cookies are available
//   console.log('Authorization Header:', req.headers.authorization);

//   console.log(req.cookie?.authToken,"req.cookies?.authToken");
  

//   const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;

//    console.log(decoded,"decoded");
   
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
//     }

//     next();
//   } catch (error) {
//     return res.status(400).json({ error: 'Invalid token.' });
//   }
// }
// };
// const credentialsCheck=(req,res,next)=>
// {
//   if(!process.env.USER_EMAIL)
//     {
//       return res.status(400).json({ message: 'credational required' });
//     }
// next()
// }


module.exports = {
    validateUser,
    loginValidateUser,
    validateUserSignUp 
    // credentialsCheck
};
