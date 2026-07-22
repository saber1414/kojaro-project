"use client"
import Latest from '@/components/modules/SlideSections/Latest';
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css"

const LatestPosts = () => {
    const [tab, setTab] = useState("latest");

    return (
        <>
            <div className="flex items-center">
                <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                <h4 className="font-IRANYekan-Bold">آخرین مطالب</h4>
            </div>
            {/* filters tab */}
            <div className="mt-10 relative">
                <div className="mx-0 lg:mx-8">
                    <Swiper
                        className='mySwiper'
                        spaceBetween={10}
                        slidesPerView={5}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".lates-nextBtn",
                            prevEl: ".lates-prevBtn",
                            disabledClass: "swiper-button-disabled"
                        }}
                        breakpoints={{
                            300: {
                                slidesPerView: 2
                            },
                            576: {
                                slidesPerView: 4
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
                                slidesPerView: 5
                            },
                        }}
                    >
                        <SwiperSlide>
                            <button
                                type='button'
                                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "latest" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                onClick={() => setTab("latest")}
                            >
                                <span className='text-[14px] flex items-center justify-center'>جدیدترین</span>
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button
                                type='button'
                                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "hot" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                onClick={() => setTab("hot")}
                            >
                                <span className='text-[14px] flex items-center justify-center'>داغ🔥</span>
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button
                                type='button'
                                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "theater" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                onClick={() => setTab("theater")}
                            >
                                <span className='text-[14px] flex items-center justify-center'>تماشاخانه 📸</span>
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button
                                type='button'
                                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "travel guide" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                onClick={() => setTab("travel guide")}
                            >
                                <span className='text-[14px] flex items-center justify-center'>راهنمای سفر ✈️</span>
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button
                                type='button'
                                className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "excursion" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                onClick={() => setTab("excursion")}
                            >
                                <span className='text-[14px] flex items-center justify-center'>گردش ⛺️</span>
                            </button>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <button type="button" className='cursor-pointer lates-prevBtn absolute right-0 top-0 h-full latest-prev-btn hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
                </button>
                <button type="button" className='cursor-pointer lates-nextBtn absolute left-0 top-0 h-full latest-next-btn hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                </button>
            </div>
            {/* article box */}
            {
                tab === "latest" && (
                    <Latest />
                )
            }
        </>
    )
}

export default LatestPosts;