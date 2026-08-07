import Link from 'next/link'
import React from 'react'

const SearchBox = () => {
    return (
        <div className='w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container'>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                    <h4 className="font-IRANYekan-Bold">جستجو</h4>
                </div>
                <div className="w-[80%] h-7.5 bg-white border border-gray-400 rounded-full flex items-center gap-x-4">
                    <button type="button" className='w-7 h-7 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center'>
                        <svg width="16" height="16" className='fill-gray-500' viewBox="0 0 256 256"><path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path></svg>
                    </button>
                    <input type="text" className='text-[14px] placeholder:text-[14px] w-full h-full' placeholder='جستوجو...' />
                </div>
            </div>
            {/* search results */}
            <div className="mt-15 2xl:mr-74 xl:mr-62 lg:mr-51 md:mr-39">
                <div className="flex items-center">
                    <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                    <h4 className="font-IRANYekan-Bold">29 مطلب با عبارت کالیفرنیا یافت شد</h4>
                </div>
                <div className="mt-5">
                    <div className="flex items-center gap-x-2 mb-2">
                        <Link href="#">
                            <img src="/images/image10.jpg" alt="img" className='w-18.75 h-12 rounded-md' />
                        </Link>
                        <div>
                            <Link href="#" className='text-[14px] font-IRANYekan-Bold'>حقایق جالب در مورد ایالت کالیفرنیا، آمریکا</Link>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mt-2">
                                    <span className='text-[13px] text-gray-400'>30 آبان 97</span>
                                    <span className='pr-2 pl-2 block text-gray-400'>|</span>
                                    <span className='text-[13px] text-gray-400'>مطالعه '4</span>
                                </div>
                                <button type="button" className='cursor-pointer flex items-center gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='fill-gray-400' width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                                    <span className='text-[13px] text-gray-400'>بوکمارک</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                        <Link href="#">
                            <img src="/images/image15.jpg" alt="img" className='w-18.75 h-12 rounded-md' />
                        </Link>
                        <div>
                            <Link href="#" className='text-[14px] font-IRANYekan-Bold'>تاریخ پرماجرای کالیفرنیا؛ از سرزمین متروک تا قلب تجارت</Link>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mt-2">
                                    <span className='text-[13px] text-gray-400'>30 آبان 97</span>
                                    <span className='pr-2 pl-2 block text-gray-400'>|</span>
                                    <span className='text-[13px] text-gray-400'>مطالعه '4</span>
                                </div>
                                <button type="button" className='cursor-pointer flex items-center gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='fill-gray-400' width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                                    <span className='text-[13px] text-gray-400'>بوکمارک</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className='cursor-pointer mt-10 flex items-center gap-x-2 font-IRANYekan-Bold'>
                        <svg width="12" height="12" fill="#9696a0" className='fill-blueMenu' viewBox="0 0 256 256" ><path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"></path></svg>
                        <span className='text-[13px]'>مشاهده مطالب بیشتر</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;