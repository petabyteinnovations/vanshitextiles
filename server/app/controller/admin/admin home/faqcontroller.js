let mongoose = require("mongoose");
let { client } = require('../../../config/redisconnection');
const sendJson = require("../../../utils/sendJson");
const manufacturingprocessmodel = require("../../../model/admin/admin home/HomeManufacturingProcess");
const faqmodel = require("../../../model/admin/admin faq/FaqModel");




// faq controllers

exports.addfaqs = async (req, res) => {
    try {
        let data = {
            Faq_Question: req.body.Faq_Question,
            Faq_Answer: req.body.Faq_Answer,
            Faq_Status: req.body.Faq_Status === 'true' ? req.body.Faq_Status : false,
        }

        if (!data.Faq_Question || !data.Faq_Answer) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let insertdata = await faqmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('faqs');
                return sendJson(res, 1, "Data Successfully Uploaded", null, null)
            })
            .catch((err) => {
                if (err.code === 11000) {
                    return sendJson(res, 0, "Data Already Exists", null, null)
                }
                else {
                    return sendJson(res, 0, "All Inputs Required", null, null)
                }
            })
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}



exports.viewadminfaqs = async (req, res) => {
    try {
        let viewimages = await faqmodel.find();
        let imageurl = process.env.IMAGEURL
        let data = {
            viewimages
        }
        return sendJson(res, 1, "All Admin Data", data, null)
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}



exports.updatefaqs = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Faq_Question: req.body.Faq_Question,
            Faq_Answer: req.body.Faq_Answer,
            Faq_Status: req.body.Faq_Status === 'true' ? true : false,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }


        if (data.Faq_Question === '' || data.Faq_Answer === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        let updatedata = await faqmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            await client.del('faqs');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/faqs/view-faqs')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}



exports.deletefaqs = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await faqmodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('faqs');
            return sendJson(res, 1, "Data Deleted Successfully", null, null)
        }
        else {
            return sendJson(res, 0, "Data doesn't deleted", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}


exports.viewfaqs = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("faqs");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await faqmodel.find({ Faq_Status: true });
            console.log(viewimages)
            await client.set(
                "faqs",
                JSON.stringify(viewimages)
            );
        }

        return sendJson(res, 1, "All Website Data", {
            viewimages
        }, null);

    } catch (err) {
        console.log(err);
        return sendJson(res, 0, "Something went wrong", null, null);
    }
};