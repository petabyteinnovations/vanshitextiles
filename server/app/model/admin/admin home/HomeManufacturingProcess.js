let mongoose = require('mongoose');

let manufacturingprocessschema = mongoose.Schema({
    Manufacturing_Process_Main_Heading: {
        type: String,
        required: true,
    },
    Manufacturing_Process_Description: {
        type: String,
        required: true,
    },
    Manufacturing_Process_Image: {
        type: String,
        required: true,
    },
    Manufacturing_Process_Status: {
        type: Boolean,
        required: true,
    },
})

let manufacturingprocessmodel = mongoose.model("manufacturingprocess", manufacturingprocessschema);
module.exports = manufacturingprocessmodel;