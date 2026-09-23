"use client"
import { useEffect, useRef, useState } from 'react'

const TopAuthors = () => {
    const [hasOverflow, setHasOverflow] = useState<boolean>(false);
    const authorListRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (authorListRef.current && containerRef.current) {
                const contentHeight = authorListRef.current.scrollHeight;
                const containerHeight = containerRef.current.clientHeight;

                setHasOverflow(contentHeight > containerHeight);
            }
        };

        const timer = setTimeout(checkOverflow, 100);

        window.addEventListener("resize", checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkOverflow);
        };
    }, []);

    return (
        <div className='bg-white w-full md:w-[30%] xl:w-[20%] p-4 rounded-lg shadow-sm'>
            <div className="mb-4">
                <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                    نویسندگان برتر🥇
                </span>
                <p className="text-[13px] font-IRANYekan-Bold text-green-600 pt-2">
                    +10% <small className="font-IRANYekan-Light text-gray-500">خروجی بهتر</small>
                </p>
            </div>
            <div ref={containerRef} className='mt-5 h-68'>
                <div
                    ref={authorListRef}
                    className={`
                        h-full
                        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500
                        transition-all duration-300
                        ${hasOverflow ? "overflow-y-auto" : "overflow-hidden"}
                    `}
                >
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>سمیه کریمی</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                    <span className='block my-1 mr-5.5 w-0.5 h-10 bg-gray-10'></span>
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile01.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>احسان امیری</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                    <span className='block my-1 mr-5.5 w-0.5 h-10 bg-gray-10'></span>
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile02.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>محسن نیکی</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                    <span className='block my-1 mr-5.5 w-0.5 h-10 bg-gray-10'></span>
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>سمیه کریمی</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                    <span className='block my-1 mr-5.5 w-0.5 h-10 bg-gray-10'></span>
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile01.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>احسان امیری</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                    <span className='block my-1 mr-5.5 w-0.5 h-10 bg-gray-10'></span>
                    <div className="flex items-center gap-x-4">
                        <img src="/images/profile02.jpg" alt="author image" className='w-12 rounded-full' />
                        <div className="flex flex-col gap-y-2">
                            <span className='text-[14px] font-IRANYekan-Bold'>محسن نیکی</span>
                            <span className='text-[13px] text-gray-icon font-IRANYekan-Bold'>1405/06/31</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopAuthors;