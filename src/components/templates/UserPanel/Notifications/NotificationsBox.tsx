"use client"
import Link from 'next/link'
import { useState } from 'react'

const NotificationsBox = () => {
    const [tab, setTab] = useState<string>("all-notifications");

    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white p-4 w-full rounded-sm shadow shadow-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <button onClick={() => setTab("all-notifications")} type="button" className={`cursor-pointer px-2 h-7 rounded-full border border-gray-200 flex items-center justify-center gap-x-2 ${tab === "all-notifications" && "bg-dark2 text-white"}`}>
                                <svg width="16" height="16" className={`${tab === "all-notifications" ? "fill-white" : "fill-black"}`} viewBox="0 0 256 256"><path d="M76,92A16,16,0,1,1,60,76,16,16,0,0,1,76,92Zm52-16a16,16,0,1,0,16,16A16,16,0,0,0,128,76Zm68,32a16,16,0,1,0-16-16A16,16,0,0,0,196,108ZM60,148a16,16,0,1,0,16,16A16,16,0,0,0,60,148Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,128,148Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,196,148Z"></path></svg>
                                <span className='text-[13px]'>تمامی اعلانات</span>
                            </button>
                            <button onClick={() => setTab("user-notifications")} type="button" className={`cursor-pointer px-2 h-7 rounded-full border border-gray-200 flex items-center justify-center gap-x-2 ${tab === "user-notifications" && "bg-dark2 text-white"}`}>
                                <svg width="16" height="16" fill="#4B87B3" viewBox="0 0 256 256"><path d="M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z"></path></svg>
                                <span className='text-[13px]'>اعلانات تعامل کاربران با شما</span>
                            </button>
                            <button onClick={() => setTab("kojaro-notificaitons")} type="button" className={`cursor-pointer px-2 h-7 rounded-full border border-gray-200 flex items-center justify-center gap-x-2 ${tab === "kojaro-notificaitons" && "bg-dark2 text-white"}`}>
                                <svg width="16" height="16" viewBox="0 0 12 12" fill="#9696a0"><defs><path id="w3u63sr1ta" d="M0 0h12v12H0z"></path></defs><g fill="none" fillRule="evenodd"><mask id="bktqivlugb" fill="#fff"></mask><path d="M5.788 5.25 3.197 8.19H9.73a.09.09 0 0 0 .019.003L8.381 9.75H0l2.437-2.779 1.51-1.721h1.841zm6.212-3L9.563 5.029 8.053 6.75H6.212l2.591-2.94H2.27a.091.091 0 0 0-.019-.003L3.619 2.25H12z" fill="#E4002B"></path></g></svg>
                                <span className='text-[13px]'>اعلانات کجارو به شما</span>
                            </button>
                        </div>
                        <Link href="#" className='flex items-center gap-x-2'>
                            <svg width="16" height="16" viewBox="0 0 256 256"><path d="M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"></path></svg>
                            <span className='text-[14px]'>تنظیمات اعلانات</span>
                        </Link>
                    </div>
                    <span className='my-4 block h-px w-full bg-gray-200'></span>
                    {
                        tab === "all-notifications" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-IRANYekan-Bold text-[14px] mb-4">فهرست تمامی اعلانات شما در ۳۰ روز گذشته</p>
                                        <div className='flex items-center gap-x-2'>
                                            <svg className='fill-blueMenu' width="16" height="16" fill="var(--primary-1)" viewBox="0 0 256 256"><path d="M234.29,47.91A20,20,0,0,0,216,36H40A20,20,0,0,0,25.2,69.45l.12.14L92,140.75V216a20,20,0,0,0,31.1,16.64l32-21.33A20,20,0,0,0,164,194.66V140.75l66.67-71.16.12-.14A20,20,0,0,0,234.29,47.91Zm-91,79.89A12,12,0,0,0,140,136v56.52l-24,16V136a12,12,0,0,0-3.25-8.2L49.23,60H206.77Z"></path></svg>
                                            <span className='text-blueMenu text-[14px]'>همه را خوانده‌ام</span>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                type="checkbox"
                                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                                            />
                                            <span className="text-[14px] text-gray-700 font-IRANYekan-Light cursor-pointer select-none">
                                                فقط خوانده نشده‌ها
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className='my-4 block h-px w-full bg-gray-200'></span>
                                <div>
                                    <p className="font-IRANYekan-Bold text-[14px] mb-2">اعلانیه ای موجود نیست !</p>
                                    <span className='text-gray-500 text-[13px]'>اطلاعیه‌ها تا سی روز ذخیره و بعد از آن به‌صورت خودکار حذف می‌شوند</span>
                                </div>
                            </>
                        ) ||
                        tab === "user-notifications" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-IRANYekan-Bold text-[14px] mb-4">فهرست تمامی اعلانات شما در ۳۰ روز گذشته</p>
                                        <div className='flex items-center gap-x-2'>
                                            <svg className='fill-blueMenu' width="16" height="16" fill="var(--primary-1)" viewBox="0 0 256 256"><path d="M234.29,47.91A20,20,0,0,0,216,36H40A20,20,0,0,0,25.2,69.45l.12.14L92,140.75V216a20,20,0,0,0,31.1,16.64l32-21.33A20,20,0,0,0,164,194.66V140.75l66.67-71.16.12-.14A20,20,0,0,0,234.29,47.91Zm-91,79.89A12,12,0,0,0,140,136v56.52l-24,16V136a12,12,0,0,0-3.25-8.2L49.23,60H206.77Z"></path></svg>
                                            <span className='text-blueMenu text-[14px]'>همه را خوانده‌ام</span>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                type="checkbox"
                                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                                            />
                                            <span className="text-[14px] text-gray-700 font-IRANYekan-Light cursor-pointer select-none">
                                                فقط خوانده نشده‌ها
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className='my-4 block h-px w-full bg-gray-200'></span>
                                <div>
                                    <p className="font-IRANYekan-Bold text-[14px] mb-2">اعلانیه ای موجود نیست !</p>
                                    <span className='text-gray-500 text-[13px]'>اطلاعیه‌ها تا سی روز ذخیره و بعد از آن به‌صورت خودکار حذف می‌شوند</span>
                                </div>
                            </>
                        ) ||
                        tab === "kojaro-notificaitons" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-IRANYekan-Bold text-[14px] mb-4">فهرست تمامی اعلانات شما در ۳۰ روز گذشته</p>
                                        <div className='flex items-center gap-x-2'>
                                            <svg className='fill-blueMenu' width="16" height="16" fill="var(--primary-1)" viewBox="0 0 256 256"><path d="M234.29,47.91A20,20,0,0,0,216,36H40A20,20,0,0,0,25.2,69.45l.12.14L92,140.75V216a20,20,0,0,0,31.1,16.64l32-21.33A20,20,0,0,0,164,194.66V140.75l66.67-71.16.12-.14A20,20,0,0,0,234.29,47.91Zm-91,79.89A12,12,0,0,0,140,136v56.52l-24,16V136a12,12,0,0,0-3.25-8.2L49.23,60H206.77Z"></path></svg>
                                            <span className='text-blueMenu text-[14px]'>همه را خوانده‌ام</span>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                type="checkbox"
                                                className="appearance-none bg-gray-200 rounded-full shrink-0 w-12 h-6 m-0 relative cursor-pointer transition-all duration-100 ease-out hover:bg-gray-300 checked:bg-green-500 checked:hover:bg-green-600 focus:outline-none before:content-[''] before:absolute before:inset-[-9.6px] after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all after:duration-100 after:ease-out checked:after:left-7"
                                            />
                                            <span className="text-[14px] text-gray-700 font-IRANYekan-Light cursor-pointer select-none">
                                                فقط خوانده نشده‌ها
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className='my-4 block h-px w-full bg-gray-200'></span>
                                <div>
                                    <p className="font-IRANYekan-Bold text-[14px] mb-2">اعلانیه ای موجود نیست !</p>
                                    <span className='text-gray-500 text-[13px]'>اطلاعیه‌ها تا سی روز ذخیره و بعد از آن به‌صورت خودکار حذف می‌شوند</span>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default NotificationsBox;