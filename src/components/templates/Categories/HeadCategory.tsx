'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Bookmark from '../Article/Bookmark';


const HeadCategory = () => {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  useEffect(() => {
    if (isBookmark) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => { document.body.style.overflow = "auto" }
  }, [isBookmark]);

  return (
    <>
      <div className='w-full h-137.5 bg-dark lg:flex gap-x-2 hidden'>
        <div className="w-[40%] bg-[url('/images/headCategory.jpg')] inset-0 bg-cover bg-center bg-no-repeat relative">
          <Link href="#" className='absolute right-2.5 top-[20%]'>
            <h3 className="text-2xl font-IRANYekan-Bold text-white">مضحک ترین جنگ تاریخ در کجا اتفاق افتاد؟</h3>
            <span className='bg-blueMenu w-41.25 h-9.5 rounded-full mt-5 flex items-center justify-center gap-x-2 text-[13px] font-IRANYekan-Bold text-white'>
              مشاهده ادامه مطلب
            </span>
          </Link>
        </div>
        <div className="w-[60%] flex items-center justify-around gap-x-2 ml-2">
          <div className="w-78 h-76">
            <img src="/images/image21.jpg" className='' alt="img" />
            <div className='h-23.75 flex justify-between flex-col'>
              <Link href="#" className='text-white py-4 block'>
                حقایقی جالب در مورد استانبول
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                  <span className='text-white text-[13px]'>18 فروردین</span>
                </div>
                <button onClick={() => setIsBookmark(true)} type="button" className='flex items-center gap-x-2 cursor-pointer'>
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                  <span className='text-white text-[13px]'>بوکمارک</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-78 h-76">
            <img src="/images/image02.jpg" className='' alt="img" />
            <div className="h-23.75 flex justify-between flex-col">
              <Link href="#" className='text-white py-4 block'>
                با آداب استراحت مردم ژاپن در محل کار بیشتر آشنا شوید
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                  <span className='text-white text-[13px]'>18 فروردین</span>
                </div>
                <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                  <span className='text-white text-[13px]'>بوکمارک</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-78 h-76">
            <img src="/images/image04.jpg" className='' alt="img" />
            <div className="h-23.75 flex justify-between flex-col">
              <Link href="#" className='text-white py-4 block'>
                خانه مینیاتوری سلطنتی؛ محل بازی دوران کودکی ملکه الیزابت
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                  <span className='text-white text-[13px]'>18 فروردین</span>
                </div>
                <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                  <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                  <span className='text-white text-[13px]'>بوکمارک</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className='block lg:hidden'>
        <div className="bg-[url('/images/headCategory.jpg')] inset-0 bg-cover bg-center bg-no-repeat relative w-full">
          <Link href="#" className='relative'>
            <img src="/images/headCategory.jpg" alt="img" />
            <span className='absolute block md:top-[80%] sm:top-[80%] top-[60%] right-[10%] font-IRANYekan-Bold md:text-[30px] sm:text-[20px] text-[20px] text-white'>مضحک ترین جنگ تاریخ در کجا اتفاق افتاد؟</span>
          </Link>
          <div className="h-100 bg-black">
            <div className="px-4 py-1">
              <Link href="#" className="mb-5 mt-5 block">
                <div className="flex justify-between">
                  <span className='text-white'>حقایقی جالب در مورد استانبول</span>
                  <img src="/images/image02.jpg" className='w-26 h-26 rounded-lg ' alt="" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className='text-white text-[14px]'>18 فروردین</span>
                  <button type='button' className='text-white flex items-center gap-x-2'>
                    <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-white text-[14px]'>بوکمارک</span>
                  </button>
                </div>
              </Link>
              <span className='block w-full h-px bg-white'></span>
              <Link href="#" className="mb-5 mt-5 block">
                <div className="flex justify-between">
                  <span className='text-white'>با آداب استراحت مردم ژاپن در محل کار بیشتر آشنا شوید</span>
                  <img src="/images/image04.jpg" className='w-26 h-26 rounded-lg ' alt="" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className='text-white text-[14px]'>18 فروردین</span>
                  <button type='button' className='text-white flex items-center gap-x-2'>
                    <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-white text-[14px]'>بوکمارک</span>
                  </button>
                </div>
              </Link>
              <span className='block w-full h-px bg-white'></span>
            </div>
          </div>
        </div>
      </div>
      {/* show bookmark */}
      {
        isBookmark && (
          <Bookmark
            onCancel={() => setIsBookmark(false)}
          />
        )
      }
      <div onClick={() => setIsBookmark(false)} className={`fixed bg-overview top-0 right-0 left-0 bottom-0 z-30 ${isBookmark ? "block" : "hidden"}`}></div>
    </>
  )
};

export default HeadCategory;