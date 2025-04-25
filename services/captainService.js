const captainModel = require("../models/captainModel")

module.exports.createCaptain = async ({firstname, lastname, email, password, color ,noPlate , vehicleType , capacity}) => {
    if(!firstname|| !lastname|| !email|| !password|| !color || !noPlate || !vehicleType || !capacity){
        throw new Error("All fields are required")
    }

    const captain =  captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            noPlate,
            vehicleType,
            capacity
        }
    })
    return captain
}