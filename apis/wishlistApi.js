const express = require('express');
const whislistApi = express.Router(); 
const whislistService=require('../services/whishlistService')
const {validateWhislist}=require('../middleware/whislistMiddelware')
const authUserMiddleware=require('../middleware/authUserMiddelware')
whislistApi.use(authUserMiddleware.authUser)

whislistApi.post('/',validateWhislist, whislistService.createWhislist)
  

whislistApi.get('/', whislistService.getWhislist)
whislistApi.get('/',  whislistService.getWhislistById)

whislistApi.get('/:id',  whislistService.getWhislistById)
 

whislistApi.put('/:id',validateWhislist, whislistService.updatedWhislist)
  


whislistApi.delete('/:id', whislistService.deleteWhislist)
  

module.exports = whislistApi; 