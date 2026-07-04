"use client"
import Link from 'next/link';
import React from 'react'

const SliderBanner = () => {
  return (
    <section className='w-full h-165 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[url("/images/banner1.webp")] bg-cover bg-center bg-no-repeat blur-lg scale-105'></div>
      <div className='absolute inset-0 bg-linear-to-b from-black/12 via-transparent to-black/20 z-0'></div>
      <div className='relative z-10 container px-4 h-full'>
        <div className="flex items-center gap-x-6 px-4 mx-auto mt-35">
          <Link href="/">
            <img src="/images/banner1.webp" alt="banner img" className='rounded-sm' />
          </Link>
          <div className="flex flex-col gap-y-4">
            <Link href="/">
              <span className='text-5xl text-white font-IRANYekan-Bold leading-normal'>زیباترین و بهترین ییلاقات مازندران را بشناسید</span>
            </Link>
            <Link href="/" className='flex items-center justify-center gap-x-4 font-IRANYekan-Bold bg-blueMenu text-white h-9.5 w-41.25 rounded-lg'>
              <span className='text-[13px]'>مشاهده ادامه مطلب</span>
              <svg width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256" className="fill-white"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
            </Link>
          </div>
        </div>
        <div className="mt-8 pr-3">
          <div className="flex gap-x-8">
            <div className="flex flex-col gap-y-8 basis-[25%]">
              <span className='text-[17px] text-white font-IRANYekan-Bold'>زیباترین و بهترین ییلاقات مازندران را بشناسید</span>
              <span className='block h-1 bg-gray-5 rounded-full'>
                <small className='block w-[50%] bg-white h-full rounded-full'></small>
              </span>
            </div>
            <div className="flex flex-col gap-y-8 basis-[25%]">
              <span className='text-[17px] text-white font-IRANYekan-Bold'>زیباترین و بهترین ییلاقات مازندران را بشناسید</span>
              <span className='block h-1 bg-gray-5 rounded-full'>
                <small className='block h-full rounded-full'></small>
              </span>
            </div>
            <div className="flex flex-col gap-y-8 basis-[25%]">
              <span className='text-[17px] text-white font-IRANYekan-Bold'>زیباترین و بهترین ییلاقات مازندران را بشناسید</span>
              <span className='block h-1 bg-gray-5 rounded-full'>
                <small className='block h-full rounded-full'></small>
              </span>
            </div>
            <div className="flex flex-col gap-y-8 basis-[25%]">
              <span className='text-[17px] text-white font-IRANYekan-Bold'>زیباترین و بهترین ییلاقات مازندران را بشناسید</span>
              <span className='block h-1 bg-gray-5 rounded-full'>
                <small className='block h-full rounded-full'></small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SliderBanner;