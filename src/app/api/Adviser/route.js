// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { data } = body;
        const report = await prisma.adviser.create({
            data: {
                name: data.name,
                email: data.email,
                section: data.section
            },
        });
        return NextResponse.json({ message: "Created", report });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to Submit", error }, { status: 500 });
    }
};


export const PUT = async (request) => {
    try {
        const body = await request.json();
        const { data } = body;

        const report = await prisma.adviser.update({
            data: {
                name: data.name,
                email: data.email,
                section: data.section
            },
        });
        return NextResponse.json({ message: "Created", report });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to Submit", error }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const posts = await prisma.adviser.findMany({

        })
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}


