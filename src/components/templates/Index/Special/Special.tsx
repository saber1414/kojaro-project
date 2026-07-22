"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import MosViewed from '@/components/modules/Special/MosViewed';

const Special = () => {
  const [tab, setTab] = useState<string>("mosViewed");

  return (
    <div className='w-full pt-8 pb-2 px-8 container'>
      <div className="flex items-center">
        <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
        <h4 className="font-IRANYekan-Bold">بهترین مطالب کجارو</h4>
      </div>
      <div className="mt-10 relative">
        <div className="mx-0 lg:mx-8">
          <Swiper
            className='mySwiper'
            modules={[Navigation]}
            navigation={{
              nextEl: ".special-nextBtn",
              prevEl: ".special-prevBtn",
              disabledClass: "swiper-button-disabled"
            }}
            spaceBetween={10}
            slidesPerView={3}
          >
            <SwiperSlide>
              <button
                type='button'
                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "mosViewed" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                onClick={() => setTab("mosViewed")}
              >
                <span className='text-[12px] sm:text-[14px] flex items-center justify-center'>پربازدیدترین</span>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type='button'
                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "mostDiscussed" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                onClick={() => setTab("mostDiscussed")}
              >
                <span className='text-[12px] sm:text-[14px] flex items-center justify-center'>پربحت ترین</span>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type='button'
                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "mostPopular" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                onClick={() => setTab("mostPopular")}
              >
                <span className='text-[12px] sm:text-[14px] flex items-center justify-center'>محبوب ترین</span>
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
        <button type="button" className='cursor-pointer special-prevBtn absolute right-0 top-0 h-full latest-prev-btn hidden lg:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
        </button>
        <button type="button" className='cursor-pointer special-nextBtn absolute left-0 top-0 h-full latest-next-btn hidden lg:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
        </button>
      </div>
      {/* tab */}
      {
        tab === "mosViewed" && <MosViewed />
      }
    </div>
  )
}

export default Special