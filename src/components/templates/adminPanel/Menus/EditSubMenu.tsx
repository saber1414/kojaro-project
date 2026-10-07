import React, { useState } from 'react'

type EditSubMenuProps = {
    _id?: string;
    confirm: () => void;
    closeBtn: () => void;
};

const EditSubMenu = ({ confirm, closeBtn, _id }: EditSubMenuProps) => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    return (
        <>
            <div onClick={closeBtn} className="fixed bg-overview z-60 top-0 right-0 left-0 bottom-0">
                <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className='block w-1 h-5 absolute right-0 bg-fuchsia-500'></span>
                            <span className='text-[14px]'>ویرایش زیر منو</span>
                        </div>
                        <button
                            type="button"
                            onClick={closeBtn}
                            className='cursor-pointer'>
                            <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                        </button>
                    </div>
                    <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                    <form className='flex justify-between flex-wrap gap-y-4'>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>نام منو</label>
                            <input type="text" className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='نام منو' />
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>میسر منو (url)</label>
                            <input type="text" dir='ltr' className='bg-white pl-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='url' />
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>آیکون منو</label>
                            <label htmlFor="cover-article" className='bg-white flex items-center justify-center p-4 rounded-sm h-12 cursor-pointer border-gray-icon border-dashed border'>
                                <span className='text-[13px] text-gray-icon flex gap-x-2'>
                                    آیکون را انتخاب کنید
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
                                <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp svg</small></span>
                                <span className='text-[13px]'>حجم مجاز: <small className='text-[13px] text-gray-icon'>حجم کاور نباید بیشتر از 5 مگابایت باشد.</small></span>
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
                            <label className='text-[14px] mb-4'>دسته بندی زیر منو</label>
                            <button
                                type="button"
                                className='bg-white rounded-sm px-4 border h-12 border-gray-200 cursor-pointer relative text-start'
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
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
                                <div className={`${isOpenMenu ? "block opacity-100" : "hidden opacity-0"} bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden`}>
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
                        <div className="w-[48%] flex flex-col"></div>
                        <div className="flex justify-end w-full">
                            <button type="button" onClick={confirm} className='w-35 h-10 cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-fuchsia-500'>ویرایش</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditSubMenu;