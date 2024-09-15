const {Whislist }= require('../models/whislistModel');
const mongoose = require('mongoose'); 



const getWhislistDao = async (userId,role ) => {
  try {
    console.log("fetching Whislist..........");
    
    console.log(role,"role",userId,"userid");

       console.log(userId,"userid else");
   
       
        const whislist = await Whislist.find({ user: userId })
         .populate('user')
        .populate('items.product');
       

          console.log("Whislist",whislist);
          
        return whislist;
    //   }
    }
   catch (error) {
    throw error;
  }
};

const getWhislistByIdDao = async (id) => {
  try {
    console.log("Fetching Whislist by ID");
    const whislistById = await Whislist.findById(id) 
    return whislistById;
  } catch (error) {
    console.error(error.message); 
    throw error;
  }
};


const createWhislistDao = async (userId,whislistData) => {
    console.log("createWhislistDao???????????????");
    
  try {
  
    const { product,price } = whislistData.items[0];

    
    if (!product) {
      throw new Error("Product ID and quantity are required.");
    }

 const whislist = new Whislist({
    user: userId,
    items: [{
        product: product,
        price: price
    }]
});
      await whislist.save();

console.log(("created dao whislist" ,whislist));

    return whislist;
  } catch (error) {
    throw error;
  }
};


const updatedWhislistDao = async (id, updatedCartData) => {
  try {
    const updatedWhislist = await Whislist.findByIdAndUpdate(id, updatedCartData, {new: true,runValidators: true});
 console.log(updatedWhislist);
 
    return updatedWhislist;
  } catch (error) {
    
    throw error;
  }
};




const deleteWhislistDao=async( id,pId)=>{
  const userId = id
  // const { productId } = pId;
console.log("deleteWhislistDao...",pId,userId );
// const productId =new mongoose.Types.ObjectId(pId);
// console.log(productId ,"productId ");
try{
  let whislist = await Whislist.findOne({ user: userId });

  if (whislist) {
    // console.log("cart",cart);
    
    const itemIndex =whislist.items.findIndex(item => item.product.toString() === pId);
    console.log(itemIndex,"itemindex");
    // console.log("itemIndex",itemIndex,cart.items);
    

    if (itemIndex > -1) {
      // Product exists in the cart, remove it
      console.log("// Product exists in the cart, remove it");
      
      whislist.items.splice(itemIndex, 1);
      whislist = await whislist.save();
      return whislist;
    } 
}
}
catch(error)
{
  console.log(error,"error");

  throw error
  
}

}






module.exports = {
  getWhislistDao,
  getWhislistByIdDao,
  
  createWhislistDao,
  updatedWhislistDao,
  deleteWhislistDao,
 
};



