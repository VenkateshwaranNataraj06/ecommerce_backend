
const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ;
 


const getUser=async (req,res)=>{
 
  try{
  
    
    console.log(req.email,"req.email");
    
    const user=await userDao.getUserDao()
    return res.status(200).json (user);

  }
  catch(error){
    return res.status(200).json ({error:error.message});
  }
}

const getUserById= async(req,res)=>{
 
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);
    decoded._id

    console.log( decoded.id," decoded._id in getbyid");
    const {id}=req.params

    const userById= await userDao.getUserByIdDao(id||decoded.id,decoded.role);
    if(!userById)
    {
      console.log("user not found");
      
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(userById)
    
  } catch (error) {
    return res.status(500).json(error.message)
    
  }
}

// const createUser = async (req,res) => {
//   try {

//   const{username,email,password}=req.body
    
//     console.log('create users...');

//     const saltRounds = 10; 
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    
//     const userData = { ...req.body, password: hashedPassword };

//     const user = await userDao.createUserDao( userData);
//     console.log('User fetched:', user);
//     return res.status(200).json({message:"succesfully created"});
//   } catch (error) {
//     console.error('Error in user service:', error);
//     return res.status(200).json({erro:error.message});
//   }
// };
const createUser = async (req, res) => {
  try {
    
    const { firstname,lastname, email, password ,role,phonenumber} = req.body;

  

    console.log('Creating user...');

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const userData = { firstname,lastname, email, password: hashedPassword,role ,phonenumber};

   
    const user = await userDao.createUserDao(userData);
    console.log('User created:', user);

    return res.status(200).json({ message: "Successfully created" });
  } catch (error) {
    console.error('Error in user service:', error);
    return res.status(400).json({ error: error.message });
  }
};


const userLogin=async(req,res)=>{
  const { email, password } = req.body;
  console.log("userlogin");
  

  try {
    
      const user = await userDao.userLoginDao(email,password)
    //  console.log("paaswrod",password);
    //  console.log( user.username," user.username");
     
    //   console.log("user",user);

      if(user===null)
      {
        return res.status(404).json({ message: 'UserEmail is not Found' });
      }
      
      if (!user) {
        
          return  res.status(404).json({ message: 'password not match' });
      }
     
    

       console.log(JWT_SECRET,"jwtsecert");
      const token = jwt.sign({ id: user._id ,role:user.role}, JWT_SECRET, { expiresIn: '1h' });
      console.log("token",token);
     
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.ENV === 'dev',
        sameSite: 'Strict',
        path: '/'
    });
   const useremail=user.email
   const username=user.username
    return res.status(200).json({ message: 'Login successful', token ,useremail,username});

  } catch (error) {
      console.error('Error during login:', error.message);
      return  res.status(500).json({ error: 'Internal Server Error' });
  }
}

const userLogout = (req, res) => {
  

  
  res.clearCookie('token', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'development',
    // sameSite: 'Strict',
    // path: '/'
     
  });
  
  return res.status(200).json({ message: 'Logout successful' });
};
const updatedUser = async (req, res) => {
  try {
    const { id } = req.params;
  
   
    // if(req.password!=='')
    // {
    //   return res.status(400).json({password:"password cannot edit "})
    // }

    //  if(req.password!==''){
    //    const saltRounds = 10;
    //    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    //   const userData = { ...req.body, password: hashedPassword };
    //    const updatedUser = await userDao.updatedUserDao(id, userData);
    //    console.log("inside hashpassword");
       

    //    if (!updatedUser) {
    //      return res.status(404).json({ message: 'User not found' });
    //    }

    //    return res.status(200).json(updatedUser);

    //  }
    try{
let  imagePath;
    if (req.file) {
      console.log(req.file,"req.file");
      
         imagePath = `http://localhost:4000/uploads/${req.file.filename}`
    }
    const updatedUserData = {
      ...req.body,
      image: imagePath 
    };
    console.log(updatedUserData,"update>>>>>>>>>>>>>>>");
    
    const updatedUser = await userDao.updatedUserDao(id, updatedUserData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);

  }catch(err)
  {
    console.log(err,"errrr");
    
  }

 


  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error:error.message });
  }
};


const deleteUser=async(req,res)=>{
  try{
    const {id}=req.params;
    const deleteUser=await userDao.deleteUserDao(id)
    if(!deleteUser)
    {
      return res.status(400).json({message:"User not found"})
    }
    return res.status(200).json({message:"User  deleted Successfully"})


  }
  catch(error)
  {
    return res.status(400).json(error.message)
  }
}





module.exports = {
  getUser,
  getUserById,
  createUser,
  userLogin,
  userLogout,
  updatedUser,
  deleteUser

};




