const express = require("express")
const router = express.Router()
const captainController = require("../controller/captainController")
const { body } = require("express-validator")
const authMiddleware = require("../middlewares/authMiddleware")



router.post('/register', [
    body('fullname.firstname').isLength({min:3}).withMessage('First name should contain minimum 3 letters'),
    body('email').isEmail().withMessage('Invailid email'),
    body('password').isLength({min:6}).withMessage('Password should contain minimum 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should contain minimum 3 characters'),
    body('vehicle.noPlate').isLength({min:4}).withMessage('Number Plate should contain minimum 4 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity should be a number'),
    body('vehicle.vehicleType').isIn(['car','auto','bike']).withMessage('Invalid vehicle type')
    ], captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain , captainController.getCaptainProfile)
router.get('/logout',authMiddleware.authCaptain,captainController.logout)




module.exports = router