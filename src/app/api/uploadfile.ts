import fs from "fs";
import { IncomingForm } from "formidable";
import mime from "mime-types";
import { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
const bucketName = process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME;

export const routeSegmentConfig = {
    api: {
      bodyParser: false,
    },
  };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     const form = new IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error parsing form data' });
//         }

//         const client = new S3Client({
//             region: 'ap-southeast-2',
//             credentials: {
//                 accessKeyId: process.env.S3_ACCESS_KEY as string,
//                 secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
//             }
//         });

//         const links = [];
//         for (const file of Object.values<any>(files)) {
//             const ext = mime.extension(file.type);
//             if (!ext) {
//                 return res.status(400).json({ error: 'Invalid file type' });
//             }
//             const newFilename = Date.now() + '.' + ext;

//             await client.send(new PutObjectCommand({
//                 Bucket: bucketName,
//                 Key: newFilename,
//                 Body: fs.createReadStream(file.path),
//                 ACL: 'public-read',
//                 ContentType: file.type,
//             }));

//             const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
//             links.push(link);
//         }

//         return res.json({ links });
//     });
// }

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = new multiparty.Form();
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    console.log("length: ", files.file);
  
    const client = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
    });
  
    const links = [];
    for (const file of files.file) {
      const ext = file.originalFilename.split(".").pop();
      const newFilename = Date.now() + "." + ext;
      console.log("ext:", ext);
  
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path) as any,
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }
    return res.json('success');
  }
}
