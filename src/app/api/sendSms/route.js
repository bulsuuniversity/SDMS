import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const { phoneNumbers, message } = await req.json();

    try {
        const client = twilio(accountSid, authToken);

        const messages = [];

        // Iterate over phone numbers and send messages
        for (const phoneNumber of phoneNumbers) {
            const response = await client.messages.create({
                body: message,
                from: '+18149759857',
                to: '+63' + phoneNumber,
            });

            messages.push(response.sid);
        }

        return NextResponse.json({ msg: 'Successfully Sent', messages, status: 200 });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return NextResponse.json({ msg: 'Failed', error, status: 500 });
    }
}
