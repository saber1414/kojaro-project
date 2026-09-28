"use client"
import { RichTextEdito } from '@/components/modules/AdminPanel/RichTextEditor/RichTextEditor';
import Link from 'next/link';
import { useState } from 'react';

const CreateArticleTemp = () => {
    const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>نوشتن مقاله</h3>
                </div>
                <Link href="/adminPanel/articles" className='flex items-center justify-center gap-x-2 w-30 h-6 bg-white'>
                    <span className='text-[13px] text-gray-icon'>لیست مقالات</span>
                    <svg
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-arrow-left fill-gray-icon'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fillRule='evenodd'
                            d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'
                        ></path>
                    </svg>
                </Link>
            </div>
            <form className='mt-10 flex justify-between flex-wrap gap-y-4'>
                <div className="w-[48%] flex flex-col">
                    <label className='text-[14px] mb-4'>عنوان</label>
                    <input type="text" placeholder='عنوان مقاله' className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                </div>
                <div className="w-[48%] flex flex-col">
                    <label className='text-[14px] mb-4'>مسیر</label>
                    <input type="text" placeholder='مسیر مقاله' className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                </div>
                <div className="w-[48%] flex flex-col">
                    <label className='text-[14px] mb-4'>کاور مقاله</label>
                    <label htmlFor="cover-article" className='bg-white flex items-center justify-center p-4 rounded-sm h-12 cursor-pointer border-gray-icon border-dashed border'>
                        <span className='text-[13px] text-gray-icon flex gap-x-2'>
                            کاور مقاله را انتخاب کنید
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-upload'
                                viewBox='0 0 16 16'
                            >
                                <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5'></path>
                                <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z'></path>
                            </svg>
                        </span>
                    </label>
                    <input type="file" id='cover-article' className='hidden' />
                    <div className="mt-5 mb-4 flex flex-col gap-y-2">
                        <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp</small></span>
                        <span className='text-[13px]'>حجم حجاز: <small className='text-[13px] text-gray-icon'>حجم کاور نباید بیشتر از 5 مگابایت باشد.</small></span>
                    </div>
                    <div className="mt-5 w-full relative hidden">
                        <img src="/images/image01.jpg" alt="article image" className='h-30 w-full object-cover' />
                        <button type="button" className='cursor-pointer absolute top-3.5 left-1.5 bg-white2 w-10 flex items-center justify-center rounded-sm h-6'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-trash-fill fill-red-500'
                                viewBox='0 0 16 16'
                            >
                                <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0'></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-[48%] flex flex-col">
                    <label className='text-[14px] mb-4'>دسته بندی مقاله</label>
                    <button
                        type="button"
                        className='bg-white rounded-sm px-4 border h-12 border-gray-200 cursor-pointer relative text-start'
                        onClick={() => setIsOpenCategory(!isOpenCategory)}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-start block truncate text-[13px]">یک دسته بندی را انتخاب کنید</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div className={`${isOpenCategory ? "block opacity-100" : "hidden opacity-0"} bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden`}>
                            <div className="flex items-center justify-between border border-gray-200 rounded-sm px-4 bg-gray-100">
                                <input
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    className='h-10 placeholder:text-[13px] bg-transparent outline-none text-[14px]' placeholder='جستوجوی دسته بندی' />
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-2 border border-gray-200 p-1 text-[14px] max-h-48 overflow-y-auto">
                                <p className="hover:bg-gray-200 h-8 transition-all ease-in pr-2 flex items-center rounded-sm cursor-pointer text-[13px]">نام دسته بندی</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="w-[48%] flex flex-col">
                    <label className='text-[14px] mb-4'>تگ ها</label>
                    <div className="flex items-center gap-x-2">
                        <input type="text" placeholder='تگ مقاله (دشت - کویر)' className='bg-white pr-4 h-10 w-100 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                        <button type="button" className='cursor-pointer text-[13px] h-9 w-15 bg-blueMenu text-white'>ثبت</button>
                    </div>
                    <div className="flex gap-x-2 mt-3">
                        <div className='w-20 h-8 rounded-full flex items-center justify-center border border-gray-100 text-[13px] bg-white'>
                            <span>دشت</span>
                            <button type="button" className='mr-4 text-gray-icon'>x</button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <label className='text-[14px] mb-4'>خلاصه توضیحات</label>
                    <textarea placeholder='خلاصه توضیحات' className='bg-white border border-gray-200 text-[14px] text-gray-icon placeholder:text-[13px] h-40 rounded-sm pt-2 pr-4'></textarea>
                </div>
                <div className="w-full flex flex-col">
                    <label className='text-[14px] mb-4'>متن مقاله</label>
                    <RichTextEdito
                        value=''
                        onChange={(e) => ''}
                    />
                </div>
                <div className="w-[48%] flex flex-col"></div>
                <div className="flex justify-end w-full">
                    <button type="button" className='w-35 h-10 cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-green-1'>ذخیره</button>
                </div>
            </form>
        </>
    )
}

export default CreateArticleTemp;