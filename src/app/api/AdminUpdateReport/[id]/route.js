// url: http://localhost:3000/api/studentAccount/${id}
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    try {
        const { id } = params
        const body = await request.json();
        const { sanctions } = body;
        const updatePost = await prisma.studentreport.update({
            where: {
                id
            },
            data: {
                kindOfOffense: sanctions.kindOfOffense,
                degreeOfOffense: sanctions.degreeOfOffense,
                notes: sanctions.notes,
            }
        })

        return NextResponse.json(updatePost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "update Error", err }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        const posts = await prisma.studentreport.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 1,
        });

        return NextResponse.json(posts);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
}