require('dotenv').config();
let { S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,

} = require("@aws-sdk/client-s3")

const s3 = new S3Client({
    region: "auto", // Required by AWS SDK, not used by R2
    // Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
    endpoint: process.env.CLOUDFLAREENDPOINT,
    credentials: {
        // Provide your R2 Access Key ID and Secret Access Key
        accessKeyId: process.env.CLOUDFLAREACCESSID,
        secretAccessKey: process.env.CLOUDFLARESECRETACCESS,
    },
});

const uploadFile = async (filebuffer, key, mimetype) => {
    try {
        await s3.send(new PutObjectCommand({
            Bucket: process.env.CLOUDFLAREBUCKETNAME,
            Key: key,
            Body: filebuffer,
            ContentType: mimetype,
        }))
        console.log(`Uploaded file to ${key}`)
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}


// ===============================
// Delete File
// ===============================

const deletefile = async (key) => {

    try {

        if (!key) {
            return false;
        }

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.CLOUDFLAREBUCKETNAME,
                Key: key,
            })
        );

        console.log(`Deleted file: ${key}`);

        return true;

    } catch (error) {

        console.error("R2 Delete Error:", error);

        return false;
    }
};


module.exports = {
    uploadFile,
    deletefile
};