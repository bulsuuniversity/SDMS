"use client"

import LogsLayout from "@/components/LogsLayout";
import { useEffect } from "react";
import {
    useReferConsultData,
    useSelfConsultData,
    useProfileData,
    useReportData
} from "@/app/libs/store";
import { PrivateRoute } from "@/components/auth";

const Page = () => {
    const { selfConsultData, getSelfConsultData } = useSelfConsultData()
    const { getReferConsultData } = useReferConsultData()
    const { reportData, getReportData } = useReportData()
    const { profileData } = useProfileData()
    useEffect(() => {
        getSelfConsultData(profileData.id)
    }, [profileData])

    useEffect(() => {
        getReferConsultData(profileData.id)
    }, [profileData])

    useEffect(() => {
        getReportData(profileData.id)
    }, [profileData])

    useEffect(() => {
        if (profileData && !profileData.id) {
            router.push('/Login')
        }
    }, [profileData])

    return (
        <PrivateRoute>
            <div>
                <LogsLayout />
            </div>
        </PrivateRoute>
    );
}

export default Page;