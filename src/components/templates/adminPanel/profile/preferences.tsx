import React from 'react'

const Preferences = () => {
    return (
        <div className="mt-10">
            <form>
                <div className="flex items-center gap-x-4">
                    <div className="flex gap-y-2 flex-col">
                        <label className='text-[13px] mt-3'>کشور</label>
                        <input type="text" className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='کشور' />
                    </div>
                    <div className="flex gap-y-2 flex-col">
                        <label className='text-[13px] mt-3'>منطقه زمانی</label>
                        <input type="text" dir='ltr' className='text-[14px] border border-gray-200 placeholder:text-[13px] pl-2 w-160 h-10 rounded-lg' placeholder='(GMT-12:00) International Date Line West' />
                    </div>
                </div>
                <h3 className='mt-5'>اعلان ها</h3>
                <div className="mt-4">
                    <div className="flex items-center gap-x-4 mb-5">
                        <div className="switch-wrapper">
                            <input className="tgl tgl-light" dir='ltr' id="switch-basic-2" type="checkbox" />
                            <label className="tgl-btn" dir='ltr' htmlFor="switch-basic-2" />
                        </div>
                        <span className='text-[13px] font-IRANYekan-Bold'>من ارز دیجیتال ارسال یا دریافت می‌کنم.</span>
                    </div>
                    <div className="flex items-center gap-x-4 mt-5">
                        <div className="switch-wrapper">
                            <input className="tgl tgl-light" dir='ltr' id="switch-basic-3" type="checkbox" />
                            <label className="tgl-btn" dir='ltr' htmlFor="switch-basic-3" />
                        </div>
                        <span className='text-[13px] font-IRANYekan-Bold'>سفارش فروشنده را دریافت می‌کنم.</span>
                    </div>
                    <div className="flex items-center gap-x-4 mt-5">
                        <div className="switch-wrapper">
                            <input className="tgl tgl-light" dir='ltr' id="switch-basic-4" type="checkbox" />
                            <label className="tgl-btn" dir='ltr' htmlFor="switch-basic-4" />
                        </div>
                        <span className='text-[13px] font-IRANYekan-Bold'>توصیه‌هایی برای حساب کاربری من وجود دارد.</span>
                    </div>
                </div>
                <div className="w-full mt-5 flex justify-end">
                    <button type="submit" className='text-white text-[13px] w-30 h-10 rounded-lg bg-blueMenu cursor-pointer'>ذخیره</button>
                </div>
            </form>
        </div>
    )
}

export default Preferences