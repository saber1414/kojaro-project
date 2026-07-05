"use client"
import Link from 'next/link';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const SliderBannerMobile = () => {
    const slides = [
        {
            id: 1,
            title: "زیباترین و بهترین ییلاقات مازندران را بشناسید",
            image: "/images/banner1.webp",
            link: "/mazandaran"
        },
        {
            id: 2,
            title: "مسابقه بزرگ پیش‌بینی جام جهانی 2026 با جایزه ۳۵۰ میلیون تومانی",
            image: "/images/banner2.webp",
            link: "/north-iran"
        },
        {
            id: 3,
            title: "بهترین برند چمدان مسافرتی؛‌ ۱۵ مارک مناسب و بادوام برای سفر",
            image: "/images/banner3.webp",
            link: "/gilan"
        },
        {
            id: 4,
            title: "سفر مجازی به ورزشگاه‌های جام جهانی ۲۰۲۶؛ پیش از شروع رقابت‌ها، استادیوم‌ها را ببینید",
            image: "/images/banner4.webp",
            link: "/kish"
        }
    ];


    return (
        <div className='block lg:hidden mt-5 mx-4'>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                slidesPerView={3}
                spaceBetween={10}
                breakpoints={{
                    300: {
                        slidesPerView: 1
                    },
                    465: {
                        slidesPerView: 1,
                        spaceBetween: 5
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    700: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }}
            >
                {
                    slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Link
                                href="#"
                                className='h-60 bg-cover bg-center bg-no-repeat relative block rounded-sm'
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.12), transparent 40%, transparent 60%, rgba(0,0,0,0.2)), url(${slide.image})`
                                }}
                            >
                                <p className='text-white absolute bottom-4 left-4 right-4 z-10 text-center font-IRANYekan-Bold'>
                                    {slide.title}
                                </p>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default SliderBannerMobile;