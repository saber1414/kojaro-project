"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import NavMenu from './NavMenu';
import SearchInput from './SearchInput';

const Navbar = () => {
    const [searchContents, setSearchContents] = useState<string>("");

    const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchContents(value)
    };
    return (
        <>
            <div className='flex items-center justify-between relative'>
                <Link href="/" className='pr-8'>
                    <svg className='' width="108" height="24" viewBox="0 0 144 33" fill="var(--text)"><path d="M130.546 24.0305L140.889 32.9285L125.857 24.3473L120.875 18.8037L129.776 20.6762L143.705 25.9801L130.546 24.0305Z" fill="#0F6CB2" fillRule="evenodd" clipRule="evenodd"></path><path d="M119.96 12.534L125.861 24.3471L109.664 22.9088L111.738 18.0558L109.669 13.7644L113.233 8.76221L119.96 12.534Z" fill="#1E88E5" fillRule="evenodd" clipRule="evenodd"></path><path d="M119.954 12.534L137.535 1.4668L113.227 8.7622L119.954 12.534Z" fill="#0F6CB2" fillRule="evenodd" clipRule="evenodd"></path><path d="M104.29 19.0987L106.406 17.7979L111.733 18.056L125.857 24.3473L110.243 21.5445L104.153 20.4548L101.648 19.6116L104.29 19.0987Z" fill="#1E88E5" fillRule="evenodd" clipRule="evenodd"></path><path d="M104.156 20.4531C106.926 25.0094 113.116 24.5266 125.86 24.3472L104.156 20.4531Z" fill="#F57C00" fillRule="evenodd" clipRule="evenodd"></path><path d="M60.5921 24.9961H56.7492V24.0768C55.2535 25.1513 53.5311 25.7011 51.5909 25.7011C50.3158 25.7162 49.0505 25.4765 47.8694 24.9961C46.7986 24.5679 45.8312 23.9169 45.0314 23.0862C44.2414 22.2662 43.6236 21.2964 43.2143 20.234C42.7775 19.1161 42.5582 17.9251 42.5682 16.7249C42.5598 15.5431 42.7895 14.3717 43.2436 13.2806C43.6978 12.1895 44.3671 11.2011 45.2116 10.3743C46.0372 9.56397 47.0078 8.9161 48.0728 8.46446C49.1828 7.98353 50.3812 7.74033 51.5909 7.7505C52.7727 7.74767 53.9434 7.97813 55.0359 8.42868C56.1285 8.87924 57.1214 9.54101 57.9576 10.3761C58.7608 11.1757 59.407 12.1181 59.8853 13.2158C60.353 14.3028 60.5921 15.4719 60.5921 16.7249V24.9961ZM46.3968 16.7249C46.3968 17.4299 46.5396 18.0993 46.8145 18.7168C47.3441 19.9497 48.3305 20.9297 49.5668 21.4513C50.2022 21.7261 50.8733 21.8689 51.5784 21.8689C52.2852 21.8689 52.9563 21.7386 53.59 21.487C54.2029 21.2435 54.7602 20.8786 55.2285 20.4143C55.7173 19.9334 56.104 19.3587 56.3653 18.7247C56.6266 18.0908 56.7572 17.4106 56.7492 16.7249C56.7492 16.0199 56.6172 15.3505 56.3423 14.733C56.079 14.1212 55.7009 13.5656 55.2285 13.0962C54.756 12.6277 54.2003 12.2512 53.59 11.986C52.9546 11.7136 52.2697 11.5756 51.5784 11.5809C50.8733 11.5809 50.204 11.7112 49.5686 11.986C48.9561 12.2482 48.3993 12.6251 47.9283 13.0962C47.4624 13.5621 47.0893 14.0993 46.8145 14.733C46.5368 15.3602 46.3945 16.0389 46.3968 16.7249ZM14.6434 16.7267C14.6434 15.4719 14.8826 14.3028 15.3627 13.2158C15.8097 12.1502 16.4644 11.1843 17.2886 10.3743C18.1025 9.57466 19.061 8.93032 20.1498 8.46446C21.2645 7.98459 22.4668 7.74147 23.6804 7.7505C24.9369 7.7505 26.1078 7.9879 27.1984 8.46446C28.2872 8.93032 29.2332 9.57466 30.0471 10.3743C30.8503 11.1757 31.4839 12.1181 31.9623 13.2158C32.4358 14.3247 32.6764 15.5191 32.6691 16.7249C32.6764 17.9307 32.4358 19.1251 31.9623 20.234C31.5067 21.2923 30.8571 22.2561 30.0471 23.0755C29.2226 23.8814 28.257 24.5287 27.1984 24.9853C26.0884 25.4663 24.89 25.7095 23.6804 25.6993C22.4668 25.7082 21.2646 25.4651 20.1498 24.9853C19.0874 24.5289 18.1176 23.8816 17.2886 23.0755C16.4664 22.2635 15.8115 21.2981 15.3609 20.234C14.8779 19.1277 14.6334 17.932 14.6434 16.7249V16.7267ZM18.4863 16.7267C18.4863 17.4299 18.6166 18.0975 18.8932 18.7186C19.1788 19.3398 19.5501 19.8877 20.0052 20.3536C20.4729 20.8176 21.0226 21.1782 21.6581 21.4513C22.2903 21.7271 22.9727 21.8695 23.6625 21.8695C24.3523 21.8695 25.0347 21.7271 25.667 21.4513C26.9026 20.9296 27.8888 19.9505 28.4193 18.7186C28.6941 18.0975 28.8387 17.4299 28.8387 16.7249C28.8387 16.0199 28.6959 15.3505 28.4193 14.733C28.1565 14.1214 27.779 13.5659 27.3073 13.0962C26.8362 12.6251 26.2795 12.2482 25.667 11.986C25.0322 11.7136 24.3479 11.5757 23.6571 11.5809C22.9503 11.5809 22.281 11.7112 21.6581 11.986C21.0417 12.2479 20.4808 12.6247 20.0052 13.0962C19.5501 13.5621 19.1806 14.0993 18.8932 14.733C18.619 15.3609 18.4803 16.0397 18.4863 16.7249V16.7267ZM73.3738 16.7267C73.3738 15.4719 73.613 14.3028 74.0931 13.2158C74.5403 12.1472 75.1998 11.1805 76.0315 10.3743C76.8455 9.57466 77.7897 8.93032 78.8927 8.46446C80.0027 7.98348 81.2011 7.74028 82.4108 7.7505C83.6673 7.7505 84.84 7.9879 85.9306 8.46446C86.9932 8.91367 87.9602 9.56192 88.7793 10.3743C89.5807 11.1757 90.2144 12.1181 90.6945 13.2158C91.1729 14.3232 91.4131 15.5187 91.3995 16.7249C91.4131 17.9311 91.1729 19.1267 90.6945 20.234C90.239 21.2924 89.5894 22.2561 88.7793 23.0755C87.9569 23.8839 86.9908 24.5316 85.9306 24.9853C84.82 25.4663 83.621 25.7095 82.4108 25.6993C81.2011 25.7094 80.0027 25.4662 78.8927 24.9853C77.8286 24.5321 76.8582 23.8845 76.0315 23.0755C75.2024 22.267 74.5434 21.3009 74.0931 20.234C73.6096 19.1278 73.3645 17.9321 73.3738 16.7249V16.7267ZM77.2167 16.7267C77.2167 17.4299 77.3595 18.0975 77.6344 18.7186C77.911 19.3398 78.2823 19.8877 78.7482 20.3536C79.2033 20.8176 79.7548 21.1782 80.3885 21.4513C81.0096 21.7261 81.6807 21.8689 82.3876 21.8689C83.1051 21.8689 83.7619 21.7261 84.3974 21.4513C85.0328 21.1782 85.5826 20.8194 86.0377 20.3536C86.5036 19.8895 86.8766 19.3398 87.1515 18.7186C87.4264 18.0975 87.5691 17.4299 87.5691 16.7249C87.5691 16.0199 87.4264 15.3505 87.1515 14.733C86.8883 14.1212 86.5102 13.5656 86.0377 13.0962C85.5607 12.6129 84.992 12.2296 84.3648 11.9691C83.7377 11.7086 83.0649 11.576 82.3858 11.5791C81.6807 11.5791 81.0114 11.7112 80.3867 11.986C79.7733 12.2455 79.2166 12.6227 78.7482 13.0962C78.2823 13.5621 77.911 14.0993 77.6344 14.733C77.3565 15.3601 77.2142 16.0389 77.2167 16.7249V16.7267ZM36.0801 29.1031V29.0906C35.9605 29.1745 35.8284 29.2584 35.7088 29.3405C34.9714 29.7679 34.189 30.1127 33.3759 30.3686C32.2877 30.6684 31.1634 30.8167 30.0346 30.8094V26.9773C30.8735 26.9773 31.6517 26.847 32.3818 26.5721C33.08 26.3108 33.7279 25.931 34.297 25.4494C34.8467 24.9729 35.2894 24.4231 35.5999 23.8038C35.9248 23.1701 36.0801 22.5008 36.0801 21.7975V8.52514H39.9212V19.6128C39.9212 24.0429 38.9163 27.2057 36.0801 29.1031ZM67.1017 9.88523V9.89772C67.2337 9.81383 67.3533 9.72994 67.4854 9.64784C68.2206 9.21798 69.0044 8.87706 69.8201 8.63224C70.825 8.33416 71.5782 8.17888 72.8009 8.17888V12.011C71.962 12.011 71.5318 12.1413 70.8125 12.4162C70.0825 12.7018 69.4381 13.073 68.8848 13.5389C68.335 14.0154 67.9049 14.5652 67.5818 15.1863C67.2632 15.8062 67.0985 16.4938 67.1017 17.1908V25.7011H63.2748V19.3755C63.2748 14.9579 64.2673 11.7951 67.1035 9.88523H67.1017ZM36.0676 6.35294H39.923V2.5083H36.0676V6.35294ZM3.96789 25.6172H0.125V3.17942H3.96789V25.6172Z" fillRule="evenodd" clipRule="evenodd"></path><path d="M5.54753 15.0183L14.1401 6.44727H8.7193L2.84341 12.3088L0.125 15.0183L10.8255 25.7008H16.248L5.54753 15.0183Z" fill="#1E88E5" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Link>
                <SearchInput
                    value={searchContents}
                    onChange={inputChangeHandle}
                    closeBtn={() => setSearchContents("")}
                />
                <div className='flex items-center gap-x-6 pl-8'>
                    <button type="button" className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text)" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,24.87a83.53,83.53,0,0,1,24,7.25V203.88a83.53,83.53,0,0,1-24,7.25ZM44,128a84.12,84.12,0,0,1,72-83.13V211.13A84.12,84.12,0,0,1,44,128Zm144,58.71V69.29a83.81,83.81,0,0,1,0,117.42Z"></path></svg>
                    </button>
                    <Link href="#" className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path></svg>
                    </Link>
                </div>
                {/* search box */}
                {
                    searchContents.length > 0 && (
                        <div className="absolute w-full h-110 bg-white z-20 top-10 transition-all">
                            {/* category */}
                            <div className="w-[33%] mx-auto my-0 pt-5">
                                <div className="flex">
                                    <div className="flex gap-x-2 w-33.75">
                                        <svg width="16" height="16" fill="var(--text)" viewBox="0 0 256 256"><path d="M246.15,133.18,146.83,33.86A19.85,19.85,0,0,0,132.69,28H40A12,12,0,0,0,28,40v92.69a19.85,19.85,0,0,0,5.86,14.14l99.32,99.32a20,20,0,0,0,28.28,0l84.69-84.69A20,20,0,0,0,246.15,133.18Zm-98.83,93.17L52,131V52h79l95.32,95.32ZM104,88A16,16,0,1,1,88,72,16,16,0,0,1,104,88Z"></path></svg>
                                        <span className='text-[13.5px] font-IRANYekan-Bold'>دسته مطالب</span>
                                    </div>
                                    <ul>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>دبی</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>کیش</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>امارات</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <span className='block h-px bg-gray-200'></span>
                            </div>
                            {/* contents */}
                            <div className="w-[33%] mx-auto my-0 pt-5">
                                <div className="flex">
                                    <div className="flex gap-x-2 w-33.75">
                                        <svg width="16" height="16" fill="var(--text)" viewBox="0 0 256 256"><path d="M208,136H48a20,20,0,0,0-20,20v36a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V156A20,20,0,0,0,208,136Zm-4,52H52V160H204Zm4-144H48A20,20,0,0,0,28,64v36a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V64A20,20,0,0,0,208,44Zm-4,52H52V68H204Z"></path></svg>
                                        <span className='text-[13.5px] font-IRANYekan-Bold'>مطالب</span>
                                    </div>
                                    <ul>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>دبی چگونه دبی شد؟</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>قاب دبی (دبی فریم)</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>برقراری پرواز جدید دبی- لار- دبی</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'></span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>تفرجگاه ساحلی دبی (دبی مارینا)</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>کریسمس در دبی؛ در کریسمس دبی کجا بریم؟</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>بهترین رستوران های دبی</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>سوغات دبی چیست؟</span>
                                            </Link>
                                        </li>
                                        <li className='mb-2'>
                                            <Link href="/" className='text-[13px] font-IRANYekan-Light flex items-center gap-x-2'>
                                                <span className='block w-1 h-1 bg-blueMenu rounded-full'></span>
                                                <span className='pt-px'>دبی در یک نگاه</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <span className='block h-px bg-gray-200'></span>
                            </div>
                            {/* all contents */}
                            <div className="w-[33%] mx-auto my-0 pt-5">
                                <Link href="/" className='text-[13px] flex gap-x-2 w-33.75 items-center font-IRANYekan-Bold'>
                                    <span>مشاهده تمامی نتایج</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--grey-1)" viewBox="0 0 256 256" className="fill-blueMenu"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            <NavMenu />
        </>
    )
}

export default Navbar;