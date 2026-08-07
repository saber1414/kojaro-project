"use client"
import React from 'react'

const CategoryList = () => {
    return (
        <div className='px-8'>
            <div className="flex justify-between items-center mt-5">
                <h3 className="text-2xl">جهانگردی</h3>
                <div className="flex items-center gap-x-4">
                    <span className='text-[14px] text-dark2'>148 دنبال کننده</span>
                    <button type="button" className='cursor-pointer w-40 h-8 bg-dark text-white text-[14px] flex items-center justify-center gap-x-2 rounded-full px-4'>
                        <svg width="12" height="12" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M44,68V196h64a12,12,0,0,1,0,24H40a20,20,0,0,1-20-20V64A20,20,0,0,1,40,44H93.33a20.12,20.12,0,0,1,12,4L132,68h84a20,20,0,0,1,20,20v20a12,12,0,0,1-24,0V92H128a12,12,0,0,1-7.2-2.4L92,68ZM239.64,170.87l-20.58,17,6.25,25.26a12,12,0,0,1-17.73,13.22L184,212.46l-23.58,13.88a12,12,0,0,1-17.73-13.22l6.25-25.26-20.58-17a12,12,0,0,1,6.72-21.22l27.42-2.12L173,123.24a12,12,0,0,1,22,0l10.48,24.29,27.42,2.12a12,12,0,0,1,6.72,21.22Zm-38.2.42-5-.39a12,12,0,0,1-10.09-7.21l-2.33-5.4-2.33,5.4a12,12,0,0,1-10.1,7.21l-5,.39,3.48,2.87a12,12,0,0,1,4,12.13l-1.21,4.89,5.07-3a12,12,0,0,1,12.18,0l5.07,3L194,186.29a12,12,0,0,1,4-12.13Z"></path></svg>
                        <span className='text-white text-[13px]'>دنبال کردن</span>
                    </button>
                </div>
            </div>
            <span className='block h-px w-full bg-gray-200 my-4'></span>
            <p className='pt-2 text-[14px]'>تمامی مطالب و مقالات گردشگری درباره جهان؛ از مقاصد دیدنی و فرهنگ‌ها تا نکات سفر و ماجراجویی. همراه با راهنمای کاربردی برای سفرهای بهتر.</p>
        </div>
    )
}

export default CategoryList;