"use client"

import Layout from "@/components/Layout";
import Link from "next/link";

const page = () => {
    return (
        <Layout>
                        <div className="pt-7">
                    <div className="bg-orange-200 mb-24 w-full py-4 text-4xl font-bold text-center">CONSULTATION</div>
                    <div className="md:flex grid gap-6 px-16 mb-24">
                        <Link href="/Consult/Self" className="border bg-amber-100 border-amber-900 border-4 rounded-lg p-6">
                            <div className="text-4xl text-center">SELF</div>
                            <div className="whitespace-normal text-center">
                                Schedule an appointment for consultation either physically or virtually. Please don't hesitate and let us know you situation so that we can assist you.
                            </div>
                        </Link>
                        <Link href="/Consult/Refer" className="border bg-amber-100 border-amber-900 border-4 rounded-lg p-6">
                            <div className="text-4xl text-center">REFERRAL</div>
                            <div className="whitespace-normal text-center">
                                Refer someone who do you think needs help. A small action can cause a big impact and reach out to those who can't.
                            </div>
                        </Link>
                    </div>

                </div>
                  </Layout>
    );
}

export default page;