const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3-credentials");

exports.putObjects = async (file, filename, contentType) => { // Accept contentType
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Body: file, // Use actual file data
            ContentType: contentType // Use correct MIME type
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        if (data.$metadata.httpStatusCode !== 200) {
            return null;
        }

        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        console.log("File uploaded successfully:", url);

        return { url, key: params.Key };
    } catch (err) {
        console.error("S3 Upload Error:", err);
        throw new Error("Failed to upload to S3");
    }
};
