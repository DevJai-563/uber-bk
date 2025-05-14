const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            require: true,
            minlength: [3,'First name should contain minimun 3 letters.']
        },
        lastname:{
            type: String,
        }
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
        select: false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type:String,
            require: true,
            minlength:[3,'Color should contain atleast 3 char'],
            

        },
        noPlate:{
            type : String,
            require: true,
            minlength:[4, 'Number Plate should contain atleast 4 char'],
            unique: true
        },
        capacity:{
            type:Number,
            require: true,
            min: [1, 'Capacity must be atleat 1 passenger']
        },
        vehicleType:{
            type: String,
            require: true,
            enum: ['car','auto','bike']

        }

    },
    location:{
        lon:{
            type:Number
        },
        lat:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{ expiresIn: '1d' })
    return token
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel