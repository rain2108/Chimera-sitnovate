// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   const formData = await request.formData()
//   const file = formData.get("file") as File

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
//   }

//   try {
//     // TODO: Implement AWS S3 upload
//     // const originalUrl = await uploadToS3(file);

//     // TODO: Trigger AWS Lambda function for image resizing
//     // const resizedUrl = await triggerLambdaImageResize(originalUrl);

//     // TODO: Save image information to database
//     // await saveImageToDatabase({
//     //   id: generateUniqueId(),
//     //   name: file.name,
//     //   originalUrl,
//     //   resizedUrl,
//     // });

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error processing upload:", error)
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 })
//   }
// }


//-----------------------------------------------------------------------------------------------------------------------------------------------------



import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { saveImageToDatabase, getImages } from "@/lib/images";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileKey = `uploads/${uuidv4()}-${file.name}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: file.type,
      })
    );

    await saveImageToDatabase({
      originalUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
      resizedUrl: null,
    });

    return NextResponse.json({ success: true, message: "File uploaded successfully" });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: errMsg }, { status: 500 });
  }
  
  
}