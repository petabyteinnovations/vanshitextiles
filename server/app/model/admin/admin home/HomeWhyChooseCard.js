let mongoose = require('mongoose');

let whychoosecardschema = mongoose.Schema({
    Why_Choose_Card_Main_Heading: {
        type: String,
        required: true,
    },
    Why_Choose_Card_Description: {
        type: String,
        required: true,
    },
    Why_Choose_Card_Image: {
        type: String,
        required: true,
    },
    Why_Choose_Card_Status: {
        type: Boolean,
        required: true,
    },
})

let whychoosecardmodel = mongoose.model("whychoosecard", whychoosecardschema);
module.exports = whychoosecardmodel;