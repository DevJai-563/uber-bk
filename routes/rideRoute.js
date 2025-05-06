const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const rideController = require('../controller/rideController');
const {body} = require('express-validator');

const router = express.Router();

router.post('/createRide', 
   
    body('pickup').isString().withMessage('Pickup location is required'),
    body('destination').isString().withMessage('Dropoff location is required'),
    body('vehicleType').isString().isIn(['motorcycle', 'car', 'auto']).withMessage('Vehicle type is required and must be one of motorcycle, car, or auto'),
    authMiddleware.authUser,rideController.createRide
    
)

module.exports = router;