let mongoose = require('mongoose');

let homebannerschema = mongoose.Schema({
    Banner_Tag: {
        type: String,
        required: true,
    },
    Banner_Main_Heading: {
        type: String,
        required: true,
    },
    Banner_Description: {
        type: String,
        required: true,
    },
    Banner_Primary_Btn_Text: {
        type: String,
        required: true,
    },
    Banner_Primary_Btn_Link: {
        type: String,
        required: true,
    },
    Banner_Secondary_Btn_Text: {
        type: String,
        required: true,
    },
    Banner_Secondary_Btn_Link: {
        type: String,
        required: true,
    },
    Banner_Image: {
        type: String,
        required: true,
    },
    Banner_Status: {
        type: Boolean,
        required: true,
    },
})

let homebannermodel = mongoose.model("homebanner", homebannerschema);
module.exports = homebannermodel;