
const express = require("express")
const router = express.Router()
const authMiddleware  = require('../middlewares/authMiddleware')
const mapController = require('../controller/mapController')

router.get('/coordinates', authMiddleware.authUser, mapController.getCoordinates)
router.get('/disandtime', authMiddleware.authUser, mapController.getDistanceTime)


module.exports = router