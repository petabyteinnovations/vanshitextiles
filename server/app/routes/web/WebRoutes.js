let express = require("express");
const { viewhomebanner, viewhomemarquee, viewwhychoosebanner, viewwhychoosecards, viewmanufacturingprocesscards } = require("../../controller/admin/admin home/homecontroller");
const { viewfaqs } = require("../../controller/admin/admin home/faqcontroller");
const { viewblogs, viewblogbanner } = require("../../controller/admin/admin home/blogscontroller");
const { viewcontactbanner } = require("../../controller/admin/admin home/contactcontroller");
const { viewaboutbanner, viewaboutdescriptioncontroller, viewaboutourvisioncontroller, viewaboutourmissioncontroller } = require("../../controller/admin/admin home/aboutcontroller");
let webroutes = express.Router();

webroutes.get("/view-home-banner", viewhomebanner);
webroutes.get("/view-marquee", viewhomemarquee);
webroutes.get("/view-why-choose-banner", viewwhychoosebanner);
webroutes.get("/view-why-choose-card", viewwhychoosecards);
webroutes.get("/view-manufacturing-cards", viewmanufacturingprocesscards);
// faq routes 
webroutes.get("/view-faqs", viewfaqs);
// blogs routes 
webroutes.get("/view-blogs-banner", viewblogbanner)
webroutes.get("/view-blogs", viewblogs)
// contact routes 
webroutes.get("/view-contacts-banner", viewcontactbanner)
// about routes 
webroutes.get("/view-about-banner", viewaboutbanner)
webroutes.get("/view-about-description", viewaboutdescriptioncontroller)
webroutes.get("/view-about-our-mission", viewaboutourmissioncontroller)
webroutes.get("/view-about-our-vision", viewaboutourvisioncontroller)
module.exports = webroutes;
