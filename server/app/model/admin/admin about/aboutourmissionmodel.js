let mongoose = require("mongoose");

let aboutourmissionschema = mongoose.Schema({
    About_Our_Mission_Heading: {
        type: String,
        required: true,
    },
    About_Our_Mission_Description: {
        type: String,
        required: true,
    }
})

let aboutourmissionmodel = mongoose.model('aboutourmission', aboutourmissionschema)
module.exports = aboutourmissionmodel