import React from 'react'

const SecurityProfile = () => {
  return (
    <div className='mt-10'>
      <form>
        <h3>احراز هویت دوعاملی</h3>
        <div className="flex items-center gap-x-4 mb-5 mt-5">
          <div className="switch-wrapper">
            <input className="tgl tgl-light" dir='ltr' id="switch-basic-2" type="checkbox" />
            <label className="tgl-btn" dir='ltr' htmlFor="switch-basic-2" />
          </div>
          <span className='text-[13px] font-IRANYekan-Bold'>فعال یا غیرفعال کردن احراز هویت دو مرحله‌ای</span>
        </div>
        <h3 className='mb-5'>تغییر رمز عبور</h3>
        <div className="flex gap-y-2 flex-col">
          <label className='text-[13px] mt-3'>رمز عبور فعلی</label>
          <div className="border border-gray-200 w-160 h-10 rounded-lg flex items-center gap-x-4">
            <input type="text" className='text-[14px] bg-transparent w-[inherit] h-[inherit] placeholder:text-[13px] pr-2 rounded-lg' placeholder='رمز عبور فعلی' />
            <button className='cursor-pointer ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-eye-slash'
                viewBox='0 0 16 16'
              >
                <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z'></path>
                <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829'></path>
                <path d='M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z'></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-y-2 flex-col">
          <label className='text-[13px] mt-3'>رمز عبور جدید</label>
          <div className="border border-gray-200 w-160 h-10 rounded-lg flex items-center gap-x-4">
            <input type="text" className='text-[14px] bg-transparent w-[inherit] h-[inherit] placeholder:text-[13px] pr-2 rounded-lg' placeholder='رمز عبور جدید' />
            <button className='cursor-pointer ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-eye-slash'
                viewBox='0 0 16 16'
              >
                <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z'></path>
                <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829'></path>
                <path d='M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z'></path>
              </svg>
            </button>
          </div>
        </div>
                        <div className="w-full mt-5 flex justify-end">
                    <button type="submit" className='text-white text-[13px] w-30 h-10 rounded-lg bg-blueMenu cursor-pointer'>ذخیره</button>
                </div>
      </form>
    </div>
  )
}

export default SecurityProfile