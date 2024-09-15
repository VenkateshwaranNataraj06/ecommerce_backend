const whislistDao = require('../dao/whislistDao');
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET ;


const getWhislist = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);


    console.log( decoded.id," decoded._id in getbyid Whislist",decoded.role);
    const whislist = await whislistDao.getWhislistDao(decoded.id,decoded.role);

    return res.status(200).json(whislist );
  } catch (error) {
    console.error('Error fetching Whislist:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};





const getWhislistById = async (req, res) => {
  try {
    
    const { id } = req.params;
    const cartById = await whislistDao.getWhislistByIdDao(id);
    
    if (!cartById) {
      return res.status(404).json({ message: ' Whislist not found' });
    }
    
    return res.status(200).json(cartById);
  } catch (error) {
    console.error('Error fetching Whislist by ID:', error);
    return res.status(500).json({ message: 'Error fetching Whislist by ID', error: error.message });
  }
};



const createWhislist = async (req, res) => {
  try {
       console.log('Creating Whislist...');
       const token = req.cookies?.token || req.headers['authorization'];

       if(!token)
       {
        return res.status(400).json({message: "Token is required"})
       }
    const decoded = jwt.verify(token, JWT_SECRET);


    console.log( decoded.id," decoded._id in getbyid order",decoded.role);
    const whislist = await whislistDao.createWhislistDao(decoded.id,req.body);
    return res.status(200).json(whislist);
  } catch (error) {
    console.error('Error adding to Whislist:', error);
    return res.status(500).json({ message: 'Error adding to Whislist', error: error.message });
  }
};



const updatedWhislist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWhishlistData = req.body;

    const updatedWhishlist = await whislistDao.updatedWhislistDao(id,updatedWhishlistData);

    if (!updatedWhishlist) {
      return res.status(404).json({ message: 'Whishlist not found' });
    }

    return res.status(200).json(updatedWhishlist);
  } catch (error) {
    console.error('Error updating Whishlist:', error);
    return res.status(500).json({ message: 'Error updating Whishlist', error: error.message });
  }
};

const deleteWhislist = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('delete Whishlist...');
    const token = req.cookies?.token || req.headers['authorization'];

    if(!token)
    {
     return res.status(400).json({message: "Token is required"})
    }
 const decoded = jwt.verify(token, JWT_SECRET);


 console.log( decoded.id," decoded._id in deletbyid whislist",decoded.role);

    const deletedWhislist = await whislistDao.deleteWhislistDao(id);

    if (!deletedWhislist) {
      return res.status(404).json({ message: 'Whishlist not found' });
    }

    return res.status(200).json(deletedWhislist);
  } catch (error) {
    console.error('Error deleting Whishlist:', error);
    return res.status(500).json({ message: 'Error deleting Whishlist', error: error.message });
  }
};

module.exports = {
  getWhislist,
  getWhislistById,
  createWhislist,
  updatedWhislist,
  deleteWhislist
};
