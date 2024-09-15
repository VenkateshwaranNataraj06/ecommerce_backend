const express=require('express');
const multer = require('multer');
const path = require('path');
const userApi=express.Router()
const  userMiddelware  = require('../middleware/userMiddelware');
const userService=require('../services/userService')
const authMiddelware=require('../middleware/authUserMiddelware')


const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"--"+ file.originalname);
       
    }

})

const upload =multer({
    storage:fileStorage
})
// userApi.get('/',authMiddelware.authUser,userService.getUser )
userApi.get('/',authMiddelware.authUser,userService.getUserById )
userApi.get('/:id',userService.getUserById)
userApi.post('/signup',userMiddelware.validateUserSignUp ,userService.createUser )
userApi.post('/login',userMiddelware.loginValidateUser,userService.userLogin)
userApi.post('/logout',userService.userLogout)
userApi.put('/:id',authMiddelware.authUser,upload.single('image'),userMiddelware.validateUser,userService.updatedUser);
userApi.delete('/:id',authMiddelware.authUser,userService.deleteUser )
 



module.exports=userApi