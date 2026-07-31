import Link from 'next/link'
import React from 'react'

const NotLoggedIn = () => {
    return (
        <div className="mt-10">
            <div className="flex flex-col justify-center items-center gap-y-2">
                <img src="/images/add-comment.png" className='w-30 h-29.75' alt="comment img" />
                <p className='font-IRANYekan-Bold text-[14px]'>0 دیدگاه ثبت شده، نظر تو چیه؟</p>
                <span className='text-[14px] font-IRANYekan-Light'>برای درج نظر وارد شو یا ثبت‌نام کن</span>
                <Link href="#" className='bg-dark text-white w-31 h-8 rounded-full text-[14px] flex items-center justify-center pb-0.5 transition-all ease-in hover:bg-dark2'>ورود/ثبت نام</Link>
            </div>
        </div>
    )
}

export default NotLoggedIn;