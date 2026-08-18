let mongoose = require("mongoose");
let { client } = require('../../../config/redisconnection');
const sendJson = require("../../../utils/sendJson");
const checklink = require("../../../utils/checkLink");
const removeImage = require("../../../utils/removeImages");
const { uploadFile, deletefile } = require("../../../utils/r2setup");
const blogsmodel = require("../../../model/admin/admin blogs/blogmodel");
const blogbannermodel = require("../../../model/admin/admin blogs/blogbannermodel");




// add blogs banner controller 


exports.addblogbanner = async (req, res) => {
    try {
        let data = {
            Blog_Banner_Heading: req.body.Blog_Banner_Heading,
            Blog_Banner_Description: req.body.Blog_Banner_Description,
            Blog_Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.Blog_Banner_Heading || !data.Blog_Banner_Description || !data.Blog_Banner_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }
        let viewlength = await blogbannermodel.find();
        if (await viewlength.length > 0) {
            return sendJson(res, 0, "Banner Already Exists", null, null)
        }
        let insertdata = await blogbannermodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('blogbanner');
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


exports.viewadminblogbanner = async (req, res) => {
    try {
        let viewimages = await blogbannermodel.find();
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


exports.updateblogbanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Blog_Banner_Heading: req.body.Blog_Banner_Heading,
            Blog_Banner_Description: req.body.Blog_Banner_Description,
            Blog_Banner_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await blogbannermodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "banner not found", null, null)
        }

        if (data.Blog_Banner_Heading === '' || data.Blog_Banner_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.Blog_Banner_Image === null) {
            data.Blog_Banner_Image = oldbanner.Blog_Banner_Image
        }

        let updatedata = await blogbannermodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.Blog_Banner_Image);
                    data.Blog_Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('blogbanner');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/blog/blog-banner/view-blog-banner')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}






exports.viewblogbanner = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("blogbanner");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await blogbannermodel.find();
            await client.set(
                "blogbanner",
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

// add blogs controller 


exports.addblogs = async (req, res) => {
    try {
        let data = {
            Blog_Main_Heading: req.body.Blog_Main_Heading,
            Blog_Description: req.body.Blog_Description,
            Blog_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
            Blog_Status: req.body.Blog_Status === 'true' ? req.body.Blog_Status : false,
        }

        console.log(data)

        if (!data.Blog_Main_Heading || !data.Blog_Description || !data.Blog_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let insertdata = await blogsmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('blogs');
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

exports.viewadminblogs = async (req, res) => {
    try {
        let viewimages = await blogsmodel.find();
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



exports.viewadminblogsfilter = async (req, res) => {
    try {

        const filter = {
            _id: req.body._id
        };
        console.log(filter)
        if (!filter._id) {
            return sendJson(res, 0, "Invalid ID");
        }

        const viewimages = await blogsmodel.findOne({
            _id: filter._id
        });

        const imageurl = process.env.IMAGEURL;

        const responseData = {
            viewimages,
            imageurl
        };

        return sendJson(
            res,
            1,
            "All Admin Data",
            responseData,
            null
        );

    } catch (err) {

        return sendJson(
            res,
            0,
            "Something went wrong",
            null,
            null
        );
    }
};

exports.updateblogs = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Blog_Main_Heading: req.body.Blog_Main_Heading,
            Blog_Description: req.body.Blog_Description,
            Blog_Image: req.files?.length ? req.files[0].filename : null,
            Blog_Status: req.body.Blog_Status === 'true' ? true : false,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await blogsmodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "Card not found", null, null)
        }

        if (data.Blog_Main_Heading === '' || data.Blog_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.Blog_Image === null) {
            data.Blog_Image = oldbanner.Blog_Image
        }

        let updatedata = await blogsmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.Blog_Image);
                    data.Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('blogs');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/blog/blogs/view-blogs')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.deleteblogs = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await blogsmodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('blogs');
            await deletefile(deletedata.Blog_Image);
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


exports.viewblogs = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("Blogs");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await blogsmodel.find({ Blog_Status: true });
            await client.set(
                "blogs",
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