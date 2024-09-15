const jwt = require('jsonwebtoken');
const jwtSecretKey =process.env.JWT_SECRET;

const authUser = async (req, res, next) => {
 
    
    const token = req.cookies?.token || req.headers['authorization'];
    console.log(req.headers['authorization'],"authmiddeleware");
    console.log(req.cookies,"cokkiee middeleware")
    
   try{
    if (!token) {
        return res.status(401).json({ message: "No active token." });
    }     
        next();
    } catch (error) {
        console.log(error.message);
        
        return res.status(401).json({ message: "Invalid token." });
    }
};




const verifyRole=(...requiredRoles)=>{

return  (req, res, next) => {
    console.log("inside verify role middeleware");
    
 
    const token = req.cookies?.token || req.headers['authorization'];
    console.log(token,"token auth");
    
 
    if (!token) {
        return res.status(401).json({ message: "No active token." });
    }
 
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        console.log(decoded); 
        const role = decoded.role?.trim();
        console.log(role,"role");
        
console.log(requiredRoles,"requiredRole");

      
       
        if (!requiredRoles.includes(role)) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
 
     console.log("verify role");
     
       
       

    } catch (error) {
        console.log(error.message);
        
        return res.status(401).json({ message: "Invalid token." });
    }

   console.log("verify after next");
   next();
}

};


module.exports ={authUser,verifyRole} 