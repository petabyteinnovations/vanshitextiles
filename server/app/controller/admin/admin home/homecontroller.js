let mongoose = require("mongoose");
let { client } = require('../../../config/redisconnection');
const sendJson = require("../../../utils/sendJson");
const homebannermodel = require("../../../model/admin/admin home/HomeBannerModel");
const checklink = require("../../../utils/checkLink");
const removeImage = require("../../../utils/removeImages");
const homemarqueemodel = require("../../../model/admin/admin home/HomeMarquee");
const whychoosebannermodel = require("../../../model/admin/admin home/HomeWhyChoose");
const whychoosecardmodel = require("../../../model/admin/admin home/HomeWhyChooseCard");
const { uploadFile, deletefile } = require("../../../utils/r2setup");
const manufacturingprocessmodel = require("../../../model/admin/admin home/HomeManufacturingProcess");

exports.addhomebanner = async (req, res) => {
    try {
        let data = {
            Banner_Tag: req.body.Banner_Tag,
            Banner_Main_Heading: req.body.Banner_Main_Heading,
            Banner_Description: req.body.Banner_Description,
            Banner_Primary_Btn_Text: req.body.Banner_Primary_Btn_Text,
            Banner_Primary_Btn_Link: req.body.Banner_Primary_Btn_Link,
            Banner_Secondary_Btn_Text: req.body.Banner_Secondary_Btn_Text,
            Banner_Secondary_Btn_Link: req.body.Banner_Secondary_Btn_Link,
            Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].originalname : '',
            Banner_Status: req.body.Banner_Status === 'true' ? req.body.Banner_Status : false,
        }
        if (!data.Banner_Tag || !data.Banner_Main_Heading || !data.Banner_Description || !data.Banner_Primary_Btn_Text || !data.Banner_Primary_Btn_Link || !data.Banner_Secondary_Btn_Text || !data.Banner_Secondary_Btn_Link || !data.Banner_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        if (!checklink(data.Banner_Primary_Btn_Link) || !checklink(data.Banner_Secondary_Btn_Link)) {
            return sendJson(res, 0, "Invalid Url", null, null)
        }

        let insertdata = await homebannermodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('home_hero_banner');
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

exports.viewadminhomebanner = async (req, res) => {
    try {
        let viewimages = await homebannermodel.find();
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

exports.updatehomebanner = async (req, res) => {
    try {
        console.log(req.body)
        let data = {
            _id: req.body._id,
            Banner_Tag: req.body.Banner_Tag,
            Banner_Main_Heading: req.body.Banner_Main_Heading,
            Banner_Description: req.body.Banner_Description,
            Banner_Primary_Btn_Text: req.body.Banner_Primary_Btn_Text,
            Banner_Primary_Btn_Link: req.body.Banner_Primary_Btn_Link,
            Banner_Secondary_Btn_Text: req.body.Banner_Secondary_Btn_Text,
            Banner_Secondary_Btn_Link: req.body.Banner_Secondary_Btn_Link,
            Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].originalname : '',
            Banner_Status: req.body.Banner_Status === 'true' ? true : false,
        }
        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await homebannermodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "Banner not found", null, null)
        }

        if (data.Banner_Tag === '' || data.Banner_Main_Heading === '' || data.Banner_Description === '' || data.Banner_Primary_Btn_Text === '' || data.Banner_Primary_Btn_Link === '' || data.Banner_Secondary_Btn_Text === '' || data.Banner_Secondary_Btn_Link === '' || data.Banner_Status === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (!checklink(data.Banner_Primary_Btn_Link) || !checklink(data.Banner_Secondary_Btn_Link)) {
            return sendJson(res, 0, "Invalid Url", null, null)
        }

        if (!data.Banner_Image) {
            data.Banner_Image = oldbanner.Banner_Image
        }

        let updatedata = await homebannermodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {

                    await deletefile(
                        updatedata.Banner_Image
                    );

                    data.Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('home_hero_banner');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/home/hero/view-hero-banner');
        }
        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.deletehomebanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await homebannermodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('home_hero_banner');
            await deletefile(
                deletedata.Banner_Image
            );
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

exports.viewhomebanner = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("home_hero_banner");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await homebannermodel.find({ Banner_Status: true });

            await client.set(
                "home_hero_banner",
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




// home marquee controller 

exports.addhomemarquee = async (req, res) => {
    try {
        let data = {
            Marquee_Text: req.body.Marquee_Text,
            Marquee_Status: req.body.Marquee_Status === 'true' ? req.body.Marquee_Status : false,
        }

        if (!data.Marquee_Text) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let insertdata = await homemarqueemodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('home_marquee');
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

exports.viewadminhomemarquee = async (req, res) => {
    try {
        let viewmarquees = await homemarqueemodel.find();
        let data = {
            viewmarquees
        }
        return sendJson(res, 1, "All Admin Data", data, null)
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}


exports.updatehomemarquee = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Marquee_Text: req.body.Marquee_Text,
            Marquee_Status: req.body.Marquee_Status === 'true' ? req.body.Marquee_Status : false,
        }
        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        if (data.Marquee_Text === '' || data.Marquee_Status === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        let updatedata = await homemarqueemodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            await client.del('home_marquee');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/home/marquee/view-marquee');
        }
        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}


exports.deletehomemarquee = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await homemarqueemodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('home_marquee');
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


exports.viewhomemarquee = async (req, res) => {
    try {
        let viewmarquees;

        const cache = await client.get("home_marquee");

        if (cache) {
            viewmarquees = JSON.parse(cache);
        } else {
            viewmarquees = await homemarqueemodel.find({ Marquee_Status: true });

            await client.set(
                "home_marquee",
                JSON.stringify(viewmarquees)
            );
        }

        return sendJson(res, 1, "All Website Data", {
            viewmarquees,
        }, null);

    } catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null);
    }
};



// why choose banner controller 


exports.addwhychoosebanner = async (req, res) => {
    try {
        let data = {
            Why_Banner_Tag: req.body.Why_Banner_Tag,
            Why_Banner_Main_Heading: req.body.Why_Banner_Main_Heading,
            Why_Banner_Primary_Btn_Text: req.body.Why_Banner_Primary_Btn_Text,
            Why_Banner_Primary_Btn_Link: req.body.Why_Banner_Primary_Btn_Link,
            Why_Banner_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
        }

        if (!data.Why_Banner_Tag || !data.Why_Banner_Main_Heading || !data.Why_Banner_Primary_Btn_Text || !data.Why_Banner_Primary_Btn_Link || !data.Why_Banner_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let viewdata = await whychoosebannermodel.find();
        if (viewdata.length > 0) {
            return sendJson(res, 0, "Data Already Exists", null, null)
        }

        if (!checklink(data.Why_Banner_Primary_Btn_Link)) {
            return sendJson(res, 0, "Invalid Url", null, null)
        }

        let insertdata = await whychoosebannermodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('why_choose_banner');
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

exports.viewadminwhychoosebanner = async (req, res) => {
    try {
        let viewimages = await whychoosebannermodel.find();
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

exports.updatewhychoosebanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Why_Banner_Tag: req.body.Why_Banner_Tag,
            Why_Banner_Main_Heading: req.body.Why_Banner_Main_Heading,
            Why_Banner_Primary_Btn_Text: req.body.Why_Banner_Primary_Btn_Text,
            Why_Banner_Primary_Btn_Link: req.body.Why_Banner_Primary_Btn_Link,
            Why_Banner_Image: req.files?.length ? req.files[0].filename : null,
        }

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await whychoosebannermodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "Banner not found", null, null)
        }

        if (data.Why_Banner_Tag === '' || data.Why_Banner_Main_Heading === '' || data.Why_Banner_Primary_Btn_Text === '' || data.Why_Banner_Primary_Btn_Link === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (!checklink(data.Why_Banner_Primary_Btn_Link)) {
            return sendJson(res, 0, "Invalid Url", null, null)
        }

        if (!data.Why_Banner_Image) {
            data.Why_Banner_Image = oldbanner.Why_Banner_Image
        }

        let updatedata = await whychoosebannermodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {

                    await deletefile(
                        updatedata.Why_Banner_Image
                    );

                    data.Why_Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('why_choose_banner');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/home/why-choose/why-choose-banner/view-why-choose-banner');
        }
        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.viewwhychoosebanner = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("why_choose_banner");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await whychoosebannermodel.find();

            await client.set(
                "why_choose_banner",
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


// why choose card controller 


exports.addwhychoosecards = async (req, res) => {
    try {
        let data = {
            Why_Choose_Card_Main_Heading: req.body.Why_Choose_Card_Main_Heading,
            Why_Choose_Card_Description: req.body.Why_Choose_Card_Description,
            Why_Choose_Card_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
            Why_Choose_Card_Status: req.body.Why_Choose_Card_Status === 'true' ? req.body.Why_Choose_Card_Status : false,
        }

        if (!data.Why_Choose_Card_Main_Heading || !data.Why_Choose_Card_Description || !data.Why_Choose_Card_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let insertdata = await whychoosecardmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('why_choose_cards');
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

exports.viewadminwhychoosecards = async (req, res) => {
    try {
        let viewimages = await whychoosecardmodel.find();
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

exports.updatewhychoosecards = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Why_Choose_Card_Main_Heading: req.body.Why_Choose_Card_Main_Heading,
            Why_Choose_Card_Description: req.body.Why_Choose_Card_Description,
            Why_Choose_Card_Image: req.files?.length ? req.files[0].filename : null,
            Why_Choose_Card_Status: req.body.Why_Choose_Card_Status === 'true' ? true : false,
        }
        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await whychoosecardmodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "Card not found", null, null)
        }

        if (data.Why_Choose_Card_Main_Heading === '' || data.Why_Choose_Card_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.Why_Choose_Card_Image === null) {
            data.Why_Choose_Card_Image = oldbanner.Why_Choose_Card_Image
        }

        let updatedata = await whychoosecardmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.Why_Choose_Card_Image);
                    data.Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('why_choose_cards');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/home/why-choose/why-choose-card/view-why-choose-cards')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}

exports.deletewhychoosecards = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await whychoosecardmodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('why_choose_cards');
            await deletefile(deletedata.Why_Choose_Card_Image);
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


exports.viewwhychoosecards = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("why_choose_cards");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await whychoosecardmodel.find({ Why_Choose_Card_Status: true });
            await client.set(
                "why_choose_cards",
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





// manufacturing process controller 


exports.addmanufacturingprocesscards = async (req, res) => {
    try {
        let data = {
            Manufacturing_Process_Main_Heading: req.body.Manufacturing_Process_Main_Heading,
            Manufacturing_Process_Description: req.body.Manufacturing_Process_Description,
            Manufacturing_Process_Image: req.files[0] !== undefined && req.files?.length !== 0 ? req.files[0].filename : '',
            Manufacturing_Process_Status: req.body.Manufacturing_Process_Status === 'true' ? req.body.Manufacturing_Process_Status : false,
        }

        if (!data.Manufacturing_Process_Main_Heading || !data.Manufacturing_Process_Description || !data.Manufacturing_Process_Image) {
            return sendJson(res, 0, "All Fields Required", null, null)
        }

        let insertdata = await manufacturingprocessmodel(data);
        insertdata.save()
            .then(async () => {
                await client.del('manufacturing_process');
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

exports.viewadminmanufacturingprocesscards = async (req, res) => {
    try {
        let viewimages = await manufacturingprocessmodel.find();
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

exports.updatemanufacturingprocesscards = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Manufacturing_Process_Main_Heading: req.body.Manufacturing_Process_Main_Heading,
            Manufacturing_Process_Description: req.body.Manufacturing_Process_Description,
            Manufacturing_Process_Image: req.files?.length ? req.files[0].filename : null,
            Manufacturing_Process_Status: req.body.Manufacturing_Process_Status === 'true' ? true : false,
        }
        console.log(data)

        if (data._id === '') {
            return sendJson(res, 0, "Invalid Request", null, null)
        }

        let oldbanner = await manufacturingprocessmodel.findOne({ _id: data._id })

        if (oldbanner === null) {
            return sendJson(res, 0, "Card not found", null, null)
        }

        if (data.Manufacturing_Process_Main_Heading === '' || data.Manufacturing_Process_Description === '') {
            return sendJson(res, 0, "All Inputs Required", null, null)
        }

        if (data.Manufacturing_Process_Image === null) {
            data.Manufacturing_Process_Image = oldbanner.Manufacturing_Process_Image
        }

        let updatedata = await manufacturingprocessmodel.findOneAndUpdate({ _id: data._id }, data);
        if (updatedata !== null) {
            if (req.files && req.files[0] !== undefined && req.files.length !== 0) {
                const uploadSuccess = await uploadFile(
                    req.files[0].buffer,
                    req.files[0].originalname,
                    req.files[0].mimetype
                );

                if (uploadSuccess) {
                    await deletefile(updatedata.Manufacturing_Process_Image);
                    data.Banner_Image = req.files[0].originalname;
                }
            }
            await client.del('manufacturing_process');
            return sendJson(res, 1, "Data Updated Successfully", null, '/pages/admin/home/manufacturing-process/view-manufacturing-cards')
        }

        else {
            return sendJson(res, 0, "Data doesn't updated", null, null)
        }
    }
    catch (err) {
        return sendJson(res, 0, "Something went wrong", null, null)
    }
}



exports.deletemanufacturingprocesscards = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await manufacturingprocessmodel.findOneAndDelete({ _id: data._id });
        if (deletedata !== null) {
            await client.del('manufacturing_process');
            await deletefile(deletedata.Manufacturing_Process_Image);
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


exports.viewmanufacturingprocesscards = async (req, res) => {
    try {
        let viewimages;

        const cache = await client.get("manufacturing_process");

        if (cache) {
            viewimages = JSON.parse(cache);
        } else {
            viewimages = await manufacturingprocessmodel.find({ Manufacturing_Process_Status: true });
            console.log(viewimages)
            await client.set(
                "manufacturing_process",
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