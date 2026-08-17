"use client"
import Link from 'next/link';
import React from 'react'

const Password = () => {
    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white p-4">
                    <div className="flex items-center">
                        <span className="block bg-red-500 w-1 h-6 ml-4"></span>
                        <h4 className="font-IRANYekan-Bold md:text-[18px]">گذرواژه</h4>
                    </div>
                    <p className="text-[14px] font-IRANYekan-Light py-6">رمز عبور خود را هر زمان که فکر می کنید ممکن است به خطر افتاده باشد، تغییر دهیدسپس رمز عبور جدیدی ایجاد کنید که در جای دیگری از آن استفاده نمی کنید</p>
                    <div className="flex items-center justify-between">
                        <div className="flex w-[60%] items-center justify-between">
                            <span className='text-[14px] font-IRANYekan-Light'>گذرواژه</span>
                            <p className="text-[14px] font-IRANYekan-Bold">تا به حال رمز عبور تغییر نکرده است</p>
                        </div>
                        <Link href="#" className='flex items-center justify-center h-8 border border-dark rounded-full text-[13px] font-IRANYekan-Bold w-26'>ویرایش</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Password;