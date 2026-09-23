import React from 'react'
import MonthlyIncomeChart from '../Chart/MonthlyIncomeChart';
import ActiveUserChart from '../Chart/ActiveUserChart';
import TopAuthors from '../TopAuthors/TopAuthors';
import Table from '../Table/Table';

const Main = () => {
  return (
    <div className='main'>
      <div className="flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-11.25 h-11.25 bg-green-1 rounded-lg flex items-center justify-center">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='23'
              height='23'
              fill='none'
              viewBox='0 0 23 23'
            >
              <path
                fill='#fff'
                stroke='#4FD1C5'
                strokeWidth='0.023'
                d='M6.328 1.418h4.043a.164.164 0 0 1 .164.164v6.153a2.12 2.12 0 0 0 2.121 2.12h6.152a.164.164 0 0 1 .165.165v8.262a2.8 2.8 0 0 1-2.801 2.8H6.328a2.8 2.8 0 0 1-2.8-2.8V4.219a2.8 2.8 0 0 1 2.8-2.8Zm1.406 14.04a.715.715 0 1 0 0 1.429h7.032a.715.715 0 1 0 0-1.43zm0-3.516a.716.716 0 1 0 0 1.43h7.032a.715.715 0 1 0 0-1.43z'
              ></path>
              <path
                fill='#fff'
                stroke='#4FD1C5'
                strokeWidth='0.023'
                d='M12.056 1.956q.022.005.039.022l6.319 6.32q.016.016.021.038.004.023-.005.044a.1.1 0 0 1-.027.034.1.1 0 0 1-.043.013h-5.704a.69.69 0 0 1-.691-.691V2.032a.08.08 0 0 1 .047-.07.1.1 0 0 1 .043-.006Z'
              ></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>مقالات منتشر شده</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-11.25 h-11.25 bg-green-1 rounded-lg flex items-center justify-center">
            <svg
              width='23'
              height='23'
              fill='currentColor'
              className='bi bi-people-fill fill-white'
              viewBox='0 0 16 16'
            >
              <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کاربران</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>کل: 1</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-11.25 h-11.25 bg-green-1 rounded-lg flex items-center justify-center">
            <svg
              width='23'
              height='23'
              fill='currentColor'
              className='bi bi-chat-dots-fill fill-white'
              viewBox='0 0 16 16'
            >
              <path d='M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>دیدگاه ها</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>کل: 1</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-11.25 h-11.25 bg-green-1 rounded-lg flex items-center justify-center">
            <svg
              width='23'
              height='23'
              fill='none'
              viewBox='0 0 23 23'
            >
              <path
                fill='#fff'
                d='M4.197 4.568h14.062q.246 0 .491.031a2.9 2.9 0 0 0-3.406-2.441L3.78 4.132h-.013a2.9 2.9 0 0 0-1.805 1.149 3.85 3.85 0 0 1 2.236-.713M18.26 5.625H4.196a2.816 2.816 0 0 0-2.813 2.812v8.438a2.816 2.816 0 0 0 2.813 2.812h14.062a2.816 2.816 0 0 0 2.813-2.812V8.437a2.815 2.815 0 0 0-2.813-2.812m-2.088 8.437a1.406 1.406 0 1 1 0-2.813 1.406 1.406 0 0 1 0 2.813'
              ></path>
              <path
                fill='#fff'
                d='M1.406 11.401V7.03c0-.952.528-2.549 2.358-2.895 1.553-.291 3.091-.291 3.091-.291s1.011.703.176.703-.813 1.077 0 1.077 0 1.032 0 1.032L3.757 10.37z'
              ></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>درآمد ماهانه</span>
            <div className="pt-2 flex gap-x-4">
              <span className='text-[13px] font-IRANYekan-Bold'>100 <small>تومان</small></span>
              <p className='text-green-1 text-[13px] font-IRANYekan-Bold'>+55%</p>
            </div>
          </div>
        </div>
      </div>
      {/* chart */}
      <div className="flex gap-x-4 flex-wrap md:flex-nowrap">
        <MonthlyIncomeChart />
        <ActiveUserChart />
      </div>
      {/* table & top authors */}
      <div className="flex mt-5 gap-x-4 flex-wrap md:flex-nowrap">
        <TopAuthors />
        <Table />
      </div>
    </div>
  )
}

export default Main;