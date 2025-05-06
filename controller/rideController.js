const rideService = require('../services/rideService');
const {validationResult} = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const { pickup, destination, vehicleType} = req.body;
        console.log('Pickup:', pickup, 'Destination:', destination, 'Vehicle Type:', vehicleType);
        console.log('User ID:', req.user._id);
        
        const ride = await rideService.createRide({userId: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json({ message: 'Ride created successfully', ride });

    }catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ message: error.message });
    }
}
