let mongoose = require('mongoose');

let whychoosebannerschema = mongoose.Schema({
    Why_Banner_Tag: {
        type: String,
        required: true,
    },
    Why_Banner_Main_Heading: {
        type: String,
        required: true,
    },

    Why_Banner_Primary_Btn_Text: {
        type: String,
        required: true,
    },
    Why_Banner_Primary_Btn_Link: {
        type: String,
        required: true,
    },
    Why_Banner_Image: {
        type: String,
        required: true,
    }
})

let whychoosebannermodel = mongoose.model("whychoosebanner", whychoosebannerschema);
module.exports = whychoosebannermodel;