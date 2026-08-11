import React, { useEffect, useState } from 'react'

const ProlificWriters = () => {
    const [favoriteAuthor, setFavoriteAuthor] = useState<boolean>(false);

    useEffect(() => {
        if(favoriteAuthor) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        };

        return () => { document.body.style.overflow = "auto" }
    }, [favoriteAuthor]);

    return (
        <>
            <div className="mt-10">
                <div className="flex items-center">
                    <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                    <h4 className="font-IRANYekan-Bold md:text-[18px]">پرکارترین نویسنده‌ها</h4>
                </div>
                <p className="py-4 text-gray-600 md:text-[16px] text-[14px]">نویسندگان خفنی در کجارو وجود دارند که می‌تونید دنبال کنید</p>
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span>بنفشه کمالی</span>
                        <button type="button" className='cursor-pointer bg-dark text-white text-[13px] font-IRANYekan-Bold w-25 h-8 rounded-full'>دنبال کردن</button>
                    </div>
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span>تیم کجارو</span>
                        <button type="button" className='cursor-pointer bg-dark text-white text-[13px] font-IRANYekan-Bold w-25 h-8 rounded-full'>دنبال کردن</button>
                    </div>
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span>احسان رستمی‌پور</span>
                        <button type="button" className='cursor-pointer bg-dark text-white text-[13px] font-IRANYekan-Bold w-25 h-8 rounded-full'>دنبال کردن</button>
                    </div>
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span>فاطمه ساعدی</span>
                        <button type="button" className='cursor-pointer bg-dark text-white text-[13px] font-IRANYekan-Bold w-25 h-8 rounded-full'>دنبال کردن</button>
                    </div>
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span>تحریریه کجارو</span>
                        <button type="button" className='cursor-pointer bg-dark text-white text-[13px] font-IRANYekan-Bold w-25 h-8 rounded-full'>دنبال کردن</button>
                    </div>
                    <div className="bg-white lg:w-106 w-full h-16 shadow shadow-gray-300 p-4 flex items-center justify-between">
                        <span className='text-blueMenu'>نویسنده مورد علاقت رو جستجو کن</span>
                        <button onClick={() => setFavoriteAuthor(true)} type="button" className="cursor-pointer text-dark text-[13px] border border-dark font-IRANYekan-Bold w-25 h-8 rounded-full flex items-center justify-around"><span>جستوجو</span><svg width="12" height="12" viewBox="0 0 256 256" className="mr-2 fill-blueMenu"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg></button>
                    </div>
                </div>
            </div>
            {/* Favorite author */}
            <div className={`fixed right-0 left-0 sm:top-[30%] top-0 bg-white sm:w-125 w-full sm:h-117.25 h-full mx-auto my-0 rounded-sm flex flex-col z-40 ${favoriteAuthor ? "block" : "hidden"}`}>
                <div className="flex items-center justify-between gap-x-4">
                    <div className='flex items-center gap-x-2'>
                        <span className='block bg-blueMenu w-1 h-6 mt-2'></span>
                        <span className='font-IRANYekan-Bold pt-2'>دنبال کردن نویسنده‌‌ها</span>
                    </div>
                    <button onClick={() => setFavoriteAuthor(false)} type="button" className='cursor-pointer ml-2 mt-1'>
                        <svg className='fill-gray-500' width="20" height="20" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px bg-gray-200 block my-2'></span>
                <div className="mt-5 px-2">
                    <div className="w-full border border-gray-500 rounded-full h-7.5 flex items-center overflow-hidden">
                        <button type="button" className='cursor-pointer w-6 h-6 rounded-full bg-dark mr-1 flex items-center justify-center'>
                            <svg className='fill-white' width="16" height="16" viewBox="0 0 256 256"><path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path></svg>
                        </button>
                        <input type="text" placeholder='جستوجو در همه نویسنده‌‌ها' className='text-[13px] placeholder:font-IRANYekan-Bold w-full h-full pr-2' />
                    </div>
                </div>
                {/* topics */}
                <div className="sm:h-63 h-[90%] mx-3 mt-5 overflow-y-scroll">
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>نیلوفر آهنگران</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>بنفشه کمالی</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>تیم کجارو</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>احسان رستمی‌پور</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>فاطمه ساعدی</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>تحریریه کجارو</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                    <div className="flex items-center justify-between">
                        <span className='text-[14px]'>میثم خلیل زاده</span>
                        <button type="button" className='cursor-pointer ml-2 w-25 h-8 bg-dark text-white flex items-center justify-center rounded-full text-[13px]'>دنبال کردن</button>
                    </div>
                    <span className='block my-2 bg-dark h-px ml-2'></span>
                </div>
                <div className="h-16 bg-gray-100 mt-auto flex items-center">
                    <button onClick={() => setFavoriteAuthor(false)} type="button" className='cursor-pointer w-31 h-8 mr-2 rounded-full border border-gray-300 flex items-center justify-center text-[13px] text-gray-600'>
                        بستن
                    </button>
                </div>
            </div>
            <div onClick={() => setFavoriteAuthor(false)} className={`fixed top-0 right-0 left-0 z-30 bottom-0 bg-overview ${favoriteAuthor ? "block" : "hidden"}`}></div>
        </>
    )
}

export default ProlificWriters;