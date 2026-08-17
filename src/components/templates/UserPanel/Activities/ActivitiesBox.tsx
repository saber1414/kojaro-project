"use client"
import Pagination from '@/components/modules/Pagination/Pagination';
import { useState } from 'react';
import Studies from './Studies';
import Comments from './Comments';

const ActivitiesBox = () => {
    const [tab, setTab] = useState("studies");

    return (
        <>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className=" flex items-center justify-center gap-x-4 flex-wrap gap-y-4">
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>حدود 1 ماه</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>عضو کجارو بودید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-orange-500' viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H157l19.52,19.51a12,12,0,0,1-17,17l-40-40A12,12,0,0,1,128,116h56A12,12,0,0,1,196,128Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>دقیقه مطالعه داشتید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-green-400' viewBox="0 0 256 256"><path d="M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>مطلب را مطالعه کردید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg className='fill-red-600' width="24" height="24" fill="var(--primary-1)" viewBox="0 0 256 256"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>مطلب را لایک کردید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>کامنت گذاشتید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M236,200a12,12,0,0,1-24,0,84.09,84.09,0,0,0-84-84H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,92h67A108.12,108.12,0,0,1,236,200Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>پاسخ سئوال دادید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg width="24" height="24" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M232.76,137.88A28.39,28.39,0,0,0,208.13,133L172,141.26c0-.42,0-.84,0-1.26a32,32,0,0,0-32-32H89.94a35.74,35.74,0,0,0-25.45,10.54L43,140H20A20,20,0,0,0,0,160v40a20,20,0,0,0,20,20H120a11.89,11.89,0,0,0,2.91-.36l64-16a11.4,11.4,0,0,0,1.79-.6l38.82-16.54c.23-.09.45-.19.67-.3a28.61,28.61,0,0,0,4.57-48.32ZM24,164H36v32H24Zm193.68.61-37.51,16L118.52,196H60V157l21.46-21.46A11.93,11.93,0,0,1,89.94,132H140a8,8,0,0,1,0,16H112a12,12,0,0,0,0,24h32a12.19,12.19,0,0,0,2.69-.3l67-15.41.47-.12a4.6,4.6,0,0,1,5.81,4.44A4.58,4.58,0,0,1,217.68,164.61ZM151.51,64.48a12,12,0,0,1,0-17l32-32a12,12,0,0,1,17,0l32,32a12,12,0,1,1-17,17L204,53v51a12,12,0,0,1-24,0V53L168.49,64.48A12,12,0,0,1,151.51,64.48Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>واکنش داده‌اید</span>
                    </div>
                    <div className="bg-white shadow shadow-gray-200 rounded-sm sm:w-37.75 w-full h-42.5 flex flex-col items-center justify-around">
                        <svg className='fill-blueMenu' width="24" height="24" viewBox="0 0 256 256"><path d="M232.76,137.88A28.39,28.39,0,0,0,208.13,133L172,141.26c0-.42,0-.84,0-1.26a32,32,0,0,0-32-32H89.94a35.76,35.76,0,0,0-25.45,10.54L43,140H20A20,20,0,0,0,0,160v40a20,20,0,0,0,20,20H120a11.89,11.89,0,0,0,2.91-.36l64-16a11.4,11.4,0,0,0,1.79-.6l38.82-16.54c.23-.09.45-.19.67-.3a28.61,28.61,0,0,0,4.57-48.32ZM24,164H36v32H24Zm193.68.61-37.51,16L118.52,196H60V157l21.46-21.46A11.93,11.93,0,0,1,89.94,132H140a8,8,0,0,1,0,16H112a12,12,0,0,0,0,24h32a12.19,12.19,0,0,0,2.69-.3l67-15.41.47-.12a4.61,4.61,0,0,1,5.82,4.44A4.58,4.58,0,0,1,217.68,164.61ZM151.51,80.49a12,12,0,0,1,17-17L180,75V24a12,12,0,0,1,24,0V75l11.51-11.52a12,12,0,0,1,17,17l-32,32a12,12,0,0,1-17,0Z"></path></svg>
                        <span className='font-IRANYekan-Bold'>0</span>
                        <span className='text-[13px] text-gray-400 font-IRANYekan-Light'>واکنش گرفته اید</span>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="bg-white p-4 rounded-sm shadow shadow-gray-200">
                        <div className="flex items-center gap-x-4 justify-center">
                            <button onClick={() => setTab("comments")} type="button" className={`cursor-pointer px-4 h-7 rounded-full border border-gray-200 flex items-center justify-center gap-x-2 ${tab === "comments" && "bg-dark2 text-white"}`}>
                                <svg width="16" height="16" className='fill-blueMenu' viewBox="0 0 256 256"><path d="M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z"></path></svg>
                                <span className='text-[13px]'>نظرات</span>
                            </button>
                            <button onClick={() => setTab("studies")} type="button" className={`cursor-pointer px-4 h-7 rounded-full border border-gray-200 flex items-center justify-center gap-x-2 ${tab === "studies" && "bg-dark2 text-white"}`}>
                                <svg width="16" height="16" fill="#9696a0" viewBox="0 0 256 256"><path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,160H44V60H212ZM68,92A12,12,0,0,1,80,80h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,92Zm0,36a12,12,0,0,1,12-12h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,128Zm0,36a12,12,0,0,1,12-12h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,164Z"></path></svg>
                                <span className='text-[13px]'>مطالعات</span>
                            </button>
                        </div>
                        <span className='block w-full h-px bg-gray-200 my-4'></span>
                        {
                            tab === "studies" && (
                                <Studies />
                            ) || 
                            tab === "comments" && (
                                <Comments />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivitiesBox;