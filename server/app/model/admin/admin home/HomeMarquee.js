let mongoose = require('mongoose');

let homemarqueeschema = mongoose.Schema({
    Marquee_Text: {
        type: String,
        required: true,
    },
    Marquee_Status: {
        type: Boolean,
        required: true,
    },
})

let homemarqueemodel = mongoose.model("homemarquee", homemarqueeschema);
module.exports = homemarqueemodel;