import Link from 'next/link';
import React from 'react'

const ForgetPassBox = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
                <div className="sm:w-109 w-full shadow shadow-gray-200 bg-white sm:mx-auto sm:my-0">
                    <img src="/images/login-header.jpg" className='w-full' alt="login header" />
                    <h4 className="mt-5 font-IRANYekan-Bold text-[14px] text-center">بازیابی گذرواژه</h4>
                    <div className="p-4">
                        <form className='mt-5'>
                            <div>
                                <label className='text-[13px] text-dark2 font-IRANYekan-Bold pb-2 block'>ایمیل یا شماره موبایلتان را وارد کنید</label>
                                <input dir='ltr' type="text" className='w-full text-[14px] h-8 rounded-sm border border-gray-200 pl-2' />
                            </div>
                            <button type="submit" className='w-full h-8 bg-dark2 text-white text-[13px] font-IRANYekan-Bold my-4 rounded-full flex items-center justify-center'>ادامه</button>
                        </form>
                    </div>
                    <span className='block w-full h-px bg-gray-200 mb-4'></span>
                    <Link href="/signIn" className='my-4 flex items-center justify-center gap-x-2 text-[13px] text-gray-500'>
                        <span>بازگشت</span>
                        <svg width="16" height="16" fill="currentColor" className="bi bi-arrow-left fill-gray-400" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ForgetPassBox;