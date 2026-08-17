import React from 'react'

const SettingNotifications = () => {
    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white shadow shadow-gray-200 p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                            <h4 className="font-IRANYekan-Bold md:text-[18px]">اعلانات مرتبط با تعامل شما با کاربران</h4>
                        </div>
                        <div className="flex items-center gap-x-6 ml-10">
                            <span className='text-[14px] font-IRANYekan-Bold'>پنل کجارو</span>
                            <span className='text-[14px] font-IRANYekan-Bold'>پنل مرورگر</span>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <svg width="12" height="12" className='' viewBox="0 0 256 256"><path d="M236,200a12,12,0,0,1-24,0,84.09,84.09,0,0,0-84-84H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,92h67A108.12,108.12,0,0,1,236,200Z"></path></svg>
                            <span className='text-[14px] font-IRANYekan-Light'>مدیریت اعلانات‌برای پاسخ‌هایی که به نظرات شما می‌دهند</span>
                        </div>
                        <div className="flex items-center gap-x-6 ml-10">
                            <input
                                type="checkbox"
                                className="appearance-none ml-4 bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                            <input
                                type="checkbox"
                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                        </div>
                    </div>
                    <span className='w-full h-px bg-gray-200 block my-4'></span>
                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <svg width="12" height="12" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>
                            <span className='text-[14px] font-IRANYekan-Light'>مدیریت اعلانات تشویق نظرات شما</span>
                        </div>
                        <div className="flex items-center gap-x-6 ml-10">
                            <input
                                type="checkbox"
                                className="appearance-none ml-4 bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                            <input
                                type="checkbox"
                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                        </div>
                    </div>
                    <span className='w-full h-px bg-gray-200 block my-4'></span>
                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <svg width="12" height="12" fill="var(--black-3)" viewBox="0 0 256 256"><path d="M128,20a108,108,0,0,0,0,216c22.27,0,45.69-6.73,62.64-18a12,12,0,1,0-13.29-20c-13,8.63-31.89,14-49.35,14a84,84,0,1,1,84-84c0,9.29-1.67,17.08-4.69,21.95-2.64,4.24-6,6.05-11.31,6.05s-8.67-1.81-11.31-6.05c-3-4.87-4.69-12.66-4.69-21.95V88a12,12,0,0,0-23.49-3.46,52,52,0,1,0,8.86,79.57C172.3,174.3,182.81,180,196,180c24.67,0,40-19.92,40-52A108.12,108.12,0,0,0,128,20Zm0,136a28,28,0,1,1,28-28A28,28,0,0,1,128,156Z"></path></svg>
                            <span className='text-[14px] font-IRANYekan-Light'>مدیریت اعلانات برای زمانی که کسی شما را در نظرات صدا می‌کند</span>
                        </div>
                        <div className="flex items-center gap-x-6 ml-10">
                            <input
                                type="checkbox"
                                className="appearance-none ml-4 bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                            <input
                                type="checkbox"
                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                            />
                        </div>
                    </div>
                    <span className='w-full h-px bg-gray-200 block my-4'></span>
                </div>
            </div>
        </>
    )
}

export default SettingNotifications;