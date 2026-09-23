"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type MenuMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuMobile = ({ isOpen, onClose }: MenuMobileProps) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const menuListRef = useRef<HTMLUListElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menus = [
    {
      name: "داشبورد",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-speedometer fill-green-1" viewBox="0 0 16 16">
          <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
          <path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0" />
        </svg>
      ),
      subMenu: [],
      href: "/adminPanel"
    },
    {
      name: "جدول",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='none'
          viewBox='0 0 15 15'
        >
          <g fill='#4FD1C5' clipPath='url(#a)'>
            <path d='M3.047 14.532h-.938a.703.703 0 0 1-.703-.703v-4.22a.703.703 0 0 1 .703-.702h.938a.703.703 0 0 1 .703.703v4.219a.703.703 0 0 1-.703.703M9.61 14.53h-.938a.703.703 0 0 1-.703-.702V6.796a.703.703 0 0 1 .703-.703h.937a.703.703 0 0 1 .704.703v7.032a.703.703 0 0 1-.704.703M12.89 14.531h-.937a.703.703 0 0 1-.703-.703V3.516a.703.703 0 0 1 .703-.704h.938a.703.703 0 0 1 .703.704v10.312a.703.703 0 0 1-.703.703M6.328 14.531h-.937a.703.703 0 0 1-.703-.703V1.172A.703.703 0 0 1 5.39.469h.937a.703.703 0 0 1 .703.703v12.656a.703.703 0 0 1-.703.703'></path>
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h15v15H0z'></path>
            </clipPath>
          </defs>
        </svg>
      ),
      subMenu: [
        { name: "کاربران", href: "/adminPanel/users" },
        { name: "نویسندگان", href: "/adminPanel/author" }
      ]
    },
    {
      name: "مقالات",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-file-earmark-font-fill fill-green-1" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M5.057 6h5.886L11 8h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v5.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V6.755l-.293.01C5.856 6.808 5.68 6.905 5.5 8H5z" />
        </svg>
      ),
      subMenu: [
        { name: "لیست مقالات", href: "/adminPanel/articles" },
        { name: "ایجاد مقاله", href: "/adminPanel/createArticle" },
      ]
    },
    {
      name: "دسته بندی | لیست",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-ui-checks fill-green-1" viewBox="0 0 16 16">
          <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
        </svg>
      ),
      subMenu: [
        { name: "دسته بندی", href: "/adminPanel/articlesCategories" },
        { name: "لیست", href: "/adminPanel/lists" }
      ]
    },
    {
      name: "منو",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-sliders fill-green-1" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
        </svg>
      ),
      subMenu: [
        { name: "لیست منو", href: "/adminPanel/categories" },
        { name: "ایجاد منو", href: "/adminPanel/createCategory" }
      ]
    },
    {
      name: "ابزار",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-sign-intersection-y-fill fill-green-1" viewBox="0 0 16 16">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zm1.443 4.762 1.014 1.106L8.75 8.83V12h-1.5V8.83L4.493 6.303l1.014-1.106L8 7.483z" />
        </svg>
      ),
      subMenu: [
        { name: "بنر سرصفحه", href: "/adminPanel/banners" },
        { name: "تبلیغات", href: "/adminPanel/advertisement" },
        { name: "اعلان ها", href: "/adminPanel/notifications" },
        { name: "تیکت ها", href: "/adminPanel/tickets" },
      ]
    },
    {
      name: "پروفایل",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-person-fill fill-green-1" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
      ),
      subMenu: [],
      href: "/adminPanel/profile"
    },
    {
      name: "تنظیمات",
      icon: (
        <svg width="16" height="16" fill="currentColor" className="bi bi-gear-fill fill-green-1" viewBox="0 0 16 16">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      ),
      subMenu: [],
      href: "/adminPanel/setting"
    }
  ];

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  };

  useEffect(() => {
    const newOpenState: Record<string, boolean> = {};

    menus.forEach((item) => {
      if (item.subMenu && item.subMenu.length > 0) {
        const isActive = item.subMenu.some((sub) => pathname === sub.href);

        if (isActive) {
          newOpenState[item.name] = true;
        } else if (item.href && pathname === item.href) {
          newOpenState[item.name] = true;
        };

        setOpenMenu((prev) => ({ ...prev, ...newOpenState }))
      }
    })
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (menuListRef.current && sidebarRef.current) {
        const menuHeight = menuListRef.current.scrollHeight;
        const sidebarHeight = sidebarRef.current.clientHeight;

        setHasOverflow(menuHeight > sidebarHeight - 150)
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow)
  }, [openMenu]);

  return (
    <div ref={sidebarRef} className={`w-70 flex flex-col fixed z-30 top-0 ${isOpen ? "translate-x-0" : "translate-x-full"} bottom-0 bg-gray-12 transition-all duration-300 ease-in-out p-1`}>
      <div>
        <Link href="/" className='flex items-center gap-x-4 justify-center mt-2'>
          <img src="/images/kojaro.png" className='w-11' alt="" />
          <span className='text-[13px]'>پنل مدیریت | کجارو</span>
        </Link>
        <span className='block w-full h-px bg-gray-10 mt-2'></span>
      </div>
      <ul ref={menuListRef} className={`scrollbar-thin scrollbar-thumb-gray-400 flex-1 min-h-0 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 mt-5 transition-all duration-300 ${hasOverflow ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}>
        {
          menus.map((item) => {
            const isOpen = openMenu[item.name] ?? false
            const hasSubMenu = item.subMenu && item.subMenu.length > 0

            return (
              <div key={item.name}>
                {
                  hasSubMenu ? (
                    <div onClick={() => toggleMenu(item.name)} className='cursor-pointer h-10 w-full rounded-lg flex items-center justify-between mb-4 pr-4'>
                      <Link href="#" className='flex items-center justify-between'>
                        <div className="flex items-center gap-x-4">
                          {item.icon}
                          <span className='text-[13px]'>{item.name}</span>
                        </div>
                      </Link>
                      <button type="button">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-90"}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <li className={`${pathname === item.href && "bg-white"} h-10 rounded-lg flex pr-4 mb-4`}>
                      <Link href={item?.href || "#"} className='flex items-center justify-between'>
                        <div className="flex items-center gap-x-4">
                          {item.icon}
                          <span className='text-[13px]'>{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  )
                }
                {
                  hasSubMenu && (
                    <div className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${isOpen ? "max-h-125 opacity-100 pt-2" : "max-h-0 opacity-0"}
                        `}>
                      <div className="mb-6 transition-all ease-in flex mr-5 flex-col gap-4 border-r border-orange-400 pr-3">
                        {
                          item.subMenu.map((menu) =>
                            <Link href={menu.href} key={menu.href} className={`block leading-5 ${pathname === menu.href ? " after:absolute after:w-0.5 after:h-4 after:bg-amber-600 after:-right-3.5" : "text-gray-25"} text-sm relative text-[13px]`}>{menu.name}</Link>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </ul>
      <div className="mt-auto">
        <button type="button" className='cursor-pointer text-[14px] bg-white rounded-lg w-full h-10'>
          <span>خروج از حساب</span>
        </button>
      </div>
    </div>
  )
}

export default MenuMobile;