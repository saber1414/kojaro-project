"use client"
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';
import DetailsMenu from '@/components/templates/AdminPanel/menus/DetailsMenu';
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import Search from '@/components/modules/AdminPanel/Search/Search';
import React, { useMemo, useState } from 'react'
import CreateMenu from './CreateMenu';
import EditMenu from './EditMenu';

const menus = [
  {
    _id: "6a91506b7725a714a5b18ed1",
    name: "مجله گردشگری",
    slug: "tourism",
    parentId: null,
    children: [
      {
        _id: "6abe9f21c52f5aed19886394",
        name: "ایرانگردی",
        slug: "iran-tourism",
        parentId: "6a91506b7725a714a5b18ed1",
        children: [],
        icon: null,
        createdAt: "2026-10-01T17:57:53.839Z",
        updatedAt: "2026-10-01T17:57:53.839Z"
      },
      {
        _id: "6abe9f21c52f5aed19886399",
        name: "گردشگری",
        slug: "tourism",
        parentId: "6a91506b7725a714a5b18ed1",
        children: [],
        icon: null,
        createdAt: "2026-11-01T17:57:53.839Z",
        updatedAt: "2026-11-01T17:57:53.839Z"
      }
    ],
    icon: null,
    createdAt: "2026-08-28T09:10:03.075Z",
    updatedAt: "2026-08-28T09:10:03.075Z"
  },
  {
    _id: "6a91506b7725a714a5b18ed2",
    name: "اخبار",
    slug: "news",
    parentId: null,
    children: [],
    icon: null,
    createdAt: "2026-08-29T09:10:03.075Z",
    updatedAt: "2026-08-29T09:10:03.075Z"
  }
];

const MenuList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [subMenuId, setSubMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [createMenuModal, setCreateMenuModal] = useState<boolean>(false);
  const [editMenuModal, setEditMenuModal] = useState<boolean>(false);
  const [deeleteModal, setDeleteModal] = useState<boolean>(false);

  const allMenus = useMemo(() => {
    const onlyMenus = menus;

    const q = search.trim().toLowerCase();
    if (!q) return onlyMenus;

    return onlyMenus.filter((menu) => {
      const name = (menu.name || "").toLowerCase();
      const slug = (menu.slug || "").toLowerCase();

      return (name.includes(q) || slug.includes(q))
    });
  }, [menus, search]);

  const total = allMenus.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const paginatedMenus = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return allMenus.slice(start, start + limit)
  }, [allMenus]);

  const goPrev = () => setPage((page) => Math.max(1, page - 1));
  const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

  const limitOptions = useMemo(() => {
    const totalCount = allMenus.length;
    if (totalCount <= 0) return [10];

    const base = [5, 10, 20, 50];
    const options = base.filter((n) => n < totalCount);
    if (!options.includes(totalCount)) options.push(totalCount);

    return options.length ? options : [totalCount];
  }, [allMenus]);

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  };

  const detailsSubMenuHandle = (_id: string) => {
    setSubMenuId(_id)
    setIsDetails(true)
  };

  const pageIds = useMemo(() =>
    paginatedMenus.map((menu) => menu._id),
    [paginatedMenus]
  );

  const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
  const isSomePageSlected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);

  const toggleSelectAllPage = () => {
    if (isAllPageSelected) {
      setSelectedIds((prev) => prev.filter((_id) => !pageIds.includes(_id)))
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])))
    }
  };

  const toggleSelectedOne = (_id: string) => {
    setSelectedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])
  };

  const handleDeleteBtn = async () => {
    console.log('delete ')
  };

  const createMenuHandel = async () => {
    console.log('create menu');
  };

  const editMenuHandel = async () => {
    console.log('edit menu')
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <h3 className='text-[14px] font-IRANYekan-Bold'>لیست نویسندگان</h3>
          <Search
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          type='button'
          onClick={() => setCreateMenuModal(true)}
          className='w-34.25 cursor-pointer h-8 bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>ایجاد منو +</button>
      </div>
      <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-menu-up fill-fuchsia-500'
              viewBox='0 0 16 16'
            >
              <path d='M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793zM1 9V6h14v3zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5m0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5m0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل منو</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-menu-button-wide-fill fill-orange-500'
              viewBox='0 0 16 16'
            >
              <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>منو جدید</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-menu-app-fill fill-green-500'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>زیر منو</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
          </div>
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-three-dots fill-blue-500'
              viewBox='0 0 16 16'
            >
              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3'></path>
            </svg>
          </div>
          <div>
            <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
            <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
          </div>
        </div>
      </div>
      {
        allMenus.length ? (
          <div className="mt-10 bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className="text-[14px] font-IRANYekan-Bold">کل منوها</div>
                <button
                  type="button"
                  className={`cursor-pointer h-8 px-4 transition-all ease-in rounded-sm bg-red-500 hover:bg-red-800 text-white  items-center justify-center text-[13px] ${selectedIds.length ? "flex" : "hidden"}`}>
                  حذف انتخابی ها ({selectedIds.length})
                </button>
              </div>
              <div className="flex gap-x-2 text-[13px]">
                <span className='text-green-1'>{startItem}-{endItem}</span>
                از
                <span>{total}</span>
              </div>
            </div>
            <span className="w-full h-px bg-gray-10 mt-5 block"></span>
            <div className="mt-5">
              <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={toggleSelectAllPage}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomePageSlected
                    }}
                    className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                </div>
                <div>ردیف</div>
                <div>منو</div>
                <div>آیکون منو</div>
                <div>وضعیت</div>
              </div>
              {
                paginatedMenus.map((menu, index) => (
                  <div key={menu._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr] text-[14px] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(menu._id)}
                        onChange={() => toggleSelectedOne(menu._id)}
                        className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                    </div>
                    <div>{index + 1}</div>
                    <div>{menu.name}</div>
                    <div className='flex items-center justify-center'>
                      <img className='w-8' src={`${menu.icon ? menu.icon : "/images/emptyImage.png"}`} alt={`${menu.name}`} />
                    </div>
                    <div className='flex items-center justify-center gap-x-2'>
                      {
                        menu.children.length > 0 && (
                          <button
                            type="button"
                            onClick={() => detailsSubMenuHandle(menu._id)}
                            className='cursor-pointer bg-green-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-green-200 transition-colors'>
                            <svg
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-eye-fill fill-green-500'
                              viewBox='0 0 16 16'
                            >
                              <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0'></path>
                              <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7'></path>
                            </svg>
                          </button>
                        )
                      }
                      <button
                        type="button"
                        onClick={() => setEditMenuModal(true)}
                        className='cursor-pointer bg-sky-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-sky-200 transition-colors'>
                        <svg
                          width='16'
                          height='16'
                          fill='none'
                          viewBox='0 0 13 13'
                        >
                          <path
                            fill='#1e88e5'
                            stroke='#1e88e5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M11.065 1.03a1.82 1.82 0 0 0-2.585.018L1.618 7.91a2 2 0 0 0-.524.918l-.58 2.267a.4.4 0 0 0 .486.487L3.268 11a2 2 0 0 0 .917-.523l6.863-6.862a1.817 1.817 0 0 0 .017-2.585'
                          ></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteModal(true)}
                        className='cursor-pointer bg-red-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-200 transition-colors'>
                        <svg
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-trash-fill fill-red-500'
                          viewBox='0 0 16 16'
                        >
                          <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0'></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-x-2 text-[13px]">
                <span className='text-green-1'>{startItem}-{endItem}</span>
                از
                <span>{total}</span>
              </div>
              <div className="flex items-center gap-x-6">
                <div className="flex items-center gap-x-2">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentPage >= totalPages}
                    className='cursor-pointer w-7 h-7 bg-gray-10 rounded-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed'>
                    <svg
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-arrow-right'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8'
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentPage <= 1}
                    className='cursor-pointer w-7 h-7 bg-gray-10 rounded-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed'>
                    <svg
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-arrow-left'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className='text-[13px]'>تعداد ردیف در هر صفحه:</span>
                  <select
                    value={limit}
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    className='w-13 h-7 rounded-sm text-[13px] font-IRANYekan-Bold bg-gray-10'>
                    {
                      limitOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyPage text='منوهای' name='منو' />
        )
      }
      {
        isDetails && (
          <DetailsMenu
            closeBtn={() => setIsDetails(false)}
            menus={allMenus}
            _id={subMenuId!}
          />
        )
      }
      {
        deeleteModal && (
          <DeleteModal
            closeBtn={() => setDeleteModal(false)}
            confirmBtn={handleDeleteBtn}
            text='منو'
          />
        )
      }
      {
        createMenuModal && (
          <CreateMenu
            confirm={createMenuHandel}
            closeBtn={() => setCreateMenuModal(false)}
          />
        )
      }
      {
        editMenuModal && (
          <EditMenu
            confirm={editMenuHandel}
            closeBtn={() => setEditMenuModal(false)}
          />
        )
      }
    </>
  )
}

export default MenuList;