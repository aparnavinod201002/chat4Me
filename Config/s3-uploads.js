const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3-credentials");

exports.uploadToS3 = async (file) => {
    const fileName = `profile-images/${Date.now()}-${file.originalname}`;
    
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer, // Buffer from multer
        ContentType: file.mimetype
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        return { url, key: fileName };
    } catch (err) {
        console.error("S3 Upload Error:", err);
        throw new Error("Failed to upload to S3");
    }
};
