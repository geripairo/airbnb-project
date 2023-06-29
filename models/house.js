const mongoose = require('mongoose')

const {Schema} = mongoose


const HouseSchema = new Schema ({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('House', HouseSchema);