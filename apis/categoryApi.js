const express = require('express')
const categoryApi = express.Router();
const categoryService = require('../services/categoryService')
const categoryMiddelware = require('../middleware/categoryMiddelWare')
const authUserMiddleware=require('../middleware/authUserMiddelware')
// categoryApi.use(authUserMiddleware.authUser)
// categoryApi.use(authUserMiddleware.verifyRole)

categoryApi.get('/',categoryService.getCategory)
categoryApi.get('/:id',authUserMiddleware.authUser, categoryService.getCategoryById)

categoryApi.post('/',authUserMiddleware.authUser, authUserMiddleware.verifyRole('admin'),categoryMiddelware.categorValidate, categoryService.createCategory)


categoryApi.put('/:id',authUserMiddleware.authUser,authUserMiddleware.verifyRole('admin'), categoryMiddelware.categorValidate, categoryService.updatedCategory)
categoryApi.delete('/:id',authUserMiddleware.authUser, authUserMiddleware.verifyRole('admin'),categoryService.deleteCategory)

module.exports = categoryApi