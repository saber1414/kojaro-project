"use client"
import Link from 'next/link';

const UserInfo = () => {
    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white shadow shadow-gray-200 p-4 rounded-sm">
                    <div className="flex items-center">
                        <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                        <h4 className="font-IRANYekan-Bold md:text-[18px]">اطلاعات کاربری</h4>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">نام و نام خانوادگی</h4>
                            <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>ثبت نشده است</span>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">نام کاربری</h4>
                            <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>WZajLErZo</span>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">تاریخ تولد</h4>
                            <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>ثبت نشده است</span>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">شهر محل سکونت</h4>
                            <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>ثبت نشده است</span>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">ایمیل</h4>
                            <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>ثبت نشده است</span>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        <div className="flex items-center w-full">
                            <h4 className="font-IRANYekan-Light basis-[30%]">موبایل</h4>
                            <div className='flex flex-col'>
                                <span className='text-[13px] font-IRANYekan-Bold basis-[70%] pt-1'>09333943645</span>
                                <small className='text-green-500 pt-2 flex items-center justify-start gap-x-1 flex-row-reverse'>تایید شده
                                    <svg className='fill-green-500' width="16" height="16" viewBox="0 0 256 256"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path></svg>
                                </small>
                            </div>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                    </div>
                    <Link href="/userPanel/information" className="flex bg-dark2 text-white items-center justify-between w-60.5 h-7.75 rounded-full px-4 mt-5">
                        <span className='text-[14px]'>ویرایش اطلاعات در حساب کجارو</span>
                        <svg width="12" height="12" viewBox="0 0 256 256" className='fill-white'><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UserInfo;