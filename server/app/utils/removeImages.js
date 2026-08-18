let fs = require('fs');
let path = require('path');
const sendJson = require('./sendJson');
let finalpath = path.join(__dirname, "../../uploads");

const removeImage = (images = []) => {
    images.forEach((image) => {
        const filepath = path.join(finalpath, image.filename);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(image)
            return true
        } else {
            return false
        }
    });
};

module.exports = removeImage