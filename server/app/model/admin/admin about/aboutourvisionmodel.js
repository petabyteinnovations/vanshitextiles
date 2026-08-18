let mongoose = require("mongoose");

let aboutourvisionschema = mongoose.Schema({
    About_Our_Vision_Heading: {
        type: String,
        required: true,
    },
    About_Our_Vision_Description: {
        type: String,
        required: true,
    }
})

let aboutourvisionmodel = mongoose.model('aboutourvision', aboutourvisionschema)
module.exports = aboutourvisionmodel;