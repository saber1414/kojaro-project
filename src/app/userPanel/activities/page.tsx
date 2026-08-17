import AdsAbove from '@/components/modules/AdsAbove/AdsAbove';
import MobileNavbar from '@/components/modules/Header/MobileNavbar';
import Navbar from '@/components/modules/Header/Navbar';
import Profile from '@/components/modules/UserPandel/Profile';
import ActivitiesBox from '@/components/templates/UserPanel/Activities/ActivitiesBox';
import React from 'react'

const Activities = () => {
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
        title='فعالیت‌ها'
        description='در این صفحه می توانید تمامی فعالیت های خود را مشاهده کنید'
      />
      <ActivitiesBox />
    </>
  )
}

export default Activities;