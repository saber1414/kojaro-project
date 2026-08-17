"use client"
import React, { useState } from 'react'
import SettingNotifications from './SettingNotifications/SettingNotifications'
import SupplementaryInfo from './SupplementaryInfo/SupplementaryInfo'
import UserInfo from './UserInfo/UserInfo'
import ChangePassword from './UserInfo/ChangePassword'

const SettingsBox = () => {
    const [tab, setTab] = useState<string>("userInfo");

    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="flex items-center justify-center gap-x-4">
                    <button
                        type='button'
                        onClick={() => setTab("setting-notifications")}
                        className={`px-2 h-8 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center gap-x-2 ${tab === "setting-notifications" && "bg-dark2 text-white"}`}>
                        <svg className='fill-blueMenu' width="16" height="16" viewBox="0 0 256 256"><path d="M225.29,165.93C216.61,151,212,129.57,212,104a84,84,0,0,0-168,0c0,25.58-4.59,47-13.27,61.93A20.08,20.08,0,0,0,30.66,186,19.77,19.77,0,0,0,48,196H84.18a44,44,0,0,0,87.64,0H208a19.77,19.77,0,0,0,17.31-10A20.08,20.08,0,0,0,225.29,165.93ZM128,212a20,20,0,0,1-19.6-16h39.2A20,20,0,0,1,128,212ZM54.66,172C63.51,154,68,131.14,68,104a60,60,0,0,1,120,0c0,27.13,4.48,50,13.33,68Z"></path></svg>
                        <span className='text-[13px]'>تنظیمات اعلانیه‌ها</span>
                    </button>
                    <button
                        type='button'
                        onClick={() => setTab("supplementaryInfo")}
                        className={`px-2 h-8 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center gap-x-2 ${tab === "supplementaryInfo" && "bg-dark2 text-white"}`}>
                        <svg className='fill-blueMenu' width="16" height="16" viewBox="0 0 256 256"><path d="M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
                        <span className='text-[13px]'>اطلاعات تکمیلی</span>
                    </button>
                    <button
                        onClick={() => setTab("userInfo")}
                        className={`px-2 h-8 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center gap-x-2 ${tab === "userInfo" && "bg-dark2 text-white"}`}>
                        <svg className='fill-blueMenu' width="16" height="16" fill="var(--info)" viewBox="0 0 256 256"><path d="M152.5,156.54a72,72,0,1,0-89,0,124,124,0,0,0-48.69,35.74,12,12,0,0,0,18.38,15.44C46.88,191.42,71,172,108,172s61.12,19.42,74.81,35.72a12,12,0,1,0,18.38-15.44A123.89,123.89,0,0,0,152.5,156.54ZM60,100a48,48,0,1,1,48,48A48.05,48.05,0,0,1,60,100Zm192.49,36.49-32,32a12,12,0,0,1-17,0l-16-16a12,12,0,0,1,17-17L212,143l23.51-23.52a12,12,0,1,1,17,17Z"></path></svg>
                        <span className='text-[13px]'>اطلاعات کاربری</span>
                    </button>
                    <button
                        onClick={() => setTab("password")}
                        className={`px-2 h-8 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center gap-x-2 ${tab === "password" && "bg-dark2 text-white"}`}>
                        <svg className="fill-blueMenu" width="16" height="16" viewBox="0 0 256 256"><path d="M196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Zm48,22.74A84.3,84.3,0,0,1,160.11,180H160a83.52,83.52,0,0,1-23.65-3.38l-7.86,7.87A12,12,0,0,1,120,188H108v12a12,12,0,0,1-12,12H84v12a12,12,0,0,1-12,12H40a20,20,0,0,1-20-20V187.31a19.86,19.86,0,0,1,5.86-14.14l53.52-53.52A84,84,0,1,1,244,98.74ZM202.43,53.57A59.48,59.48,0,0,0,158,36c-32,1-58,27.89-58,59.89a59.69,59.69,0,0,0,4.2,22.19,12,12,0,0,1-2.55,13.21L44,189v23H60V200a12,12,0,0,1,12-12H84V176a12,12,0,0,1,12-12h19l9.65-9.65a12,12,0,0,1,13.22-2.55A59.58,59.58,0,0,0,160,156h.08c32,0,58.87-26.07,59.89-58A59.55,59.55,0,0,0,202.43,53.57Z"></path></svg>
                        <span className='text-[13px]'>تغییر گذرواژه</span>
                    </button>
                </div>
            </div>
            {
                tab === "setting-notifications" && (
                    <SettingNotifications />
                ) ||
                tab === "supplementaryInfo" && (
                    <SupplementaryInfo />
                ) ||
                tab === "userInfo" && (
                    <UserInfo />
                ) ||
                tab === "password" && (
                    <ChangePassword />
                )
            }
        </>
    )
}

export default SettingsBox;