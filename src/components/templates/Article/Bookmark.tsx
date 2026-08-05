"use client"
import React, { useState } from 'react'

type BookmarkProps = {
    onCancel: () => void
}

const Bookmark = ({ onCancel }: BookmarkProps) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [addList, setAddList] = useState(false);

    const handleEditList = () => {
        setEditModal(false)
    }

    return (
        <>
            <div className='fixed flex flex-col 2xl:w-[50%] xl:w-[70%] lg:w-[70%] md:w-[80%] sm:w-full bg-white md:h-140 h-full z-40 mx-auto my-0 right-0 left-0 md:top-[15%] top-0 bottom-0'>
                <div className="flex items-center justify-between relative p-4">
                    <span className='font-IRANYekan-Bold text-[14px]'>مدیریت بوک‌مارک‌ها</span>
                    <span className='w-1 absolute right-0 block h-6 bg-blueMenu'></span>
                    <button onClick={onCancel} type="button" className='cursor-pointer'>
                        <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='block bg-gray-200 h-px w-full'></span>
                <div className="p-4">
                    <button type="button" onClick={() => setAddList(true)} className={`cursor-pointer items-center gap-x-2 ${addList ? "hidden" : "flex"}`}>
                        <svg width="16" height="16" viewBox="0 0 256 256" className="fill-green-500"><path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path></svg>
                        <span className='text-[14px] font-IRANYekan-Bold text-green-400'>لیست جدید ایجاد کن</span>
                    </button>
                    {/* list default hidden => flex */}
                    <div className={`items-center justify-between gap-x-2 ${addList ? "flex" : "hidden"}`}>
                        <input type="text" placeholder='نام لیست را وارد کنید' className='placeholder:text-[14px] w-full h-10 placeholder:text-gray-400 px-2 border border-gray-400 rounded-sm' />
                        <div className="flex items-center gap-x-2">
                            <button onClick={() => setAddList(false)} type="button" className='cursor-pointer'>
                                <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path></svg>
                            </button>
                            <button onClick={() => setAddList(false)} type="button" className='cursor-pointer'>
                                <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {/* edit modal */}
                    <div className={`items-center justify-between gap-x-2 ${editModal ? "flex" : "hidden"} mt-4`}>
                        <input type="text" placeholder='نام لیست را وارد کنید' className='placeholder:text-[14px] text-[14px] w-full h-10 placeholder:text-gray-400 px-2 border border-gray-400 rounded-sm' />
                        <div className="flex items-center gap-x-2">
                            <button onClick={handleEditList} type="button" className='cursor-pointer'>
                                <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path></svg>
                            </button>
                            <button onClick={handleEditList} type="button" className='cursor-pointer'>
                                <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {/* todo list */}
                    <ul className='mt-5 h-92 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                        <li className={`pl-2 ${editModal ? "hidden" : "block"}`}>
                            <div className="flex items-center justify-between">
                                <span className='text-[14px]'>لیست 1</span>
                                <div className="flex items-center gap-x-4">
                                    <button onClick={() => setEditModal(true)} type="button" className='cursor-pointer'>
                                        <svg width="16" height="16" className='fill-gray-500 transition-all ease-in-out hover:fill-blueMenu' viewBox="0 0 256 256" id="pen"><path d="M230.15,70.54,185.46,25.86a20,20,0,0,0-28.28,0L33.86,149.17A19.86,19.86,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.85,19.85,0,0,0,14.14-5.86l79.46-79.45,4.16,13.89-34.93,34.93a12,12,0,0,0,17,17l40-40a12,12,0,0,0,3-11.94l-9.94-33.13,24.59-24.59A20,20,0,0,0,230.15,70.54ZM65,152l71-71,39,39-71,71ZM52,173l31,31H52ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
                                    </button>
                                    <button onClick={() => setDeleteModal(true)} type="button" className='cursor-pointer'>
                                        <svg width="16" height="16" className='fill-gray-500 transition-all ease-in-out hover:fill-red-500' viewBox="0 0 256 256"><path d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <span className='block bg-gray-200 h-px w-full my-4'></span>
                        </li>
                        <li className={`pl-2 ${editModal ? "hidden" : "block"}`}>
                            <div className="flex items-center justify-between">
                                <span className='text-[14px]'>لیست 2</span>
                                <div className="flex items-center gap-x-4">
                                    <button onClick={() => setEditModal(true)} type="button" className='cursor-pointer'>
                                        <svg width="16" height="16" className='fill-gray-500 transition-all ease-in-out hover:fill-blueMenu' viewBox="0 0 256 256" id="pen"><path d="M230.15,70.54,185.46,25.86a20,20,0,0,0-28.28,0L33.86,149.17A19.86,19.86,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.85,19.85,0,0,0,14.14-5.86l79.46-79.45,4.16,13.89-34.93,34.93a12,12,0,0,0,17,17l40-40a12,12,0,0,0,3-11.94l-9.94-33.13,24.59-24.59A20,20,0,0,0,230.15,70.54ZM65,152l71-71,39,39-71,71ZM52,173l31,31H52ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
                                    </button>
                                    <button onClick={() => setDeleteModal(true)} type="button" className='cursor-pointer'>
                                        <svg width="16" height="16" className='fill-gray-500 transition-all ease-in-out hover:fill-red-500' viewBox="0 0 256 256"><path d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <span className='block bg-gray-200 h-px w-full my-4'></span>
                        </li>
                    </ul>
                </div>
                <div className="h-16 bg-gray-50 mt-auto p-4 flex items-center gap-x-2">
                    <button type="button" className='cursor-pointer bg-dark2 text-white text-[13px] flex items-center justify-center w-40 h-8 rounded-full'>
                        ذخیره
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className='cursor-pointer border border-gray-200 text-[13px] flex items-center justify-center w-40 h-8 rounded-full'>بستن</button>
                </div>
            </div>
            {/* delete modal */}
            <div onClick={() => setDeleteModal(false)} className={`fixed bg-overview top-0 right-0 left-0 bottom-0 z-50 ${deleteModal ? "flex" : "hidden"}`}>
                {/* alert box */}
                <div className={`2xl:w-[30%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] h-49.5 absolute top-[30%] right-0 left-0 mx-auto my-0 bg-white ${deleteModal ? "flex" : "hidden"} flex-col`}>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                            <span className='text-[14px]'>حذف لیست</span>
                        </div>
                        <button onClick={() => setDeleteModal(false)} type="button" className='cursor-pointer'>
                            <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                        </button>
                    </div>
                    <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                    <div className='px-4'>
                        <p className='text-[14px] font-IRANYekan-Bold'>آیا از حذف این لیست مطمئن هستید؟</p>
                        <span className='text-[14px] pt-3 text-gray-500 block'>با حذف این لیست، مطالب ذخیره شده در لیست نیز حذف خواهند شد</span>
                    </div>
                    <div className="bg-gray-100 h-12 mt-auto flex items-center">
                        <button type="button" className='cursor-pointer w-48.75 flex mx-2 rounded-full h-8 items-center justify-center bg-white shadow'>
                            <span className='text-[13px] text-gray-500'>بله، حذف شود</span>
                        </button>
                        <button onClick={() => setDeleteModal(false)} type="button" className='cursor-pointer w-48.75 flex mx-2 rounded-full h-8 items-center justify-center border border-gray-200'>
                            <span className='text-[13px] text-gray-500'>خیر، حذف نشود</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Bookmark;