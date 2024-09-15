const { Types } = require('mongoose');
const { Product } = require('../models/productModel');


const validateProduct = async (req, res, next) => {

  console.log("const validateProduct ");

  console.log("request Bodyaskdpaksdp", req.body);

    const { name, price, description, category,brand, stock, images } = req.body;

    const { id } = req.params;
    // console.log('Name:', name);
    // console.log('Price:', price);
    // console.log('Description:', description);
    // console.log('Category:', category);
    // console.log('Brand:', brand);
    // console.log('Stock:', stock);
    // console.log('Images:', images);


    // console.log('Files:', req.files); 
    // console.log('File:', req.file); 
    // console.log('body', req.body); 



    // if(!req.files)
    // {
    //     return res.status(400).json({ message: 'file is required and must be a string.' });
    // }
    const trimmedName = typeof name === 'string' ? name?.trim() : '';
    const trimmedBrand = typeof name === 'string' ? brand?.trim() : '';
    const trimmedDescription = typeof description === 'string' ? description?.trim() : '';
    // const trimmedCategory=typeof category=== 'string'?category?.trim():'';
   
    
    if (!trimmedName) {
        console.log("name condition");
        
       
        return res.status(400).json({ message: 'Name is required and must be a string.' });
    }
    if (!trimmedDescription) {
        console.log("Description condition");
        return res.status(400).json({ message: 'Description is required and must be a string.'});
    }
    if ( price <= 0) {
        
        console.log("Price condition");
        return res.status(400).json({ message: 'Price is required and must be a positive number.'});
    }
    // if (!Types.ObjectId.isValid(category)) {
        
    //     return res.status(400).json({ message: 'Category is required and must be a valid ObjectId.'});
    // }
    if(!trimmedBrand)

    {
        console.log("Brand condition");
        return res.status(400).json({ message: 'Brand required and must be a string.' });
    }
    // if (!trimmedCategory) {
    //     console.log("Category  condition",trimmedCategory,"klhuyu");
    //     return res.status(400).json({ message: 'Category is required .'});
    // }
    if (stock !== undefined && stock < 0) {
        console.log("stock",stock);
        
        return res.status(400).json({ message: 'Stock must be a non-negative integer.' });
    }
   if (Array.isArray(images)) {
    console.log("Array.isArray(images).");
    const invalidImage = images.some(image => 
        typeof image !== 'string' || image.trim() === '' || 
        !(isValidUrl(image.trim()) || isValidLocalPath(image.trim()))
      );
    if (invalidImage) {
        console.log("valid non-empty string or URL.");
      return res.status(400).json({ message: 'Each image must be a valid non-empty string or URL.' });
    }
    console.log("image check array>>>>>>>>");
    
  } else if (req.files) {
    console.log("File upload condition");
    
    if (!req.files) {
        console.log("File upload","con");
        
      return res.status(400).json({ message: 'File upload is required if no image URLs are provided.' });
    }
  } else {
    console.log("Images  condition");
    return res.status(400).json({ message: 'Images must be provided either as an array of URLs or as a file upload.' });
  }



    // try {
        
    //     const existingProduct = await Product.findOne({
    //         name: trimmedName,
    //         category,
    //         _id: { $ne: id }
    //     });

    //     if (existingProduct) {
    //         return res.status(409).json({ message: 'A product with the same name and category already exists.' });
    //     }
        
    // } catch (error) {
    //     console.error(error.message);
    //     return res.status(500).json({ message: 'Error checking for duplicate products.' });
    // }

 
    try {
        
        
        const existingProduct = await Product.findOne({
            description:  trimmedDescription ,
             _id: { $ne: id }
        });

        if (existingProduct) {
          console.log("duplicate dproduct check>>>>>");
            return res.status(409).json({ message: 'A product with the same description already exists.' });
        }
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error checking for duplicate products.' });
    }

console.log("product validation completed::::::::::S");

     

    next();
};

const isValidUrl = (url) => {
    try {
        console.log("jkhjgy",url);
        
      new URL(url);
      console.log(new URL(url),"  new URL(url);");
      
      return true;
    } catch (e) {
      return false;
    }
  };
  const isValidLocalPath = (path) => {
   
    return typeof path === 'string' && path.trim().startsWith('/');
  };
  



module.exports = { validateProduct ,
  
   
};

















// const { Product } = require('../models/productModel'); 


// const validateProduct = async (req, res, next) => {
//     const { name, price, description, category, stock, images } = req.body;
//     const { id } = req.params;
        
    
//     const trimmedName = typeof name === 'string' ? name.trim() : '';
//     const trimmedDescription = typeof description === 'string' ? description.trim() : '';
//     const trimmedCategory = typeof category === 'string' ? category.trim().toUpperCase() : '';
//     const trimmedImage = typeof image === 'string' ? image.trim() : '';

   
//     if (!trimmedDescription) {
//         return res.status(400).json({ message: 'Description is required and must be a string.' });
//     }
//     if (!trimmedName) {
//         return res.status(400).json({ message: 'Name is required and must be a string.' });
//     }
//     if (isNaN(Number(price)) || Number(price) <= 0) {
//         return res.status(400).json({ message: 'Price is required and must be a positive number.' });
//     }
    
//     if (!trimmedCategory) {
//         return res.status(400).json({ message: 'Category is required and must be a string.' });
//     }

//     if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
//         return res.status(400).json({ message: 'Stock must be a non-negative integer.' });
//     }

//     if (trimmedImage && typeof trimmedImage !== 'string') {
//         return res.status(400).json({ message: 'Image must be a valid URI string.' });
//     }

//     try {
       
//         const existingProduct = await Product.findOne({
//              name: trimmedName, 
//             category: trimmedCategory ,
//          _id: { $ne: id }
//         });
//         if (existingProduct) {
//             return res.status(409).json({ message: 'A product with the same name and category already exists.' });
//         }
//     } catch (error) {
//         console.log(error.message);
        
//         return res.status(500).json({ message: 'Error checking for duplicate products.' });
//     }

//     next();
// };






// module.exports = { validateProduct ,};
