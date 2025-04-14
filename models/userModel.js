const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{ expiresIn: '2d' })
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model('user',userSchema)

module.exports = userModel