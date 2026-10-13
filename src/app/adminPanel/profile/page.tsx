import Aside from '@/components/modules/AdminPanel/Aside/Aside'
import Header from '@/components/modules/AdminPanel/Header/Header'
import ProfileMe from '@/components/templates/AdminPanel/profile/profile'
import React from 'react'

const Profile = () => {
    return (
        <div className='grid grid-cols-[0%_100%] lg:grid-cols-[20%_80%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] grid-rows-[100px_1fr] h-screen w-full grid-template'>
            <Header />
            <Aside />
            <div className="main">
                <ProfileMe />
            </div>
        </div>
    )
}

export default Profile