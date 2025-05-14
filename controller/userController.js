const userModel = require("../models/userModel")
const userService = require("../services/userService")
const { validationResult } = require("express-validator")
const blacklistTokenModel = require("../models/blacklistTokenModel")


module.exports.registerUser = async (req, res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    const { fullname, email, password } = req.body

    const isUser = await userModel.findOne({email})
    if(isUser){
        return res.status(401).json({message:"User already exists."})
    } 


    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,        
        email,
        password: hashedPassword
    })

    const token = await user.generateAuthToken()

    res.status(201).json({token,user})
}

module.exports.loginUser = async (req, res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    const {email , password} = req.body
    
    
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message:'Invalid User or Password'})
    }

    const isMatch = await user.comparePassword(password) ;
    if(!isMatch){
        return res.status(401).json({message:'Invalid User or Password'})
    }

    const token = await user.generateAuthToken()

    // res.cookie('token',token)

    res.status(201).json({message:'User login Successfully',token})

}

module.exports.getUserProfile = async(req,res,next)=>{

    res.status(201).json(req.user)

}

module.exports.logout = async(req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'no token provided'})
    }

    const alreadyBlacklisted = await blacklistTokenModel.findOne({ token });

    if (alreadyBlacklisted) {
        return res.status(200).json({ message: 'user already logged out' });
    }

    await blacklistTokenModel.create({token})
    res.status(201).json({message:"User logged out"})
    
}