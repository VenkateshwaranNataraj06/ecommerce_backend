const {Category }= require('../models/categoryModel');


const getCategoryDao=async()=>{
  try{
    console.log("categoryy......");
    
    const category= await Category.find()
    return category
  }
  catch(error)
  {
    throw error; 
  }
}



const getCategoryByIdDao = async (id) => {
  try {
    console.log("Fetching Category by ID");
    const categoryById = await Category.findById(id) 
    return categoryById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};


const createCategoryDao = async (CategoryData) => {
  try {
   
    const category =  new Category( CategoryData);
    await category.save();
    return category;
  } catch (error) {
    throw error; 
  }
};


const updatedCategoryDao = async (id, updatedCategoryData) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updatedCategoryData, {new: true,runValidators: true});
 console.log(updatedCategory);
 
    return updatedCategory;
  } catch (error) {
    
    throw error;
  }
};

const deleteCategoryDao=async(id)=>{
  try {
    const deleteCategory=await Category.findByIdAndDelete(id)
    return deleteCategory;
  } catch (error) {
    throw error;
    
  }
}






module.exports = {
  getCategoryDao,
  getCategoryByIdDao,
  
  createCategoryDao,
  updatedCategoryDao,
  deleteCategoryDao,
 
};


