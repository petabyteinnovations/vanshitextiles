let mongoose = require("mongoose");
let { client } = require('../../../config/redisconnection');
const sendJson = require("../../../utils/sendJson");
const checklink = require("../../../utils/checkLink");
const removeImage = require("../../../utils/removeImages");
const { uploadFile, deletefile } = require("../../../utils/r2setup");
const contactbannermodel = require("../../../model/admin/admin contact/ContactBannerMode");




// add contacts banner controller 


exports.addcontactbanner = async (req, res) => {
    try {
        let data = {
            Contact_Banner_Heading: req.body.Contact_Banner_Heading,
            Contact_Banner_Description: req.body.Contact_Banner_Description,
            Contact_Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.Contact_Banner_Heading || !data.Contact_Banner_Description || !data.Contact_Banner_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await contactbannermodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await contactbannermodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('contactbanner');
                await uploadFile(req.files[0].buffer, req.files[0].originalname, req.files[0].mimetype)
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


exports.viewadmincontactbanner = async (req, res) => {
    try {
        let viewimages = await contactbannermodel.find();
        let imageurl = process.env.IMAGEURL
        let data = {
            viewimages,
            imageurl
        }
        return sendJson(res, 1, "All Admin Data", data, null)
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}


exports.updatecontactbanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Contact_Banner_Heading: req.body.Contact_Banner_Heading,
            Contact_Banner_Description: req.body.Contact_Banner_Description,
            Contact_Banner_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await contactbannermodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "banner not found", null, null)
        }

        if (data.Contact_Banner_Heading === '' || data.Contact_Banner_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.Contact_Banner_Image === null) {
            data.Contact_Banner_Image = oldbanner.Contact_Banner_Image
        }

        let updatedata = await contactbannermodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.Contact_Banner_Image);
                    data.Contact_Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('contactbanner');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/contact/view-contact-banner')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}






exports.viewcontactbanner = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("contactbanner");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await contactbannermodel.find();
            await client.set(
                "contactbanner",
                JSON.stringify(viewimages)
            );
        }

        return sendJson(res, 1, "All Website Data", {
            viewimages,
            imageurl: process.env.IMAGEURL,
        }, null);

    } catch (err) {
        console.log(err);
        return sendJson(res, 0, "Something went wrong", null, null);
    }
};