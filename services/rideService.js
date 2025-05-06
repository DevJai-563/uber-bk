const rideModel = require('../models/rideModel');
const mapService = require('../services/mapService');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    

    const {distance, duration}  = await mapService.getDistanceTime(pickup, destination);
    console.log('Distance:', distance, 'Time:', duration);

    const baseFare = {
        motorcycle: 20,
        car: 50,
        auto: 30
    };

    const perKmRate = {
        motorcycle: 3,
        car: 10,
        auto: 5
    };

    const perMinuteRate = {
        motorcycle: 1,
        car: 2,
        auto: 1.5
    };

    

    const Fare = {
               
        motorcycle: baseFare.motorcycle + (distance * perKmRate.motorcycle) + (duration * perMinuteRate.motorcycle),
        car: baseFare.car + (distance * perKmRate.car) + (duration * perMinuteRate.car),
        auto: baseFare.auto + (distance * perKmRate.auto) + (duration * perMinuteRate.auto)
    };

    return {Fare ,distance, duration};
    
 

    
}

function generateOtp() {
    const otp = crypto.randomInt(10000, 100000); // Generates a random number between 10000 and 99999
    return otp.toString();
}

module.exports.createRide = async ({userId , pickup , destination , vehicleType})=>{
    if(!userId || !pickup || !destination || !vehicleType) {
        throw new Error('User ID, pickup, destination and vehicle type are required');
    }

    const rideInfo = await getFare(pickup, destination);
    console.log('Ride Info:', rideInfo);
    

    const ride = new rideModel({
        userId,
        pickup,
        destination,
        fare: rideInfo.Fare[vehicleType],
        distance: rideInfo.distance ,
        duration: rideInfo.duration ,
        OTP: generateOtp(),
        status: 'pending',
        vehicleType,
        createdAt: new Date(),
        
       
    });

    await ride.save();

    return ride;
}

