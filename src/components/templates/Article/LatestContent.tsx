import Link from 'next/link';
import React from 'react'

const LatestContent = () => {
    return (
        <>
            <div className="mt-10">
                <div className="flex items-center gap-x-4">
                    <span className='block bg-blueMenu w-1 h-5 mt-1'></span>
                    <span className='font-IRANYekan-Bold'>جدید ترین مطالب</span>
                </div>
                <div className="mt-10">
                    <Link href="#" className='flex gap-x-4 mb-2'>
                        <img src="/images/image14.jpg" className='lg:w-18 lg:h-12 w-[30%] rounded-md' alt="article image" />
                        <span className='text-[13px] font-IRANYekan-Bold'>دوربین جیبی که پرواز می‌کند؛ انقلابی در ثبت لحظات شگفت‌انگیز سفر</span>
                    </Link>
                    <Link href="#" className='flex gap-x-4 mb-2'>
                        <img src="/images/image10.jpg" className='lg:w-18 lg:h-12 w-[30%] rounded-md' alt="article image" />
                        <span className='text-[13px] font-IRANYekan-Bold'>دو مجسمه کوچک کشف‌شده در آلمانباستان‌شناسان کوچک‌ترین مجسمه عصر یخبندان را در آلمان پیدا کردند</span>
                    </Link>
                    <Link href="#" className='flex gap-x-4 mb-2'>
                        <img src="/images/image07.jpg" className='lg:w-18 lg:h-12 w-[30%] rounded-md' alt="article image" />
                        <span className='text-[13px] font-IRANYekan-Bold'>چرا سفر به میراث جهانی یونسکو به ترند جدید گردشگران تبدیل شده است؟</span>
                    </Link>
                    <Link href="#" className='flex gap-x-4 mb-2'>
                        <img src="/images/image24.jpg" className='lg:w-18 lg:h-12 w-[30%] rounded-md' alt="article image" />
                        <span className='text-[13px] font-IRANYekan-Bold'>کشف انبار مواد غذایی دوره سلجوقیان در شهر تاریخی آنی</span>
                    </Link>
                    <Link href="#" className='flex gap-x-4 mb-2'>
                        <img src="/images/image02.jpg" className='lg:w-18 lg:h-12 w-[30%] rounded-md' alt="article image" />
                        <span className='text-[13px] font-IRANYekan-Bold'>قوانین نانوشته سرویس بهداشتی در جهان؛ از توالت‌های آسیایی تا بیده اروپایی</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LatestContent;