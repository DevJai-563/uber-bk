const captainService = require("../services/captainService")
const captainModel = require("../models/captainModel")
const { validationResult } = require("express-validator")
const blacklistTokenModel = require("../models/blacklistTokenModel")


module.exports.registerCaptain = async (req,res,next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }


    try{

    const {fullname , email , password , vehicle } = req.body 

    const isCaptain = await captainModel.findOne({email})
        if(isCaptain){
            return res.status(401).json({message:"Captain already exists."})
        }
    const isNoPlate = await captainModel.findOne({'vehicle.noPlate': vehicle.noPlate})
        if(isNoPlate){
            return res.status(401).json({message:"Number Plate already exists."})
        }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,        
        email,
        password: hashedPassword,
        color: vehicle.color,
        noPlate: vehicle.noPlate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
    })

    const token = await captain.generateAuthToken()

    res.status(201).json({token,captain})
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }

}

module.exports.loginCaptain = async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    const {email , password} = req.body

   
        const captain = await captainModel.findOne({email}).select('+password')
        if(!captain){
            return res.status(401).json({message:"Username or Password invalid"})
        }

        const isCaptain = await captain.comparePassword(password)
        if(!isCaptain){
            return res.status(401).json({message:"Username or Password invalid"})
        }

        const token = await captain.generateAuthToken()

        res.cookie('token',token)

        res.status(201).json({message:"Captain logged in", token , captain})


    
}

module.exports.getCaptainProfile = async(req,res)=>{
    res.status(201).json(req.captain)
}

module.exports.logout = async(req,res,next)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'no token provided'})
    }

    await blacklistTokenModel.create({token : token})
    res.status(201).json({message:"Captain logged out"})
}