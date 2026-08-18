let mongoose = require("mongoose");

let counterschema = mongoose.Schema({
    Counter_Title: {
        type: String,
        required: true,
    },
    Counter_Value: {
        type: String,
        required: true,
    },
    Counter_Icon: {
        type: String,
        required: true,
    },
})

let countermodel = mongoose.model('counters', counterschema)
module.exports = countermodel