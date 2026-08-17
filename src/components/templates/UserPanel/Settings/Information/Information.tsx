"use client"
import BirthDatePicker from '@/components/modules/BirthDatePicker/BirthDatePicker';
import React, { useState } from 'react'

const InformationBox = () => {

    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="flex items-center gap-x-4">
                    <button type="button" className='cursor-pointer gap-x-2 h-8.5 flex items-center justify-between transition-all ease-in-out hover:bg-dark2 hover:text-white px-4 border border-gray-200 rounded-full'>
                        <svg width="16" height="16" fill="currentColor" className="bi bi-person-fill fill-blueMenu" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span className='text-[13px]'>اطلاعات کاربری</span>
                    </button>
                    <button type="button" className='cursor-pointer gap-x-2 h-8.5 flex items-center justify-between transition-all ease-in-out hover:bg-dark2 hover:text-white px-4 border border-gray-200 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill fill-orange-500" viewBox="0 0 16 16">
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        </svg>
                        <span className='text-[13px]'>گذرواژه</span>
                    </button>
                    <button type="button" className='cursor-pointer gap-x-2 h-8.5 flex items-center justify-between transition-all ease-in-out hover:bg-dark2 hover:text-white px-4 border border-gray-200 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-fill fill-red-500" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
                        </svg>
                        <span className='text-[13px]'>وب‌سایت‌ها</span>
                    </button>
                </div>
                <div className="mt-10 shadow shadow-gray-200 bg-white p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="block bg-red-500 w-1 h-6 ml-4"></span>
                            <h4 className="font-IRANYekan-Bold md:text-[18px]">اطلاعات کاربری</h4>
                        </div>
                    </div>
                    <p className="text-[14px] font-IRANYekan-Light text-dark2 py-4">اطلاعات حساب کاربری خودت رو ببین و هر زمان که نیاز شد می‌تونی تغییر بدی. این اطلاعات در تمامی سرویس‌ها مشترک هستند</p>
                    <div className="mt-5">
                        {/* full name */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between w-[60%] gap-x-4">
                                <span className='text-[14px] font-IRANYekan-Light'>نام و نام‌خانوادگی</span>
                                <p className='text-[14px] text-gray-500 font-IRANYekan-Bold'>ثبت نشده است</p>
                                {/* change input */}
                                <div className="w-[80%] hidden">
                                    <input type="text" className='border-2 rounded-sm font-IRANYekan-Light text-[14px] border-dark px-2 w-full h-8' />
                                </div>
                            </div>
                            <div className="hidden items-center gap-x-6">
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-green-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className='cursor-pointer h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</button>
                        </div>
                        <span className='w-full h-px bg-gray-200 my-4 block'></span>
                        {/* username */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between w-[60%] gap-x-4">
                                <span className='text-[14px] font-IRANYekan-Light'>نام کاربری</span>
                                <p className='text-[14px] text-gray-500 font-IRANYekan-Bold'>ثبت نشده است</p>
                                {/* change input */}
                                <div className="w-[80%] hidden">
                                    <input type="text" className='border-2 rounded-sm font-IRANYekan-Light text-[14px] border-dark px-2 w-full h-8' />
                                </div>
                            </div>
                            <div className="hidden items-center gap-x-6">
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-green-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className='cursor-pointer h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</button>
                        </div>
                        <span className='w-full h-px bg-gray-200 my-4 block'></span>
                        {/* date of birth */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between w-[60%] gap-x-4">
                                <span className='text-[14px] font-IRANYekan-Light'>تاریخ تولد</span>
                                <p className='text-[14px] text-gray-500 font-IRANYekan-Bold'>ثبت نشده است</p>
                                {/* change input */}
                                <div className="w-[80%] hidden">
                                    <BirthDatePicker />
                                </div>
                            </div>
                            <div className="hidden items-center gap-x-6">
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-green-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className='cursor-pointer h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</button>
                        </div>
                        <span className='w-full h-px bg-gray-200 my-4 block'></span>
                        {/* email */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between w-[60%] gap-x-4">
                                <span className='text-[14px] font-IRANYekan-Light'>ایمیل</span>
                                <p className='text-[14px] text-gray-500 font-IRANYekan-Bold'>ثبت نشده است</p>
                                <div className="w-[80%] hidden">
                                    <input type="text" className='border-2 rounded-sm font-IRANYekan-Light text-[14px] border-dark px-2 w-full h-8' />
                                </div>
                            </div>
                            <div className="hidden items-center gap-x-6">
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-green-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className='cursor-pointer h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</button>
                        </div>
                        <span className='w-full h-px bg-gray-200 my-4 block'></span>
                        {/* phone */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between w-[60%] gap-x-4">
                                <span className='text-[14px] font-IRANYekan-Light'>موبایل</span>
                                <p className='text-[14px] text-gray-500 font-IRANYekan-Bold'>ثبت نشده است</p>
                                <div className="w-[80%] hidden">
                                    <input type="text" className='border-2 rounded-sm font-IRANYekan-Light text-[14px] border-dark px-2 w-full h-8' />
                                </div>
                            </div>
                            <div className="hidden items-center gap-x-6">
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-green-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button type="button" className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className='cursor-pointer h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationBox;