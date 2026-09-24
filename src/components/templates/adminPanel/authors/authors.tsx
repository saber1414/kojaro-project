import React from 'react'

const AuthorList = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>لیست نویسندگان</h3>
                    <div className="bg-white w-88 h-10.5 rounded-md px-2 flex items-center gap-x-2">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                stroke='#AEB9E1'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M7.26 12.945a5.926 5.926 0 1 0 0-11.852 5.926 5.926 0 0 0 0 11.852M14.667 14.426l-3.223-3.222'
                            ></path>
                        </svg>
                        <input type="text" className='w-full h-full text-[13px] font-IRANYekan-Bold placeholder:text-[13px] text-gray-icon' placeholder='جستوجو...' />
                    </div>
                </div>
                <button type='button' className='w-34.25 h-8 bg-green-1 text-white cursor-pointer text-[13px] rounded-sm'>افزودن کاربر جدید</button>
            </div>
            <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#CB3CFF'
                                d='M5.127 7.48c.51 0 .977-.237 1.355-.6-.396-.712-.622-1.516-.622-2.288 0-.655.157-1.272.435-1.817a2.25 2.25 0 0 0-1.18-.335c-1.263 0-2.287 1.038-2.287 2.32 0 1.28 1.036 2.72 2.3 2.72M6.666 8.58a3.3 3.3 0 0 0-.692-.075H4.273a3.283 3.283 0 0 0-3.278 3.288l.008.389c0 .507.41.918.916.918h1.677a5.18 5.18 0 0 1 3.07-4.52M9.808 7.965c1.566 0 2.821-1.785 2.821-3.373s-1.27-2.877-2.836-2.877-2.836 1.288-2.836 2.877 1.285 3.373 2.85 3.373'
                            ></path>
                            <path
                                fill='#CB3CFF'
                                d='M14.921 13.314a4.07 4.07 0 0 0-4.063-4.077h-2.11a4.07 4.07 0 0 0-4.063 4.077l.01.482c0 .629.508 1.139 1.135 1.139h7.966c.627 0 1.135-.51 1.135-1.14z'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل نویسندگان</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                            width='14'
                            height='15'
                            fill='none'
                            viewBox='0 0 14 15'
                        >
                            <path
                                fill='#FDB52A'
                                d='M0 13.454a4.44 4.44 0 0 1 4.438-4.438h4.904a4.44 4.44 0 0 1 4.438 4.438 1.48 1.48 0 0 1-1.48 1.48H1.48A1.48 1.48 0 0 1 0 13.453M6.892 7.89c2.169 0 3.927-1.767 3.927-3.945S9.06 0 6.892 0 2.966 1.766 2.966 3.945s1.758 3.944 3.926 3.944'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>نویسندگان جدید</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#05C168'
                                d='M11.502.889a4.4 4.4 0 0 0-3.539 1.777 4.42 4.42 0 0 0-2.22-1.575 4.4 4.4 0 0 0-2.718.026c-.88.295-1.647.86-2.19 1.617A4.46 4.46 0 0 0 0 5.334c0 5.325 7.366 9.525 7.676 9.703.087.05.187.075.287.074.1.002.2-.024.288-.074a23 23 0 0 0 3.797-2.785c2.573-2.326 3.878-4.652 3.878-6.919 0-1.179-.466-2.31-1.295-3.143A4.41 4.41 0 0 0 11.502.89'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>نویسندگان برتر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#086CD9'
                                d='M7.963 0C6.388 0 4.85.47 3.54 1.348a8 8 0 0 0-2.933 3.59 8.03 8.03 0 0 0 1.726 8.719 7.93 7.93 0 0 0 8.678 1.734 7.97 7.97 0 0 0 3.574-2.946A8.03 8.03 0 0 0 15.926 8a8.03 8.03 0 0 0-2.337-5.652A7.96 7.96 0 0 0 7.963 0M4.288 8.923a.92.92 0 0 1-.849-.57.927.927 0 0 1 .67-1.258.915.915 0 0 1 .943.392.926.926 0 0 1-.114 1.166.92.92 0 0 1-.65.27m3.675 0a.92.92 0 0 1-.849-.57.93.93 0 0 1 .2-1.006A.918.918 0 0 1 8.881 8c0 .245-.097.48-.27.653a.92.92 0 0 1-.649.27m3.676 0a.92.92 0 0 1-.85-.57.93.93 0 0 1 .2-1.006.917.917 0 0 1 1.568.653.917.917 0 0 1-.919.923'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر نویسندگان</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthorList