// url: http://localhost:3000/api/studentAccount/${id}
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    try {
        const { id } = params;
        const idNumber = await request.json();
        const updatePost = await prisma.student.update({
            where: {
                id: id
            },
            data: {
                idNumber
            }
        })

        return NextResponse.json(updatePost);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "update Error", err }, { status: 500 })
    }
}



export const GET = async (request, { params }) => {
    try {
        const { id } = params;

        const getData = await prisma.student.findMany({
            where: {
                role: "admin",
                status: "Verified Active"
            }
        });

        return NextResponse.json(getData);
    } catch (err) {
        return NextResponse.json({ message: "get Error", err }, { status: 500 });
    }
};