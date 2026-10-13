"use client"
import React, { useState } from 'react'
import EditProfile from './editProfile';
import Preferences from './preferences';
import SecurityProfile from './securityProfile';

type TabProps = "edit-profile" | "securitr" | "preferences"

const ProfileMe = () => {
    const [tab, setTab] = useState<TabProps>("edit-profile");

    return (
        <>
            <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-x-8">
                    <button
                        type="button"
                        onClick={() => setTab("edit-profile")}
                        className={`cursor-pointer ${tab === "edit-profile" ? "text-blueMenu" : "text-gray-icon"} text-[14px] relative`}>
                        <span>ویرایش پروفایل</span>
                        {tab === "edit-profile" && <span className='w-full h-px block absolute bg-blueMenu top-9'></span>}
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab("preferences")}
                        className={`cursor-pointer ${tab === "preferences" ? "text-blueMenu" : "text-gray-icon"} text-[14px] relative`}>
                        تنظیمات
                        {tab === "preferences" && <span className='w-full h-px block absolute bg-blueMenu top-9'></span>}
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab("securitr")}
                        className={`cursor-pointer ${tab === "securitr" ? "text-blueMenu" : "text-gray-icon"} text-[14px] relative`}>
                        امنیت
                        {tab === "securitr" && <span className='w-full h-px block absolute bg-blueMenu top-9'></span>}
                    </button>
                </div>
                <span className='block w-full h-px bg-gray-100 mt-4'></span>
                {
                    tab === "edit-profile" && (
                        <EditProfile />
                    ) || tab === "preferences" && (
                        <Preferences />
                    ) || tab === "securitr" && (
                        <SecurityProfile />
                    )
                }
            </div>
        </>
    )
}

export default ProfileMe;