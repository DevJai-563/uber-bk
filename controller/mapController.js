const { validationResult } = require('express-validator');
const mapService = require('../services/mapService');

module.exports.getCoordinates = async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const  {address}  = req.query;
        
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }
        const coordinates = await mapService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error(error);
         res.status(404).json({ message: 'coordinater not found' });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ message: 'Origin and destination addresses are required' });
        }
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
         res.status(404).json({ message: 'distance and time not found' });
    }
}