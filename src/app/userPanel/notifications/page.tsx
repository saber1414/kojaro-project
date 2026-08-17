"use client"
import AdsAbove from '@/components/modules/AdsAbove/AdsAbove';
import MobileNavbar from '@/components/modules/Header/MobileNavbar';
import Navbar from '@/components/modules/Header/Navbar';
import Profile from '@/components/modules/UserPandel/Profile';
import NotificationsBox from '@/components/templates/UserPanel/Notifications/NotificationsBox';
import Link from 'next/link';
import React from 'react'

const Notifications = () => {
    return (
        <>
            <AdsAbove />
            {/* desktop navbar */}
            <div className="w-full pt-4 pb-2 sticky top-0 z-20 bg-white hidden lg:block">
                <Navbar />
            </div>
            {/* mobile navbar */}
            <div className="w-full pt-4 pb-4 sticky top-0 z-20 bg-white shadow block lg:hidden">
                <MobileNavbar />
            </div>
            <Profile
                title='اعلانات'
                description='در این صفحه می‌توانید همه اعلانات و پیام‌های خود را مشاهده کنید'
            />
            <NotificationsBox />
        </>
    )
}

export default Notifications;