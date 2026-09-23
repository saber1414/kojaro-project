"use client"
import Link from 'next/link'
import { useState } from 'react'
import MenuMobile from '../MenuMobile/MenuMobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className='header flex items-center justify-between shadow shadow-b-gray-50'>
        <button type="button" onClick={() => setIsMenuOpen(true)} className='cursor-pointer block lg:hidden'>
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-list'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
            ></path>
          </svg>
        </button>
        <div className="hidden lg:block">
          <h3 className="text-[14px] font-IRANYekan-Light">مدیر گرامی به پنل مدیریت خوش آمدید</h3>
          <div className="mt-5 flex items-center gap-x-2">
            <Link href="/adminPanel" className='text-[13px] text-green-1'>جدول</Link>
            <span className='block'>/</span>
            <Link href="/adminPanel" className='text-[13px]'>کاربران</Link>
          </div>
        </div>
        <div className="flex items-center gap-x-8 flex-row-reverse">
          <div className="flex items-center gap-x-6 flex-row-reverse">
            <Link href="/adminPanel/profile">
              <svg width="20" height="20" fill="currentColor" className="bi bi-person-fill fill-gray-icon" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </Link>
            <Link href="/adminPanel/setting">
              <svg width="16" height="16" fill="currentColor" className="bi bi-gear-fill fill-gray-icon" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
              </svg>
            </Link>
            <Link href="/adminPanel/notifications">
              <svg width="16" height="16" fill="currentColor" className="bi bi-bell-fill fill-gray-icon" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
            </Link>
          </div>
          <div className="w-60 h-10 rounded-lg bg-white md:flex items-center gap-x-4 px-2 hidden">
            <button type="button" className='cursor-pointer'>
              <svg width="16" height="16" fill="currentColor" className="bi bi-search fill-gray-icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
            <input type="text" className='text-[13px] placeholder:text-[13px] text-gray-icon placeholder:text-gray-icon' placeholder='جستوجو' />
          </div>
        </div>
      </div>
      <MenuMobile
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <div 
      onClick={() => setIsMenuOpen(false)}
      className={`fixed top-0 bottom-0 right-0 left-0 bg-overview z-20 transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"}`}></div>
    </>
  )
}

export default Header;