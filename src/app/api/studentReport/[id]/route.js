// url: http://localhost:3000/api/studentReport/${id}
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const post = await prisma.studentreport.findMany({
            include: {
                "reporter.id": id
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
        const updatePost = await prisma.studentreport.update({
            where: {
                id
            },
            data: {
                status: 'Cleared',
            }
        })
        return NextResponse.json(updatePost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "update Error", err }, { status: 500 })
    }
}

export const DELETE = async (request, { body }) => {
    try {
        const { ids } = body;

        const deletedPost = await Promise.all(ids.map(async (id) => {
            await prisma.studentreport.delete({
                where: {
                    id
                }
            });
        }));

        return NextResponse.json(deletedPost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
};

