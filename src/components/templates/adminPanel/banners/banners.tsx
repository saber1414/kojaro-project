"use client"
import Search from '@/components/modules/AdminPanel/Search/Search';
import React, { useMemo, useState } from 'react'
import CreateBanner from './createBanner';
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import EditBanner from './editBanner';
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';

const banners = [
    {
        _id: "6a9c15035f4c0e14620b82ae",
        title: "افسردگی بعد از سفر چیست؟ دلایل، علائم و راه‌های مقابله",
        link: "best-fuman-restaurants",
        imag: "/uploads/banner__b5f0db41-6cff-463e-8b1b-e668c1a7aff7.jpg",
        createdA: "2026-09-05T13:11:31.542Z",
        updatedA: "2026-09-05T13:11:31.542Z"
    },
    {
        _id: "6a9c15035f4c0e14620b82a1",
        title: "جاهای دیدنی گیلان در پاییز؛ از جنگل‌های مه‌آلود تا دریاچه‌های رنگارنگ",
        link: "best-fuman-restaurants",
        imag: "/images/banner01.jpg",
        createdA: "2026-09-05T13:11:31.542Z",
        updatedA: "2026-09-05T13:11:31.542Z"
    },
]

const BannersList = () => {
    const [search, setSearch] = useState<string>("");
    const [createBannerModal, setCreateBannerModal] = useState<boolean>(false);
    const [editBannerModal, setEditBannerModal] = useState<boolean>(false);
    const [deleteBannerModal, setDeleteBannerModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const handelCreateBanner = async () => {
        console.log('create baner')
    };

    const allBanners = useMemo(() => {
        const onlyBanners = banners;

        const q = search.trim().toLowerCase();
        if (!q) return onlyBanners;

        return onlyBanners.filter((banner) => {
            const title = (banner.title || "").toLowerCase();
            const link = (banner.link || "").toLowerCase();

            return (title.includes(q) || link.includes(q))
        })
    }, [banners, search]);


    const total = allBanners.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedBanners = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return allBanners.slice(start, start + limit)
    }, [allBanners, currentPage, limit]);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

    const limitOptions = useMemo(() => {
        const totalCount = allBanners.length;

        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);

        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount];
    }, [allBanners]);

    const handleLimitChange = (value: number) => {
        setLimit(value);
        setPage(1);
    };

    const pageIds = useMemo(() =>
        paginatedBanners.map((banner) => banner._id),
        [paginatedBanners]
    );

    const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
    const isSomePageSlected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);

    const toggleSelectAllPage = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((_id) => !pageIds.includes(_id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])))
        }
    };

    const toggleSelectedOne = (_id: string) => {
        setSelectedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])
    };

    const handleEditBanner = async() => {
        console.log('edit banner')
    };

    const handleDeleteBanner = async() => {
        console.log('delete banner')
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>لیست بنر</h3>
                    <Search
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    onClick={() => setCreateBannerModal(true)}
                    className='w-34.25 h-8 cursor-pointer bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>
                    ایجاد بنر +
                </button>
            </div>
            <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-aspect-ratio fill-fuchsia-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z'></path>
                            <path d='M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل بنر</span>
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
                            className='bi bi-aspect-ratio-fill fill-orange-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 12.5v-9A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5M2.5 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V5h2.5a.5.5 0 0 0 0-1zm11 8a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0V11h-2.5a.5.5 0 0 0 0 1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>بنر جدید</span>
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
                            className='bi bi-back fill-green-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>بنر برتر</span>
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
                            className='bi bi-box-fill fill-blue-500'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
                    </div>
                </div>
            </div>
            {
                allBanners.length ? (
                    <div className="mt-10 bg-white p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <h4 className='text-[14px] font-IRANYekan-Bold'>کل مقالات</h4>
                                <button
                                    type="button"
                                    className={`
                                    cursor-pointer h-8 px-4 transition-all ease-in rounded-sm bg-red-500 hover:bg-red-800 text-white  items-center justify-center text-[13px]
                                    ${selectedIds.length > 0 ? "flex" : "hidden"}
                                    `}>
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
                                <div>عنوان</div>
                                <div>آدرس</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedBanners.map((banner, index) => (
                                    <div key={banner._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr] text-[14px] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(banner._id)}
                                                onChange={() => toggleSelectedOne(banner._id)}
                                                className='w-4 h-4 rounded accent-green-1 border-gray-300 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{banner.title}</div>
                                        <div dir='ltr'>{banner.link}</div>
                                        <div className='flex items-center justify-center gap-x-2'>
                                            <button
                                                type="button"
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
                                            <button
                                                type="button"
                                                onClick={() => setEditBannerModal(true)}
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
                                                onClick={() => setDeleteBannerModal(true)}
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
                    <EmptyPage name='بنری' text='بنرهای' />
                )
            }
            {
                createBannerModal && (
                    <CreateBanner
                        confirm={handelCreateBanner}
                        closeBtn={() => setCreateBannerModal(false)}
                    />
                )
            }
            {
                editBannerModal && (
                    <EditBanner 
                        confirm={handleEditBanner}
                        closeBtn={() => setEditBannerModal(false)}
                    />
                )
            }
            {
                deleteBannerModal && (
                    <DeleteModal 
                        confirmBtn={handleDeleteBanner}
                        closeBtn={() => setDeleteBannerModal(false)}
                        text='بنر'
                    />
                )
            }
        </>
    )
}

export default BannersList;