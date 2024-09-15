const { User }= require('../models/userModel');
const bcrypt=require('bcrypt')


const getUserDao = async () => {

  try {
    const user = await User.find()
    return user
  }
  catch (error) {
    throw error;
  }
}

const getUserByIdDao = async (id,role) => {
  try {

    console.log(id,"id",role);
    console.log("Fetching user by ID");
    if(role==='admin')
    {
      const user = await User.find()
      return user
    }
    else{
      const userById = await User.findById(id)
      return [userById]
    }
   
   
   
  }
  
  catch (error) {
    console.error(error.message)
    throw error;
  }
}


const createUserDao = async (userData) => {
  try {
    const user =  new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error; 
  }
};

const userLoginDao=async (email,password)=>
{
  console.log("daoo",password);
  
  try {
    const userCreditional = await User.findOne({ email } );
    console.log(userCreditional,"usercreditional");
   
    if(userCreditional=== null)
    {
      return userCreditional
    }
    const isMatch = await bcrypt.compare(password,userCreditional.password);
    console.log(isMatch,"ismatch");
    
    if (!isMatch) {
      return isMatch
    }
    if(!userCreditional)
      {
        return userCreditional
      }
    return userCreditional
  } catch (error) {
    throw error
    
  }
}

const updatedUserDao = async (id, updatedUserData) => {
  try {

      console.log("dao updated",updatedUserData);
      
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {new: true,runValidators: true});

    return [updatedUser];
  } catch (error) {
    
    throw error;
  }
};

const deleteUserDao=async(id)=>{
  try {
    const deleteUser=await User.findByIdAndDelete(id)
    return deleteUser;
  } catch (error) {
    throw error;
    
  }
}






module.exports = {
  getUserDao,
  getUserByIdDao,
  userLoginDao,
  createUserDao,
  updatedUserDao,
  deleteUserDao,
 
};


// try {
//   console.log('Fetching users...');
// const users = await User.User.find();
// console.log('Users fetched:', users);

// res.status(200).json(users);

// } catch (error) {
//   console.log(error);
  
// res.status(500).json({ message: 'Error retrieving users', error });
// }
