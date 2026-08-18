let mongoose = require('mongoose');

let faqschema = mongoose.Schema({
    Faq_Question: {
        type: String,
        required: true
    },
    Faq_Answer: {
        type: String,
        required: true
    },
    Faq_Status: {
        type: String,
        required: true
    }
})

let faqmodel = mongoose.model('faqs', faqschema);
module.exports = faqmodel;