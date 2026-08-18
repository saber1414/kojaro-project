"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Profile = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            {/* آواتار کاربر */}
            <div className="cursor-pointer">
                <img src="/images/profile10.png" className='w-6 h-6 rounded-full' alt="profile img" />
            </div>

            {/* منوی پروفایل */}
            <div className={`
                absolute left-0 top-10 
                w-83 bg-white rounded-sm shadow-lg shadow-gray-200 p-4 
                transition-all duration-300 origin-top-right z-50
                ${showMenu ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}
            `}>
                {/* محتوای منو */}
                <div className="flex items-center gap-x-4">
                    <img src="/images/profile02.webp" className='w-12 h-12 rounded-full' alt="profile img" />
                    <span className='font-IRANYekan-Bold text-[14px] pt-2'>saber__dev</span>
                </div>

                <div className="mt-5 border border-gray-100 rounded-sm p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-[15px] font-IRANYekan-Bold">حدود 1 ماه</h4>
                            <span className='text-[12px] text-gray-400'>عضو کجارو هستی</span>
                        </div>
                        <div>
                            <h4 className="text-[15px] font-IRANYekan-Bold">0</h4>
                            <span className='text-[12px] text-gray-400'>مطلب مطالعه کردی</span>
                        </div>
                    </div>
                    <span className='block my-4 bg-gray-200 w-full h-px'></span>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-[15px] font-IRANYekan-Bold">0</h4>
                            <span className='text-[12px] text-gray-400'>کامنت‌ گذاشتی</span>
                        </div>
                        <div>
                            <h4 className="text-[15px] font-IRANYekan-Bold">0</h4>
                            <span className='text-[12px] text-gray-400'>واکنش گرفتی</span>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Link href="/userPanel" className='flex items-center gap-x-2 mb-4 hover:text-blue-500 transition-colors'>
                        <svg width="16" height="16" viewBox="0 0 256 256"><path d="M212,76H32A12,12,0,0,0,20,88v48a100.24,100.24,0,0,0,26.73,68H32a12,12,0,0,0,0,24H208a12,12,0,0,0,0-24H193.27a100.75,100.75,0,0,0,20-32A44,44,0,0,0,256,128v-8A44.05,44.05,0,0,0,212,76Zm-16,60a76.27,76.27,0,0,1-42,68H86a76.27,76.27,0,0,1-42-68V100H196Zm36-8a20,20,0,0,1-12.57,18.55A97.17,97.17,0,0,0,220,136V101.68A20,20,0,0,1,232,120ZM68,48V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Zm40,0V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Zm40,0V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Z"></path></svg>
                        <span className='text-[13px] font-IRANYekan-Bold'>کجارو من</span>
                    </Link>
                    <Link href="/userPanel/activities" className='flex items-center gap-x-2 mb-4 hover:text-blue-500 transition-colors'>
                        <svg width="16" height="16" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H157l19.52,19.51a12,12,0,0,1-17,17l-40-40A12,12,0,0,1,128,116h56A12,12,0,0,1,196,128Z"></path></svg>
                        <span className='text-[13px] font-IRANYekan-Bold'>فعالیت‌ها</span>
                    </Link>
                    <Link href="/userPanel/settings" className='flex items-center gap-x-2 mb-4 hover:text-blue-500 transition-colors'>
                        <svg width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256"><path d="M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"></path></svg>
                        <span className='text-[13px] font-IRANYekan-Bold'>تنظیمات</span>
                    </Link>
                    <span className='block my-4 bg-gray-200 w-full h-px'></span>
                </div>

                <button type="button" className='cursor-pointer flex items-center gap-x-2 hover:text-red-500 transition-colors'>
                    <svg width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256"><path d="M116,128V48a12,12,0,0,1,24,0v80a12,12,0,0,1-24,0Zm66.55-82a12,12,0,0,0-13.1,20.1C191.41,80.37,204,103,204,128a76,76,0,0,1-152,0c0-25,12.59-47.63,34.55-61.95A12,12,0,0,0,73.45,46C44.56,64.78,28,94.69,28,128a100,100,0,0,0,200,0C228,94.69,211.44,64.78,182.55,46Z"></path></svg>
                    <span className='text-[13px] font-IRANYekan-Bold'>خروج</span>
                </button>
            </div>
        </div>
    )
}

export default Profile