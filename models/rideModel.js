const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fare: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },  
    OTP: {
        type: String,
        required: true,
        select: false
    },
    vehicleType: {
        type: String,
        enum: ['motorcycle', 'car', 'auto'],
        required: true
    },
    // paymentId: {
    //     type: String,
    //     required: true
    // },
    // orderId: {
    //     type: String,
    //     required: true
    // },
    // signature: {
    //     type: String,
    //     required: true
    // },

})

module.exports = mongoose.model('Ride', rideSchema);