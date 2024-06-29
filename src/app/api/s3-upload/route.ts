import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME as string;
const region = 'ap-southeast-2'

const s3Client = new S3Client({
	region: process.env.NEXT_PUBLIC_AMAZON_REGION as string,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY as string,
		secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY as string,
	}
});


async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {

	const fileBuffer = file;
	console.log(fileName);
  const keyFileName = `${Date.now()}-${fileName}`;
	
	const params = {
		Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
		Key: keyFileName,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	return `https://${bucketName}.s3.${region}.amazonaws.com/${keyFileName}`
}

export async function POST(request: Request) {
	try {

		const formData = await request.formData();
		const files = formData.getAll("files");

		if(!files || files.length === 0) {
			return NextResponse.json( { error: "Files are required."}, { status: 400 } );
		} 

		const links = []
    const uploadPromises = files.map(async (file: any) => {
      const buffer = Buffer.from(await (file as Blob).arrayBuffer());
      return uploadFileToS3(buffer, file.name);
    });

    const uploadedFileNames = await Promise.all(uploadPromises);

		return NextResponse.json({ success: true, uploadedFileNames});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}