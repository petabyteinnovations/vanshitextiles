let express = require("express");
let path = require('path')
const {
  adminlogincontroller,
  verifyadminotpcontroller,
} = require("../../controller/admin/auth");
const { addhomebanner, viewadminhomebanner, updatehomebanner, deletehomebanner, addhomemarquee, viewadminhomemarquee, deletehomemarquee, updatehomemarquee, addwhychoosebanner, viewadminwhychoosebanner, updatewhychoosebanner, addwhychoosecards, viewadminwhychoosecards, deletewhychoosecards, updatewhychoosecards, addmanufacturingprocesscards, viewadminmanufacturingprocesscards, updatemanufacturingprocesscards, deletemanufacturingprocesscards } = require("../../controller/admin/admin home/homecontroller");
let adminroutes = express.Router();
let multer = require('multer');
const sendJson = require("../../utils/sendJson");
const jwt = require('jsonwebtoken');
const csrf = require("../../utils/csrf");
const { addfaqs, viewadminfaqs, deletefaqs, updatefaqs } = require("../../controller/admin/admin home/faqcontroller");
const { addblogs, viewadminblogs, deleteblogs, viewadminblogsfilter, updateblogs, addblogbanner, viewadminblogbanner, updateblogbanner } = require("../../controller/admin/admin home/blogscontroller");
const { addcontactbanner, viewadmincontactbanner, updatecontactbanner } = require("../../controller/admin/admin home/contactcontroller");
const { addaboutbanner, viewadminaboutbanner, updateaboutbanner, addaboutdescriptioncontroller, viewadminaboutdescriptioncontroller, updateaboutdescriptioncontroller, addaboutmisssioncontroller, viewadminaboutourmissioncontroller, updateaboutourmissioncontroller, addaboutourvisioncontroller, viewadminaboutourvisioncontroller, updateaboutourvisioncontroller } = require("../../controller/admin/admin home/aboutcontroller");
require('dotenv').config();

let storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads'))
  },
  filename: (req, file, cb) => {
    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PNG, JPG and JPEG files are allowed."));
    }

    console.log(file)
    const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname);
    const filename = 'file' + uniquesuffix + extension;
    file.originalname = filename
    cb(null, filename)
  }
})

const upload = multer({ storage: storage }).any(['Banner_Image', 'Why_Banner_Image', 'Why_Choose_Card_Image', 'Manufacturing_Process_Image', 'Blogs_Image', 'Blog_Banner_Image', 'Contact_Banner_Image'])



const renameFile = (req, res, next) => {
  req.files.forEach((file) => {

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1E9);

    const extension =
      path.extname(file.originalname);

    const filename =
      "file" + uniqueSuffix + extension;

    file.originalname = filename;
    file.filename = filename;
  });

  next();
};



const verifytoken = (req, res, next) => {
  try {
    let header = req.headers['authorization']
    if (!header) {
      return sendJson(res, 0, "Token is required", null, "/pages/admin/auth/sign-in")
    }
    else {
      jwt.verify(header, process.env.ADMINJSONWEBTOKEN, (err, value) => {
        if (err) {
          return sendJson(res, 0, "Invalid Token", null, "/pages/admin/auth/sign-in");
        }
        else {
          next();
        }
      })
    }
  }
  catch (err) {
    return sendJson(res, 0, "Something went wrong", null, null)
  }
}

const checksession = (req, res, next) => {
  try {
    if (!req.session.user) {
      return sendJson(res, 0, "Unauthorized User", null, "/pages/admin/auth/sign-in")
    }
    next();

  }
  catch (err) {

    return sendJson(res, 0, "Something went wrong", null, null)
  }
}

const checkcsrftoken = (req, res, next) => {
  try {
    const csrftoken = req.headers['csrftoken'];

    if (!req.session.user) {
      return sendJson(
        res,
        0,
        "Session Expired",
        null,
        "/pages/admin/auth/sign-in"
      );
    }


    if (!csrftoken) {
      return sendJson(
        res,
        0,
        "CSRF Token Required",
        null,
        "/pages/admin/auth/sign-in"
      );
    }

    const valid = csrf.verify(req.session.user, csrftoken);

    if (!valid) {
      return sendJson(
        res,
        0,
        "Invalid CSRF Token",
        null,
        "/pages/admin/auth/sign-in"
      );
    }

    next();
  } catch (err) {
    return sendJson(res, 0, "Something went wrong", null, null);
  }
};


adminroutes.post("/sign-in", adminlogincontroller);
adminroutes.post("/verify-otp", verifyadminotpcontroller);

// home banner section 
adminroutes.post("/add-home-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, addhomebanner);
adminroutes.get("/view-home-banner", verifytoken, checksession, checkcsrftoken, upload, viewadminhomebanner);
adminroutes.put("/update-home-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, updatehomebanner);
adminroutes.delete("/delete-home-banner", verifytoken, checksession, checkcsrftoken, upload, deletehomebanner);

// home marquee section 
adminroutes.post("/add-home-marquee", verifytoken, checksession, checkcsrftoken, addhomemarquee);
adminroutes.get("/view-home-marquee", verifytoken, checksession, checkcsrftoken, viewadminhomemarquee);
adminroutes.put("/update-home-marquee", verifytoken, checksession, checkcsrftoken, updatehomemarquee);
adminroutes.delete("/delete-home-marquee", verifytoken, checksession, checkcsrftoken, deletehomemarquee);


// why choose banner section 
adminroutes.post("/add-why-choose-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, addwhychoosebanner);
adminroutes.get("/view-why-choose-banner", verifytoken, checksession, checkcsrftoken, viewadminwhychoosebanner);
adminroutes.put("/update-why-choose-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, updatewhychoosebanner);


// why choose card section 
adminroutes.post("/add-why-choose-card", verifytoken, checksession, checkcsrftoken, upload, renameFile, addwhychoosecards);
adminroutes.get("/view-why-choose-card", verifytoken, checksession, checkcsrftoken, viewadminwhychoosecards);
adminroutes.put("/update-why-choose-card", verifytoken, checksession, checkcsrftoken, upload, renameFile, updatewhychoosecards);
adminroutes.delete("/delete-why-choose-card", verifytoken, checksession, checkcsrftoken, deletewhychoosecards);


// why choose card section 
adminroutes.post("/add-manufacturing-cards", verifytoken, checksession, checkcsrftoken, upload, renameFile, addmanufacturingprocesscards);
adminroutes.get("/view-manufacturing-cards", verifytoken, checksession, checkcsrftoken, viewadminmanufacturingprocesscards);
adminroutes.put("/update-manufacturing-cards", verifytoken, checksession, checkcsrftoken, upload, renameFile, updatemanufacturingprocesscards);
adminroutes.delete("/delete-manufacturing-cards", verifytoken, checksession, checkcsrftoken, deletemanufacturingprocesscards);


// why choose card section 
adminroutes.post("/add-faqs", verifytoken, checksession, checkcsrftoken, addfaqs);
adminroutes.get("/view-faqs", verifytoken, checksession, checkcsrftoken, viewadminfaqs);
adminroutes.put("/update-faqs", verifytoken, checksession, checkcsrftoken, updatefaqs);
adminroutes.delete("/delete-faqs", verifytoken, checksession, checkcsrftoken, deletefaqs);


// blogs banner section 
adminroutes.post("/add-blogs-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, addblogbanner);
adminroutes.get("/view-blogs-banner", verifytoken, checksession, checkcsrftoken, viewadminblogbanner);
adminroutes.put("/update-blogs-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, updateblogbanner);


// blogs section 
adminroutes.post("/add-blogs", verifytoken, checksession, checkcsrftoken, upload, renameFile, addblogs);
adminroutes.get("/view-blogs", verifytoken, checksession, checkcsrftoken, viewadminblogs);
adminroutes.post("/view-blog-detail", verifytoken, checksession, checkcsrftoken, viewadminblogsfilter);
adminroutes.put("/update-blog", verifytoken, checksession, checkcsrftoken, upload, renameFile, updateblogs);
adminroutes.delete("/delete-blogs", verifytoken, checksession, checkcsrftoken, deleteblogs);

// blogs banner section 
adminroutes.post("/add-contact-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, addcontactbanner);
adminroutes.get("/view-contact-banner", verifytoken, checksession, checkcsrftoken, viewadmincontactbanner);
adminroutes.put("/update-contact-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, updatecontactbanner);


// about banner section 
adminroutes.post("/add-about-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, addaboutbanner);
adminroutes.get("/view-about-banner", verifytoken, checksession, checkcsrftoken, viewadminaboutbanner);
adminroutes.put("/update-about-banner", verifytoken, checksession, checkcsrftoken, upload, renameFile, updateaboutbanner);



// about banner section 
adminroutes.post("/add-about-description", verifytoken, checksession, checkcsrftoken, upload, renameFile, addaboutdescriptioncontroller);
adminroutes.get("/view-about-description", verifytoken, checksession, checkcsrftoken, viewadminaboutdescriptioncontroller);
adminroutes.put("/update-about-description", verifytoken, checksession, checkcsrftoken, upload, renameFile, updateaboutdescriptioncontroller);

// about our mission section 
adminroutes.post("/add-about-our-mission", verifytoken, checksession, checkcsrftoken, addaboutmisssioncontroller);
adminroutes.get("/view-about-our-mission", verifytoken, checksession, checkcsrftoken, viewadminaboutourmissioncontroller);
adminroutes.put("/update-about-our-mission", verifytoken, checksession, checkcsrftoken, updateaboutourmissioncontroller);


// about our vision section 
adminroutes.post("/add-about-our-vision", verifytoken, checksession, checkcsrftoken, addaboutourvisioncontroller);
adminroutes.get("/view-about-our-vision", verifytoken, checksession, checkcsrftoken, viewadminaboutourvisioncontroller);
adminroutes.put("/update-about-our-vision", verifytoken, checksession, checkcsrftoken, updateaboutourvisioncontroller);

module.exports = adminroutes;
