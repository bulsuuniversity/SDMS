import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const post = await prisma.colleges.findUnique({
            where: {
                id
            }
        });
        return NextResponse.json(post);
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { message: "GET Error" },
            { status: 500 }
        );
    }
};


export const PUT = async (request, { params }) => {
    try {
        const { id } = params
        const body = await request.json();
        const { name, acronym } = body;
        const updatePost = await prisma.colleges.update({
            where: {
                id
            },
            data: {
                name,
                acronym
            }
        })

        return NextResponse.json(updatePost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "update Error", err }, { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;

        await prisma.colleges.delete({
            where: {
                id
            }
        });

        return NextResponse.json("Post has been deleted");
    } catch (err) {
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
};
