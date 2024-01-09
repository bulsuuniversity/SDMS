"use client"

import Layout from "@/components/Layout";

const Page = () => {

    return (
        <Layout>
            <div className="flex w-full fixed top-12 justify-center">
                <h2 className="text-center text-xl font-serifg py-4 font-bold">MY LOGS</h2>
            </div>
            <div className="pt-20">
                <div className="my-6 border border-blue-400 border-2">
                    <div className="mx-20 text-center">No Logs Found</div>
                </div>
            </div>
        </Layout>
    );
}

export default Page;