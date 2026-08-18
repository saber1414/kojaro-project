import React from 'react'

type LogoutProps = {
    onCancel: () => void
}

const Logout = ({onCancel}:LogoutProps) => {
    return (
        <>
            <div onClick={onCancel} className="fixed z-50 right-0 left-0 top-0 bottom-0 bg-overview">
                <div className="bg-white p-4 w-125 h-82 mx-auto my-0 absolute right-0 left-0 top-[30%]">
                    <div className="w-full flex justify-center mt-5">
                        <svg width="98" height="94"><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.294"><path stroke="#E4002B" d="M47.93 39.488H95"></path><path stroke="#7D7D87" d="M56.488 52.432v19.25H32.953"></path><path stroke="#7D7D87" d="m3 3 29.953 19.317V91L3 71.683zh53.488v23.61"></path><path stroke="#E4002B" d="M77.884 22.317 95 39.487 77.884 56.66"></path></g></svg>
                    </div>
                    <div className="flex flex-col gap-y-3 text-center mt-10">
                        <h5 className="font-IRANYekan-Bold">خروج از حساب کاربری</h5>
                        <span className='text-[14px] font-IRANYekan-Light'>آیا می‌خواهید از حساب کاربری خود خارج شوید؟</span>
                    </div>
                    <div onClick={onCancel} className="mt-10 flex items-center justify-center gap-x-2">
                        <button className='h-8 font-IRANYekan-Bold px-4 bg-dark2 text-white text-[13px] cursor-pointer rounded-full' type='button'>بله خارج می‌شوم</button>
                        <button type="button" className='h-8 w-31 font-IRANYekan-Bold px-4 text-[13px] border border-gray-200 rounded-full cursor-pointer'>انصراف</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Logout;