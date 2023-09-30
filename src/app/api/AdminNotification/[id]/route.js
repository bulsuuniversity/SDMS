import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    try {
        const { id } = params
        const body = await request.json();
        const { title, notif } = body;
        const updatePost = await prisma.notification.update({
            where: {
                id
            },
            data: {
                title,
                notif,
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
        const posts = await prisma.notification.findMany();
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
}