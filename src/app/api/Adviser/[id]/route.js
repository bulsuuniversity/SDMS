import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const updatePost = await prisma.adviser.findMany({
            where: {
                id
            },
        })
        return NextResponse.json(updatePost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "update Error", err }, { status: 500 })
    }
}

export const PUT = async (request, { params }) => {
    try {
        const { id } = params;
        const body = await request.json();
        const { data } = body;

        const updatePost = await prisma.adviser.update({
            where: {
                id
            },
            data: {
                name: data.name,
                email: data.email,
                section: data.section
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
        const deletedPost = await prisma.adviser.delete({
            where: {
                id
            }
        });
        return NextResponse.json(deletedPost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
};