"use client"
import React, { useState } from 'react'

const SupplementaryInfo = () => {
    const [showProfile, setShowPrifile] = useState<boolean>(false);

    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white shadow shadow-gray-200 p-4 rounded-sm">
                    <div className="flex items-center">
                        <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                        <h4 className="font-IRANYekan-Bold md:text-[18px]">تصویر کاربری</h4>
                    </div>
                    <div className="mt-5">
                        {/* Desired image */}
                        <div className="w-219 flex items-center justify-between mb-5">
                            <span className='text-[14px] font-IRANYekan-Bold'>تصویر دلخواه</span>
                            <label className='flex items-center justify-start w-150 gap-x-4'>
                                <input type="file" name="desired-image" className='hidden' id="desired-image" />
                                <label htmlFor='desired-image'>
                                    <div className='w-12 h-12 border border-blueMenu rounded-full flex items-center justify-center cursor-pointer'>
                                        <svg className='fill-blueMenu' width="12" height="12" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path></svg>
                                    </div>
                                </label>
                                <button type="button" className='cursor-pointer'>
                                    <svg className='fill-red-400' width="16" height="16" viewBox="0 0 256 256"><path d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"></path></svg>
                                </button>
                            </label>
                        </div>
                        {/* Your exclusive image */}
                        <div className="w-219 flex items-center justify-between mb-5">
                            <span className='text-[14px] font-IRANYekan-Bold'>تصویر اختصاصی شما</span>
                            <div className="flex items-center justify-start w-150 gap-x-4">
                                <div className='w-12 h-12 border border-blueMenu rounded-full flex items-center justify-center cursor-pointer'>
                                    <img src="/images/profile04.png" alt="prfile image" className='w-10 h-10 bg-cover' />
                                </div>
                                <button type="button">
                                    <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z"></path></svg>
                                </button>
                            </div>
                        </div>
                        {/* Available options */}
                        <div className="w-219 flex items-center justify-between mb-5">
                            <span className='text-[14px] font-IRANYekan-Bold'>گزینه‌های موجود</span>
                            <div className="flex items-center justify-start w-150 gap-x-4">
                                <div className='w-12 h-12 border border-blueMenu rounded-full flex items-center justify-center cursor-pointer'>
                                    <img src="/images/profile05.png" alt="prfile image" className='w-10 h-10 bg-cover' />
                                </div>
                                <button onClick={() => setShowPrifile(prev => !prev)} type="button" className='cursor-pointer'>
                                    {
                                        showProfile ? (
                                            <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                                        ) : (
                                            <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path></svg>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                        <div className={`mt-5 ${showProfile ? "flex" : "hidden"} transition-all ease-in-out items-center justify-center gap-4 flex-wrap mb-5`}>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile01.webp" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile02.webp" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile03.webp" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile04.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile05.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile06.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile07.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile08.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile09.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile10.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile11.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile12.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile13.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile14.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile15.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center cursor-pointer">
                                <img src="/images/profile16.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile17.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile18.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile19.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile20.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile21.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile22.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile23.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile24.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile25.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile26.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile27.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile28.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile29.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile30.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile31.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile32.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile33.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile34.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile35.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile36.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile37.png" alt="profile image" className='w-10 h-10' />
                            </button>
                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile38.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile39.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile40.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile41.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile42.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile43.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile44.png" alt="profile image" className='w-10 h-10' />
                            </button>                            <button type='button' className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/profile45.png" alt="profile image" className='w-10 h-10' />
                            </button>
                        </div>
                        {/* Cover image */}
                        <div className="w-219 flex items-center justify-between">
                            <span className='text-[14px] font-IRANYekan-Bold'>تصویر کاور</span>
                            <div className="flex items-center justify-start w-150 gap-x-4">
                                <div>
                                    <img src="/images/cove01.jpg" className='w-91.25 h-18.25' alt="cover image" />
                                    <span className='text-[13px] text-gray-500'>اندازه توصیه شده : 384 × 1920</span>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <label>
                                        <input type="file" name="cover-file" id="cover-file" className='hidden' />
                                        <label htmlFor="cover-file">
                                            <div className='cursor-pointer'>
                                                <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M160,88a16,16,0,1,1,16,16A16,16,0,0,1,160,88Zm76-32V160a20,20,0,0,1-20,20H204v20a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V88A20,20,0,0,1,40,68H60V56A20,20,0,0,1,80,36H216A20,20,0,0,1,236,56ZM180,180H80a20,20,0,0,1-20-20V92H44V196H180Zm-21.66-24L124,121.66,89.66,156ZM212,60H84v67.72l25.86-25.86a20,20,0,0,1,28.28,0L192.28,156H212Z"></path></svg>
                                            </div>
                                        </label>
                                    </label>
                                    <button type="button" className='cursor-pointer'>
                                        <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Introduction */}
                    <div className="mt-10">
                        <div className="flex items-center">
                            <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                            <h4 className="font-IRANYekan-Bold md:text-[18px]">معرفی</h4>
                        </div>
                        <div className="flex mt-5 justify-between">
                            <span className='text-[14px] font-IRANYekan-bold'>درباره من</span>
                            <div className="flex gap-x-2 w-300">
                                <textarea name="" id="" className='w-91.25 h-32 border bordr-gray-200 rounded-sm pr-2npm pt-2 text-[14px]'></textarea>
                                <p className='text-[13px] text-dark2'>در ۷۰ کلمه خودتان را معرفی کنید. این متن در پروفایل شما به سایر کاربران نمایش داده می‌شود.</p>
                            </div>
                        </div>
                    </div>
                    <span className='block w-full h-px bg-gray-200 my-4'></span>
                    <button type="button" className='mt-10 mb-5 w-31 h-8 flex items-center justify-center text-[13px] bg-dark2 text-white rounded-full px-4'>
                        اعمال تغییرات
                    </button>
                </div>
            </div>
        </>
    )
}

export default SupplementaryInfo;