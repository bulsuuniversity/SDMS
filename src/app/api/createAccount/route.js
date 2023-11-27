import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import transporter from "@/app/libs/mailer";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    try {
        const body = await request.json();

        const dataArray = body.excelFile;

        for (const data of dataArray) {
            const { email, name, phoneNumber, idNumber, college, yearLevel } = data;

            // Check if email already exists
            const emailExists = await prisma.student.findMany({
                where: {
                    email,
                },
            });
        
            if (emailExists && emailExists.length > 0) {
                // Email already exists, skip to the next array element
                continue;
            }

            function generateRandomKey() {
                const randomKey = Math.floor(10000000 + Math.random() * 90000000);
                return randomKey.toString();
            }

            const eightDigitRandomKey = generateRandomKey();

            await transporter.sendMail({
                from: "bulsubulacanstateuniversity@gmail.com",
                to: email,
                subject: "Account in SDMS of BULSU",
                text: `Good day! This is your account credentials for SDMS of BULSU`,
                html: `<p>Good day! This is your account credentials for SDMS of BULSU. Use this email ${email} and the password is: ${eightDigitRandomKey}</p>`,
            });

            // Hash the generated password using bcrypt
            const hashedPassword = await bcrypt.hash(eightDigitRandomKey, 10);

            const newPost = await prisma.student.create({
                data: {
                    email,
                    name,
                    phoneNumber: phoneNumber.toString(),
                    idNumber,
                    college,
                    yearLevel,
                    password: hashedPassword,
                    role: "user",
                    status: "Inactive",
                },
            });
        }

        return NextResponse.json({ message: "Accounts created successfully" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "POST Error", error }, { status: 500 });
    }
};
