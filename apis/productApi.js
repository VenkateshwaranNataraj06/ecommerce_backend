const express = require('express');
const multer = require('multer');

const path = require('path');
const productApi = express.Router();
const authUserMiddleware = require("../middleware/authUserMiddelware")

const productMiddeleWare=require('../middleware/productMiddelWare')
const productService=require('../services/productService')

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


productApi.get('/',productService.getProduct)
productApi.get('/:id',authUserMiddleware.authUser,productService.getProductById)
productApi.post('/', authUserMiddleware.authUser,authUserMiddleware.verifyRole('admin'),upload.array('images',5), productMiddeleWare.validateProduct,productService.createProduct)
productApi.put('/:id',authUserMiddleware.authUser,authUserMiddleware.verifyRole('admin'),upload.array('images'), productMiddeleWare.validateProduct,productService.updatedProduct)
productApi.delete('/:id',authUserMiddleware.authUser,authUserMiddleware.verifyRole('admin'),productService.deleteProduct)

// productApi.post('/upload', upload.single('image', (req, res) => {
//     console.log(req.file);
//     if (req.file) {
//         return res.status(200).json({ message: "file upload..." })
//     }
//     else {
//         return res.status(400).json({ message: "file not upload..." })
//     }


// })

// )

// productApi.post('/upload', upload.array('image',2), (req, res) => {
//     console.log(req.files);

//     if (req.files) {
//         return res.status(200).json({ message: "File uploaded successfully." });
//     } else {
//         return res.status(400).json({ message: "File not uploaded." });
//     }
// });


module.exports = productApi;
