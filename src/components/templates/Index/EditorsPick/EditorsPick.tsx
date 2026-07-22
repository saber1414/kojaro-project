"use client"
import Link from 'next/link'
import { Swiper, SwiperSlide, } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const EditorsPick = () => {
  return (
    <div className='w-full pt-8 pb-2 px-8 container'>
      <div className="flex items-center">
        <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
        <h4 className="font-IRANYekan-Bold">پیشنهاد سردبیر</h4>
      </div>
      <div className="mt-10 relative">
        <div className="mx-0 lg:mx-8">
          <Swiper
            className='mySwiper'
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn"
            }}
            loop={true}
            breakpoints={{
              300: {
                slidesPerView: 1
              },
              576: {
                slidesPerView: 2
              },
              768: {
                slidesPerView: 3
              },
              992: {
                slidesPerView: 3
              },
              1200: {
                slidesPerView: 4
              },
              1400: {
                slidesPerView: 4
              }
            }}
          >
            <SwiperSlide>
              <div>
                <Link href="/">
                  <img src="/images/01.webp" alt="img" className='rounded-sm w-full' />
                </Link>
                <Link href="/" className='mt-4 block font-IRANYekan-Bold'>
                  شاهکارهای عکاسی حیات‌وحش ۲۰۲۶؛ روایت طبیعت در زیباترین قاب‌ها
                </Link>
                <div className="mt-5 flex items-center gap-x-4">
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>1</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                  </div>
                  <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link href="/">
                  <img src="/images/02.webp" alt="img" className='rounded-sm w-full' />
                </Link>
                <Link href="/" className='mt-4 block font-IRANYekan-Bold'>
                  شاهکارهای عکاسی حیات‌وحش ۲۰۲۶؛ روایت طبیعت در زیباترین قاب‌ها
                </Link>
                <div className="mt-5 flex items-center gap-x-4">
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>1</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                  </div>
                  <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link href="/">
                  <img src="/images/03.webp" alt="img" className='rounded-sm w-full' />
                </Link>
                <Link href="/" className='mt-4 block font-IRANYekan-Bold'>
                  شاهکارهای عکاسی حیات‌وحش ۲۰۲۶؛ روایت طبیعت در زیباترین قاب‌ها
                </Link>
                <div className="mt-5 flex items-center gap-x-4">
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>1</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                  </div>
                  <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link href="/">
                  <img src="/images/04.webp" alt="img" className='rounded-sm w-full' />
                </Link>
                <Link href="/" className='mt-4 block font-IRANYekan-Bold'>
                  شاهکارهای عکاسی حیات‌وحش ۲۰۲۶؛ روایت طبیعت در زیباترین قاب‌ها
                </Link>
                <div className="mt-5 flex items-center gap-x-4">
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>1</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                  </div>
                  <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link href="/">
                  <img src="/images/05.webp" alt="img" className='rounded-sm w-full' />
                </Link>
                <Link href="/" className='mt-4 block font-IRANYekan-Bold'>
                  شاهکارهای عکاسی حیات‌وحش ۲۰۲۶؛ روایت طبیعت در زیباترین قاب‌ها
                </Link>
                <div className="mt-5 flex items-center gap-x-4">
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>1</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                  </div>
                  <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <button type="button" className='cursor-pointer absolute right-0 top-0 h-full next-btn hidden lg:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
        </button>
        <button type="button" className='cursor-pointer absolute left-0 top-0 h-full prev-btn hidden lg:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default EditorsPick;