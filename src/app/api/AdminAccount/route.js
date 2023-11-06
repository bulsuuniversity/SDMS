
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
      const posts = await prisma.student.findMany({
        where: {
          role: "admin"
        }
      })
  
      return NextResponse.json(posts, {
        headers: {
          "revalidate": "0" 
        }
      });
    } catch (err) {
      console.log(err)
      return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
  }
  