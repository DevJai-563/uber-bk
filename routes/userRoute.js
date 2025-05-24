const express = require("express")
const router = express.Router()

const userModel = require("../models/userModel")
const { body } = require("express-validator")

const authMiddleware = require("../middlewares/authMiddleware")

const userController = require("../controller/userController")

router.post('/register', [
    body('email').isEmail().withMessage('Invailid email'),
    body('fullname.firstname').isLength({min:3}),
    body('password').isLength({min:6}).withMessage('Password should contain minimum 6 characters'),
],
userController.registerUser
)


router.post('/login',[
    body('email').isEmail().withMessage('Invailid email'),
    body('password'),
],
userController.loginUser
)


router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logout)



module.exports = router