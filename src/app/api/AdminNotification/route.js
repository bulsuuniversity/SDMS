// url: http://localhost:3000/api/studentAccount/${id}
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    try {

        const newPost = await prisma.notification.create({
            data: {
                title: "admin",
                notif: true,
            },
        })
        return NextResponse.json({ message: "Verified", newPost })



    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "POST Error", error }, { status: 500 });
    }
};

