import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import FormData from 'form-data';
import AWS from 'aws-sdk';


const bucketName = process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME as string
const region = process.env.NEXT_PUBLIC_AMAZON_REGION as string;
const accessKeyId = process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY as string;
const secretAccessKey = process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

export const uploadToS3 = async (fileData: any, fileName: any) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData
};

  return s3.upload(params).promise();
};
