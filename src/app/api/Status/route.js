// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"


export const POST = async (request) => {
    try {
        const body = await request.json();
        const {
            owner,
            status,
        } = body;

        const newPost = await prisma.status.create({
            data: {
                owner,
                status,
            },
        })
        return NextResponse.json({ message: "Submited", newPost })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "POST Error", error }, { status: 500 });
    }
};


export const GET = async () => {
    try {
        const posts = await prisma.status.findMany({
        })
        return NextResponse.json(posts, {
            headers: {
                "revalidate": "0"
            }
        });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}