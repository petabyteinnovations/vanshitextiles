let mongoose = require("mongoose");

let aboutdescriptionschema = mongoose.Schema({
    About_Description_Heading: {
        type: String,
        required: true,
    },
    About_Description: {
        type: String,
        required: true,
    },
    About_Description_Image: {
        type: String,
        required: true,
    },
})

let aboutdescriptionmodel = mongoose.model('aboutdescription', aboutdescriptionschema)
module.exports = aboutdescriptionmodel