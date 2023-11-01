import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const { phoneNumber, message } = await req.json()

    try {
        const client = twilio(accountSid, authToken);

        const reponse = await client.messages.create({
            body: message,
            from: '+15313314261',
            to: '+63' + phoneNumber
        });

        const messageSent = reponse.sid

        return NextResponse.json({ msg: "Successfuly Sent ", messageSent, status: 200 })
    } catch (error) {
        console.error('Error sending SMS:', error);
        return NextResponse.json({ msg: "Failed", error, status: 500 })
    }
}
