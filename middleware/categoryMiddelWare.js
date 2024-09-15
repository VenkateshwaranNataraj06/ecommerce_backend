
const {Category}=require('../models/categoryModel');

const categorValidate = async (req, res, next) => {
    const { name ,description,image } = req.body;
    const { id } = req.params;
    const trimmedName = typeof name === 'string' ? name?.trim() : '';
    const trimmedDescription = typeof description === 'string' ? description.trim() : '';
    
    if (!trimmedName) {
        return res.status(400).json({ message: 'Name is required and must be a string.' });
    }

    if (!trimmedDescription) {
        return res.status(400).json({ message: 'Description is required and must be a string.' });
    }
    const upperCaseName = trimmedName.toUpperCase();
    const invalidImage =  typeof image !== 'string' || image.trim() === '' || 
        !(isValidUrl(image.trim()) )
      
    if (invalidImage) {
        console.log("valid non-empty string or URL.");
      return res.status(400).json({ message: 'Each image must be a valid non-empty string or URL.' });
    }
    try {
    
        const isDuplicate = await Category.findOne({
             name: upperCaseName,
             
             _id: { $ne: id }
            });

        if (isDuplicate) {
            return res.status(400).json({ message: 'Category name already exists.' });
        }

       
        req.body.name = upperCaseName;
        next();
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({ message: 'Internal server error.' });
    }
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
module.exports={
    categorValidate,
}