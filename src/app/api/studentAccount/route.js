// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from "next-auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const POST = async (request) => {
    try {

        const body = await request.json();
        const { email, idNumber, phoneNumber, credentials, password, role } = body;

        const saltRounds = 10

        if (!credentials) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newPost = await prisma.student.create({
                data: {
                    email: email,
                    phoneNumber: phoneNumber,
                    idNumber: idNumber,
                    credentials: "N/A",
                    password: hashedPassword,
                    role: role,
                    status: "Unregistered"
                },
            })
            return NextResponse.json({ message: "Registered", newPost })
        } else {
            const uploadResponse = await cloudinary.uploader.upload(credentials, {
                upload_preset: "bulsu",
                folder: 'credentials'
            });
            if (uploadResponse.secure_url) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newPost = await prisma.student.create({
                    data: {
                        email: email,
                        phoneNumber: phoneNumber,
                        idNumber: idNumber,
                        credentials: uploadResponse.secure_url,
                        password: hashedPassword,
                        role: role
                    },
                })
                return NextResponse.json({ message: "Registered", newPost })
            }
        }



    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "POST Error", error }, { status: 500 });
    }
};




export const GET = async () => {
    try {
        const posts = await prisma.student.findMany({
            where: {
                role: "user"
            }
        })
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}