"use client"
import { Swiper, SwiperSlide, } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/modules/VideoPlayer/VideoPlayer';

const KojaroVideos = () => {
    const [showVideo, setShowVideo] = useState<boolean>(false);

    const shortVideos = [
        {
            _id: 1,
            title: "تجربه تماشای فوتبال زنده در آسمان",
            poster: "/images/poster/poster01.webp",
            video: "/videos/video01.mp4"
        },
        {
            _id: 2,
            title: "فرود اضطراری و باورنکردنی هواپیما روی رودخانه",
            poster: "/images/poster/poster02.webp",
            video: "/videos/video02.mp4"
        },
        {
            _id: 3,
            title: "ثبت تصویر کفتار ایرانی در آبیک",
            poster: "/images/poster/poster03.webp",
            video: "/videos/video03.mp4"
        },
        {
            _id: 4,
            title: "آتش‌سوزی مرگبار در مقصد گردشگری",
            poster: "/images/poster/poster04.webp",
            video: "/videos/video04.mp4"
        },
        {
            _id: 5,
            title: "بانجی‌جامپینگ مرگبار در برزیل!",
            poster: "/images/poster/poster05.webp",
            video: "/videos/video05.mp4"
        },
        {
            _id: 6,
            title: "مهمانان ناخوانده‌ای که از پرواز جا ماندند!",
            poster: "/images/poster/poster06.webp",
            video: "/videos/video06.mp4"
        },
        {
            _id: 7,
            title: "حادثه عجیب هواپیمای دریم‌لاینر لوفت‌هانزا!",
            poster: "/images/poster/poster07.webp",
            video: "/videos/video07.mp4"
        },
        {
            _id: 8,
            title: "بازیگوشی فک‌ها با گردشگران!",
            poster: "/images/poster/poster08.webp",
            video: "/videos/video08.mp4"
        },
        {
            _id: 9,
            title: "کشتی پر از گردشگر مقابل دوربین‌ها غرق شد!",
            poster: "/images/poster/poster09.webp",
            video: "/videos/video09.mp4"
        },
        {
            _id: 10,
            title: "شنا در فواره تاریخی برای لایک!",
            poster: "/images/poster/poster10.webp",
            video: "/videos/video10.mp4"
        },
    ];

    const playVideoHandle = () => {
        setShowVideo(true)
    };

    useEffect(() => {
        if (showVideo) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showVideo]);

    return (
        <>
            <div className='w-full pt-8 pb-2 px-8 container'>
                <div className="flex items-center">
                    <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                    <h4 className="font-IRANYekan-Bold">ویدیوهای کجارو 📽️</h4>
                </div>
                <div className="mt-10 relative">
                    <div className="mx-0 lg:mx-8">
                        <Swiper
                            className='mySwiper'
                            spaceBetween={10}
                            slidesPerView={8}
                            loop={true}
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".video-next-btn",
                                prevEl: ".video-prev-btn"
                            }}
                            breakpoints={{
                                300: {
                                    slidesPerView: 2
                                },
                                567: {
                                    slidesPerView: 4
                                },
                                768: {
                                    slidesPerView: 5
                                },
                                992: {
                                    slidesPerView: 6
                                },
                                1200: {
                                    slidesPerView: 7
                                },
                                1400: {
                                    slidesPerView: 8
                                }
                            }}
                        >
                            {
                                shortVideos.map((shortVideo) => (
                                    <SwiperSlide key={shortVideo._id}>
                                        <div onClick={playVideoHandle} className=" h-61.75 rounded-sm block bg-cover bg-no-repeat relative cursor-pointer"
                                            style={{ backgroundImage: `url(${shortVideo.poster})` }}
                                        >
                                            <div className="absolute top-2.5 right-2.5">
                                                <svg viewBox="0 0 16 16" className='fill-white' width="24" height="24"><path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm2.841 8.284-4.333 2.667a.336.336 0 0 1-.337.007.334.334 0 0 1-.171-.291V5.334a.334.334 0 0 1 .508-.284l4.334 2.666a.333.333 0 0 1 0 .568z" fillRule="nonzero"></path></svg>
                                            </div>
                                            <div className="absolute bottom-2.5 right-2.5">
                                                <span className='text-[12px] text-white font-IRANYekan-Bold'>
                                                    {shortVideo.title}
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    <button type="button" className='cursor-pointer absolute right-0 top-0 h-full video-next-btn hidden lg:block'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
                    </button>
                    <button type="button" className='cursor-pointer absolute left-0 top-0 h-full video-prev-btn hidden lg:block'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                    </button>
                </div>
            </div>
            {
                showVideo &&
                <VideoPlayer
                    closeVideo={() => setShowVideo(false)}
                    shortVideo={shortVideos}
                />
            }
        </>
    )
}

export default KojaroVideos;