"use client"
import Profile from '@/components/modules/UserPandel/Profile'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import { useState } from 'react';
import Bookmark from '../../Article/Bookmark';
import Link from 'next/link';
import EmptyBookmarks from '@/components/modules/UserPandel/EmptyBookmarks';

const BookmarksTopics = () => {
    const [tab, setTab] = useState("");
    const [isBookmark, setIsBookmark] = useState<boolean>(false);

    return (
        <>
            <Profile
                title='بوکمارک مطالب'
                description='در این صفحه می‌توانید مطالبی را که بوکمارک کرده‌اید ببینید و لیست‌های خود را مدیریت کنید'
            />
            {/* topic list */}
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="block bg-blueMenu w-1 h-6 ml-4"></span>
                        <h4 className="font-IRANYekan-Bold md:text-[18px]">فهرست و مطالب بوک‌مارک شده</h4>
                    </div>
                    <button onClick={() => setIsBookmark(true)} type="button" className='cursor-pointer flex items-center gap-x-2'>
                        <svg width="16" height="16" viewBox="0 0 256 256"><path d="M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"></path></svg>
                        <span className='text-[13px]'>ویرایش دسته‌بندی‌ها</span>
                    </button>
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
                            slidesPerView={10}
                        >
                            <SwiperSlide>
                                <button
                                    type='button'
                                    className={`w-full h-8 rounded-full border border-gray-200 cursor-pointer ${tab === "" ? "bg-dark2 text-white" : "text-dark bg-white"}`}
                                    onClick={() => setTab("")}
                                >
                                    <span className='text-[12px] sm:text-[14px] flex items-center justify-center'>نام لیست</span>
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <button type="button" className='cursor-pointer special-prevBtn absolute right-0 top-0 h-full latest-prev-btn hidden lg:block'>
                        <svg width="16" height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
                    </button>
                    <button type="button" className='cursor-pointer special-nextBtn absolute left-0 top-0 h-full latest-next-btn hidden lg:block'>
                        <svg width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                    </button>
                </div>
                <div className="w-full bg-white shadow shadow-gray-200 rounded-sm p-4 mt-5">
                    <Link href="#" className='flex gap-x-4 mb-4 mt-2'>
                        <img src="/images/image05.jpg" alt="img" className='w-46.5 h-31 rounded-sm' />
                        <div className="flex flex-col justify-between">
                            <div>
                                <span className='font-IRANYekan-Bold'>خانه موزه آبی فریدا کالو؛ خانه‌ای که به موزه‌ای تماشایی تبدیل شد</span>
                                <p className='py-2 text-[14px] text-gray-400'>
                                    خانه موزه آبی محل تولد، زندگی و مرگ نقاش مشهور مکزیکی، فریدا کالو بوده و یکی از جاذبه‌هایی به شمار می‌رود که تمام گردشگران مکزیک از آن بازدید ...
                                </p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <svg width="12" height="12" viewBox="0 0 256 256" strokeWidth="1.6"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                                <div className='flex items-center gap-x-2'>
                                    <svg width="12" height="12" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                                    <span className='text-[12px]'>1 روز قبل</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="#" className='flex gap-x-4 mb-4 mt-2'>
                        <img src="/images/image07.jpg" alt="img" className='w-46.5 h-31 rounded-sm' />
                        <div className="flex flex-col justify-between">
                            <div>
                                <span className='font-IRANYekan-Bold'>خانه موزه آبی فریدا کالو؛ خانه‌ای که به موزه‌ای تماشایی تبدیل شد</span>
                                <p className='py-2 text-[14px] text-gray-400'>
                                    خانه موزه آبی محل تولد، زندگی و مرگ نقاش مشهور مکزیکی، فریدا کالو بوده و یکی از جاذبه‌هایی به شمار می‌رود که تمام گردشگران مکزیک از آن بازدید ...
                                </p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <svg width="12" height="12" viewBox="0 0 256 256" strokeWidth="1.6"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                                <div className='flex items-center gap-x-2'>
                                    <svg width="12" height="12" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                                    <span className='text-[12px]'>1 روز قبل</span>
                                </div>
                            </div>
                        </div>
                    </Link>
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
}

export default BookmarksTopics;