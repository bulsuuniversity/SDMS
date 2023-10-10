import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const posts = await prisma.studentreport.findMany()
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}