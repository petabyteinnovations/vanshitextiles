let mongoose = require("mongoose");

let blogbannerschema = mongoose.Schema({
    Blog_Banner_Heading: {
        type: String,
        required: true,
    },
    Blog_Banner_Description: {
        type: String,
        required: true,
    },
    Blog_Banner_Image: {
        type: String,
        required: true,
    },
})

let blogbannermodel = mongoose.model('blogbanner', blogbannerschema)
module.exports = blogbannermodel