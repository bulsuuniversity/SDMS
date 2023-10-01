// url: http://localhost:3000/api/studentAccount 
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from "next-auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const POST = async (request) => {
    try {
        const body = await request.json();
        const {
            reporter,
            actionOfDiscipline,
            ticketNo,
            offender,
            college,
            attachment,
            dateOfIncident,
            platformOfIncident,
            rateOfOccurrence,
            describeTheSituation,
            status,
        } = body;

        if (attachment === "empty") {
            const report = await prisma.studentreport.create({
                data: {
                    reporter: reporter,
                    actionOfDiscipline: actionOfDiscipline,
                    ticketNo: ticketNo,
                    offender: offender,
                    college: college,
                    attachment: "",
                    dateOfIncident: dateOfIncident,
                    platformOfIncident: platformOfIncident,
                    rateOfOccurence: rateOfOccurrence,
                    describeTheSituation: describeTheSituation,
                    status,
                },
            });
            return NextResponse.json({ message: "Submitted", report });
        } else {
            const uploadResponse = await cloudinary.uploader.upload(attachment, {
                upload_preset: "bulsu",
                folder: 'report'
            });
            if (uploadResponse) {
                const report = await prisma.studentreport.create({
                    data: {
                        reporter: reporter,
                        actionOfDiscipline: actionOfDiscipline,
                        ticketNo: ticketNo,
                        offender: offender,
                        college: college,
                        attachment: uploadResponse.secure_url,
                        dateOfIncident: dateOfIncident,
                        platformOfIncident: platformOfIncident,
                        rateOfOccurence: rateOfOccurrence,
                        describeTheSituation: describeTheSituation,
                        status,
                    },
                });
                return NextResponse.json({ message: "Submitted", report });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to Submit", error }, { status: 500 });
    }
};




export const GET = async () => {
    try {
        const posts = await prisma.studentreport.findMany({
            orderBy: {
                createdAt: 'desc',
            },
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
        const { ids } = body
        console.log(ids)
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