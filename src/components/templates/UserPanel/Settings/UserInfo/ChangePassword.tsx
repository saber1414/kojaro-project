import Link from 'next/link'
import React from 'react'

const ChangePassword = () => {
    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="bg-white shadow shadow-gray-200 p-4 rounded-sm">
                    <div className="flex items-center">
                        <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                        <h4 className="font-IRANYekan-Bold md:text-[18px]">گذرواژه</h4>
                    </div>
                    <div className="mt-10 flex items-center gap-x-47">
                        <span className='text-[14px] font-IRANYekan-Light'>گذرواژه</span>
                        <p className="font-IRANYekan-Bold text-[14px]">تا به حال رمز عبور تغییر نکرده است</p>
                    </div>
                    <span className='block bg-dark w-full h-px my-6'></span>
                    <Link href="#" className='h-7.5 bg-dark2 text-white rounded-full w-55 px-4 flex items-center gap-x-2'>
                        <span className='text-[13px]'>تغییر گذرواژه در حساب کجارو</span>
                        <svg  width="12" height="12" viewBox="0 0 256 256" className="fill-blueMenu"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;