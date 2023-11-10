import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;

    const { phoneNumbers, message, ticketNo } = await req.json();

    const accessToken = {
        app_id: 'RX8KIRjBEoC7kiR88pcB8GCdXXA7Ie7o',
        app_secret: '33ecf75c0249fe0bff4ecfafb44c5f9a648c97508d9618158ea7df2052f9c6ff'
    }
    const apiUrl = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/21666240/requests';

    const payload = {
        outboundSMSMessageRequest: {
            clientCorrelator: ticketNo,
            senderAddress: '21666240',
            outboundSMSTextMessage: { message: message },
            address: phoneNumbers,
        },
    };

    try {
        const response = await axios.post(`${apiUrl}?access_token=${accessToken}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // const apiUrl = 'http://developer.globelabs.com.ph/oauth';

        // try {
        //     const response = await axios.post(`${apiUrl}?access_token=${accessToken}`, payload, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });


        return NextResponse.json({ msg: 'Successfully Sent', response, status: 200 });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return NextResponse.json({ msg: 'Failed', error, status: 500 });
    }
}


export const GET = async () => {
    try {
        const response = await axios.post(`${apiUrl}?access_token=${accessToken}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json({ msg: 'Successfull', response, status: 200 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}