let mongoose = require('mongoose');

let blogsschema = mongoose.Schema({
    Blog_Main_Heading: {
        type: String,
        required: true,
    },
    Blog_Description: {
        type: String,
        required: true,
    },
    Blog_Image: {
        type: String,
        required: true,
    },
    Blog_Status: {
        type: Boolean,
        required: true,
    },
})

let blogsmodel = mongoose.model("blogs", blogsschema);
module.exports = blogsmodel;