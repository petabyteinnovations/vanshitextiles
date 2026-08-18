let mongoose = require("mongoose");
let { client } = require('../../../config/redisconnection');
const sendJson = require("../../../utils/sendJson");
const checklink = require("../../../utils/checkLink");
const removeImage = require("../../../utils/removeImages");
const { uploadFile, deletefile } = require("../../../utils/r2setup");
const aboutbannermodel = require("../../../model/admin/admin about/aboutbannermodel");
const aboutdescriptionmodel = require("../../../model/admin/admin about/aboutdescription");
const aboutourmissionmodel = require("../../../model/admin/admin about/aboutourmissionmodel");
const aboutourvisionmodel = require("../../../model/admin/admin about/aboutourvisionmodel");




// add about banner controller 


exports.addaboutbanner = async (req, res) => {
    try {
        let data = {
            About_Banner_Heading: req.body.About_Banner_Heading,
            About_Banner_Description: req.body.About_Banner_Description,
            About_Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.About_Banner_Heading || !data.About_Banner_Description || !data.About_Banner_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await aboutbannermodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await aboutbannermodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('aboutbanner');
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


exports.viewadminaboutbanner = async (req, res) => {
    try {
        let viewimages = await aboutbannermodel.find();
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


exports.updateaboutbanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Banner_Heading: req.body.About_Banner_Heading,
            About_Banner_Description: req.body.About_Banner_Description,
            About_Banner_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await aboutbannermodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "banner not found", null, null)
        }

        if (data.About_Banner_Heading === '' || data.About_Banner_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.About_Banner_Image === null) {
            data.About_Banner_Image = oldbanner.About_Banner_Image
        }

        let updatedata = await aboutbannermodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.About_Banner_Image);
                    data.About_Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('aboutbanner');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/about/about-banner/view-about-banner')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewaboutbanner = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("aboutbanner");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await aboutbannermodel.find();
            await client.set(
                "aboutbanner",
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





// add about description controller 


exports.addaboutdescriptioncontroller = async (req, res) => {
    try {
        let data = {
            About_Description_Heading: req.body.About_Description_Heading,
            About_Description: req.body.About_Description,
            About_Description_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.About_Description_Heading || !data.About_Description || !data.About_Description_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await aboutdescriptionmodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await aboutdescriptionmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('aboutdescription');
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


exports.viewadminaboutdescriptioncontroller = async (req, res) => {
    try {
        let viewimages = await aboutdescriptionmodel.find();
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


exports.updateaboutdescriptioncontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Description_Heading: req.body.About_Description_Heading,
            About_Description: req.body.About_Description,
            About_Description_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await aboutdescriptionmodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "banner not found", null, null)
        }

        if (data.About_Description_Heading === '' || data.About_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.About_Description_Image === null) {
            data.About_Description_Image = oldbanner.About_Description_Image
        }

        let updatedata = await aboutdescriptionmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.About_Description_Image);
                    data.About_Description_Image = req.files[0].originalname;
                }
            }
            await client.del('aboutdescription');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/about/about-description/view-about-description')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewaboutdescriptioncontroller = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("aboutdescription");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await aboutdescriptionmodel.find();
            await client.set(
                "aboutdescription",
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




// add about our mission controller 


exports.addaboutmisssioncontroller = async (req, res) => {
    try {
        let data = {
            About_Our_Mission_Heading: req.body.About_Our_Mission_Heading,
            About_Our_Mission_Description: req.body.About_Our_Mission_Description,
        }

        if (!data.About_Our_Mission_Heading || !data.About_Our_Mission_Description) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await aboutourmissionmodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await aboutourmissionmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('aboutourmission');
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


exports.viewadminaboutourmissioncontroller = async (req, res) => {
    try {
        let viewimages = await aboutourmissionmodel.find();
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


exports.updateaboutourmissioncontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Our_Mission_Heading: req.body.About_Our_Mission_Heading,
            About_Our_Mission_Description: req.body.About_Our_Mission_Description,
        }
        console.log(data)

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }


        if (data.About_Our_Mission_Heading === '' || data.About_Our_Mission_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }


        let updatedata = await aboutourmissionmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            await client.del('aboutourmission');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/about/about-our-mission/view-our-mission')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewaboutourmissioncontroller = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("aboutourmission");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await aboutourmissionmodel.find();
            await client.set(
                "aboutourmission",
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









// add about our vision controller 


exports.addaboutourvisioncontroller = async (req, res) => {
    try {
        let data = {
            About_Our_Vision_Heading: req.body.About_Our_Vision_Heading,
            About_Our_Vision_Description: req.body.About_Our_Vision_Description,
        }

        if (!data.About_Our_Vision_Heading || !data.About_Our_Vision_Description) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await aboutourvisionmodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await aboutourvisionmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('aboutourvision');
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


exports.viewadminaboutourvisioncontroller = async (req, res) => {
    try {
        let viewimages = await aboutourvisionmodel.find();
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


exports.updateaboutourvisioncontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Our_Vision_Heading: req.body.About_Our_Vision_Heading,
            About_Our_Vision_Description: req.body.About_Our_Vision_Description,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        if (data.About_Our_Vision_Heading === '' || data.About_Our_Vision_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        let updatedata = await aboutourvisionmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            await client.del('aboutourvision');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/about/about-our-vision/view-our-vision')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewaboutourvisioncontroller = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("aboutourvision");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await aboutourvisionmodel.find();
            await client.set(
                "aboutourvision",
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




// add counter controller 



exports.addcountercontroller = async (req, res) => {
    try {
        let data = {
            Counter_Title: req.body.Counter_Title,
            Counter_Value: req.body.Counter_Value,
            Counter_Icon: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.Counter_Title || !data.Counter_Value || !data.Counter_Icon) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await aboutdescriptionmodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await aboutdescriptionmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('aboutdescription');
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


exports.viewadminaboutdescriptioncontroller = async (req, res) => {
    try {
        let viewimages = await aboutdescriptionmodel.find();
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


exports.updateaboutdescriptioncontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Description_Heading: req.body.About_Description_Heading,
            About_Description: req.body.About_Description,
            About_Description_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await aboutdescriptionmodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "banner not found", null, null)
        }

        if (data.About_Description_Heading === '' || data.About_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.About_Description_Image === null) {
            data.About_Description_Image = oldbanner.About_Description_Image
        }

        let updatedata = await aboutdescriptionmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.About_Description_Image);
                    data.About_Description_Image = req.files[0].originalname;
                }
            }
            await client.del('aboutdescription');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/about/about-description/view-about-description')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewaboutdescriptioncontroller = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("aboutdescription");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await aboutdescriptionmodel.find();
            await client.set(
                "aboutdescription",
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
