// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})



export const POST = async (request) => {
    try {

        const body = await request.json();
        const { name, email, phoneNumber, credentials, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadResponse = await cloudinary.uploader.upload(credentials, {
            upload_preset: "bulsu",
            folder: 'credentials'
        });
        if (uploadResponse.secure_url) {
            console.log('name:', name, 'email:', email, 'phone:', phoneNumber, uploadResponse.secure_url, 'password:', password)
            const newPost = await prisma.studentuser.create({
                data: {
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    credentials: uploadResponse.secure_url,
                    password: hashedPassword
                }
            });
            console.log(newPost)
            return NextResponse.json({ message: "POST Success", newPost });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "POST Error", error }, { status: 500 });
    }
};


export const GET = async () => {
    try {

        const posts = await prisma.studentuser.findMany()

        return NextResponse.json(posts);

    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}