// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { data } = body;
        const report = await prisma.semester.create({
            data: {
                start: data.start,
                end: data.end,
                sy: data.sy,
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

        const posts = await prisma.semester.findMany({

        })
        const report = await prisma.semester.update({
            where: {
                id: posts[0].id
            },
            data: {
                start: data.start,
                end: data.end,
                sy: data.sy,
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
        const posts = await prisma.semester.findMany({

        })
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}


export const DELETE = async (request) => {
    try {
        const body = await request.json();
        const { id } = body
        const semester = await prisma.semester.findMany({})
        const deletedPost = await prisma.semester.delete({
            where: {
                id: semester.data[0].id
            }
        });
        return NextResponse.json(deletedPost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
};