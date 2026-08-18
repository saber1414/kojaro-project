import Link from 'next/link'
import React from 'react'

const SignInBox = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="sm:w-109 w-full shadow shadow-gray-200 bg-white sm:mx-auto sm:my-0">
                <img src="/images/login-header.jpg" className='w-full' alt="login header" />
                <h4 className="mt-5 font-IRANYekan-Bold text-[14px] text-center">ورود یا ثبت نام</h4>
                <div className="p-4">
                    <Link href="" className='mt-5 w-full h-8 border border-gray-200 rounded-full flex items-center justify-center gap-x-2'>
                        <svg width="16" height="16" fill="currentColor" className="bi bi-google fill-red-500" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Bold'>ورود با گوگل</span>
                    </Link>
                    <div className="flex items-center gap-x-2 mt-5">
                        <span className='w-full h-px bg-gray-200 block'></span>
                        <span className='text-gray-400 text-[14px] font-IRANYekan-Bold'>یا</span>
                        <span className='w-full h-px bg-gray-200 block'></span>
                    </div>
                    <form className='mt-5'>
                        <div>
                            <label className='text-[13px] text-dark2 font-IRANYekan-Bold pb-2 block'>ایمیل یا شماره موبایلتان را وارد کنید</label>
                            <input dir='ltr' type="text" className='w-full text-[14px] h-8 rounded-sm border border-gray-200 pl-2' />
                        </div>
                        <button type="submit" className='w-full h-8 bg-dark2 text-white text-[13px] font-IRANYekan-Bold my-4 rounded-full flex items-center justify-center'>ادامه</button>
                    </form>
                    <Link href="/forgetPass" className='text-[13px] text-red-500 text-center mt-5 block'>گذرواژه را فراموش کردید؟</Link>
                </div>
                <span className='block w-full h-px bg-gray-200 mb-4'></span>
                <Link href="/" className='my-4 flex items-center justify-center gap-x-2 text-[13px] text-gray-500'>
                    <span>بازگشت</span>
                    <svg width="16" height="16" fill="currentColor" className="bi bi-arrow-left fill-gray-400" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default SignInBox;