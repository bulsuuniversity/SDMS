// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { ids } = body
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