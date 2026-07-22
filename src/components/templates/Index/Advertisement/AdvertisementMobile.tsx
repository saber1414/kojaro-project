"use client"
import Link from 'next/link';
import { useState } from 'react'

const AdvertisementMobile = () => {
  const [close, setClose] = useState<boolean>(true);
  const [closeBtn, setCloseBtn] = useState<boolean>(true);

  const closeAdvertisementHandle = () => {
    setClose(false)
  };

  const closeAdvertisementBtnHandle = () => {
    setCloseBtn(false);
  };

  return (
    <>
      <div className={`${close ? "block" : "hidden"} container w-full pt-8 pb-2 px-8`}>
        <div className="flex items-center gap-x-2">
          <button type="button" onClick={closeAdvertisementHandle} className='cursor-pointer'>
            <svg width="16" height="16" className='fill-gray-500' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
          </button>
          <span className='text-[13px] text-gray-500'>تبلیغات</span>
          <span className='block h-px w-full bg-gray-200'></span>
        </div>
        <div className="flex items-center gap-x-4 mt-2">
          <Link href="#" className='w-full'>
            <img src="/images/advertisement01.gif" className='w-[inherit] rounded-md' alt="Advertisement img" />
          </Link>
        </div>
      </div>
      <div className={`fixed bottom-0 right-0 left-0 z-10 ${closeBtn ? "block" : "hidden"}`}>
        <button onClick={closeAdvertisementBtnHandle} type="button" className='cursor-pointer absolute w-6 h-6 bg-gray-500'>
          <span>x</span>
        </button>
        <Link href="#" className='w-full'>
            <img src="/images/advertisement02.jpg" className='w-[inherit] h-25 object-cover rounded-md' alt="Advertisement img" />
          </Link>
      </div>
    </>
  )
}

export default AdvertisementMobile