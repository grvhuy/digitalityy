import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

	const params = {
		Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
		Key: `${fileName}-${new Date().getTime()}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	return fileName;
}

export async function POST(request: Request) {
	try {

		const formData = await request.formData();
		const file = formData.get("file");

		if(!file) {
			return NextResponse.json( { error: "File is required."}, { status: 400 } );
		} 

    const buffer = Buffer.from(await (file as Blob).arrayBuffer());
    const fileName = await uploadFileToS3(buffer, (file as File).name);

		return NextResponse.json({ success: true, fileName});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}