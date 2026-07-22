"use client"
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const SliderBanner = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const swiperInstance = useRef<any>(null);
  const isTransitioning = useRef<boolean>(false);

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

  const startProgress = () => {
    if (isTransitioning.current) return;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    };
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current!);
          return 100;
        }
        return prev + 2;
      });
    }, 600);
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    startProgress()
  };

  const goToSlide = (index: number) => {
    if (!swiperInstance.current) return;
    if (index === activeIndex) return;
    isTransitioning.current = true;
    swiperInstance.current.slideTo(index);

    setTimeout(() => {
      isTransitioning.current = false;
      startProgress()
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startProgress()
    }, 100);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      clearTimeout(timer)
    }
  }, []);

  return (
    <section className='w-full h-165 relative overflow-hidden hidden lg:block'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg scale-105 transition-all duration-1000 ease-in-out'
        style={{ backgroundImage: `url(${slides[activeIndex].image})` }}
      ></div>
      <div className='absolute inset-0 bg-linear-to-b from-black/12 via-transparent to-black/20 z-0'></div>
      <div className='relative z-10 container px-4 h-full'>
        <Swiper
          onSwiper={(swiper) => { 
            swiperInstance.current = swiper;
          }}
          modules={[Autoplay, EffectFade]}
          autoplay={{ 
            delay: 30000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          speed={800}
          loop={true}
          onSlideChange={handleSlideChange}
          onSlideChangeTransitionStart={() => {
            isTransitioning.current = true;
          }}
          onSlideChangeTransitionEnd={() => {
            isTransitioning.current = false;
            startProgress();
          }}
        >
          {
            slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex items-center gap-x-6 px-4 mx-auto mt-30">
                  <Link href={slide.link}>
                    <img src={slide.image} alt={slide.title} className='rounded-sm' />
                  </Link>
                  <div className="flex flex-col gap-y-4">
                    <Link href={slide.link}>
                      <span className='text-3xl text-white font-IRANYekan-Bold leading-normal'>{slide.title}</span>
                    </Link>
                    <Link href={slide.link} className='flex items-center justify-center gap-x-4 font-IRANYekan-Bold bg-blueMenu text-white h-9.5 w-41.25 rounded-lg'>
                      <span className='text-[13px]'>مشاهده ادامه مطلب</span>
                      <svg width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256" className="fill-white"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="mt-8 pr-3 pb-8 relative z-30">
          <div className="flex gap-x-6 md:gap-x-8">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-1 flex flex-col gap-y-3 cursor-pointer group transition-all ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                >
                  <span className={`text-[14px] font-IRANYekan-Bold transition-colors truncate ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}>
                    {slide.title}
                  </span>

                  <div className="h-1 bg-gray-400/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                      style={{
                        width: isActive ? `${progress}%` : '0%',
                        transitionDuration: '100ms'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SliderBanner;