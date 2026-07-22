"use client"
import Link from 'next/link'
import { Swiper, SwiperSlide, } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const PlacesOfInterest = () => {
    const placesOfInterestList = [
        {
            id: 1,
            title: "قله دماوند؛ آشنایی با جغرافیای طبیعی و ارزش ملی بلندترین کوه ایران",
            image: "/images/popular01.jpg",
            link: "#"
        },
        {
            id: 2,
            title: "جاهای دیدنی دزفول؛ جاذبه‌هایی که شما را افسون می‌کند!",
            image: "/images/popular02.png",
            link: "#"
        },
        {
            id: 3,
            title: "جاهای دیدنی رودسر؛ از ییلاق رویایی تا ساحل بکر که نباید از دست بدهید",
            image: "/images/popular03.jpg",
            link: "#"
        },
        {
            id: 4,
            title: "جاهای دیدنی گرگان؛ راهنمای گم شدن میان طبیعت و تاریخ",
            image: "/images/popular04.png",
            link: "#"
        },
        {
            id: 5,
            title: "جاهای دیدنی اردبیل؛ با این لیست جاذبه‌ها را کشف کنید!",
            image: "/images/popular05.jpg",
            link: "#"
        },
        {
            id: 6,
            title: "جاهای دیدنی نور؛ از جنگل‌های هیرکانی تا ساحل خزر در سفری رویایی",
            image: "/images/popular06.png",
            link: "#"
        },
    ];

    return (
        <div className='w-full pt-8 pb-2 px-8 container'>
            <div className="flex items-center">
                <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                <h4 className="font-IRANYekan-Bold">محبوب‌ترین جاهای دیدنی</h4>
            </div>
            <div className="mt-10 relative">
                <div className="mx-0 lg:mx-8">
                    <Swiper
                        className='mySwiper'
                        spaceBetween={10}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".popular-next-btn",
                            prevEl: ".popular-prev-btn"
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
                                slidesPerView: 3
                            },
                            1400: {
                                slidesPerView: 4
                            }
                        }}
                    >
                        {
                            placesOfInterestList.map((placesOfInterest) => (
                                <SwiperSlide key={placesOfInterest.id}>
                                    <div className={`h-52 px-4 rounded-md relative overflow-hidden bg-no-repeat bg-cover`}
                                        style={{ backgroundImage: `url(${placesOfInterest.image})` }}
                                    >
                                        <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent'></div>
                                        <div className="flex flex-col items-center justify-between h-[inherit] relative">
                                            <Link href="#" className='text-white font-IRANYekan-Bold pt-15 block'>
                                                {placesOfInterest.title}
                                            </Link>
                                            <div className="flex items-center justify-between pb-4 w-full">
                                                <div className="flex items-center gap-x-2">
                                                    <svg width="12" height="12" className='fill-white' viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H157l19.52,19.51a12,12,0,0,1-17,17l-40-40A12,12,0,0,1,128,116h56A12,12,0,0,1,196,128Z"></path></svg>
                                                    <span className='text-[13px] text-white'>مطالعه 16</span>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <svg width="12" height="12" fill="var(--white)" viewBox="0 0 256 256" className="[&amp;&gt;*]:stroke-white fill-white"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                                                    <span className='text-[13px] text-white'>11 روز قبل</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <button type="button" className='cursor-pointer absolute right-0 top-0 h-full popular-next-btn hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
                </button>
                <button type="button" className='cursor-pointer absolute left-0 top-0 h-full popular-prev-btn hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                </button>
            </div>
        </div>
    )
}

export default PlacesOfInterest;