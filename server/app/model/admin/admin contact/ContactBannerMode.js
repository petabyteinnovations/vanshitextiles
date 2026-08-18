let mongoose = require("mongoose");

let contactbannerschema = mongoose.Schema({
    Contact_Banner_Heading: {
        type: String,
        required: true,
    },
    Contact_Banner_Description: {
        type: String,
        required: true,
    },
    Contact_Banner_Image: {
        type: String,
        required: true,
    },
})

let contactbannermodel = mongoose.model('contactbanner', contactbannerschema)
module.exports = contactbannermodel