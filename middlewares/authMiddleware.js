const userModel = require("../models/userModel")
const captainModel = require("../models/captainModel")
const blacklistModel = require("../models/blacklistTokenModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.authUser = async (req,res,next) => {

    const token =  req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlacklisted = await blacklistModel.findOne({token})
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{

        const decoded = jwt.verify( token , process.env.JWT_SECRET)
        
        const user = await userModel.findById(decoded._id)
        
        req.user = user;

        return next();
    


    }catch{
        res.status(401).json({message:"Unauthorized"})
    }


}

module.exports.authCaptain = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"token missing"})
    }

    const istokenblklisted = await blacklistModel.findOne({token})
    if(istokenblklisted){
        return res.status(401).json({message:"Unauthorised"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const captain = await captainModel.findById(decoded._id)
        

        req.captain = captain 
        
        
        return next();


    }catch{
        res.status(401).json({message:"Unauthorized"})
    }
}