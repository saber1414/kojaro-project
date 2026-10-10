"use client"
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import Search from '@/components/modules/AdminPanel/Search/Search';
import React, { useMemo, useState } from 'react'
import CreateAdvertisement from './createAdvertisement';
import EditAdvertisement from './editAdvertisement';
import DetailsAdvertisement from './detailsAdvertisement';
import { Advertisement } from '@/types/advertisement';

const advertisement = [
    {
        _id: "6aa01a631f1313e486bbbb45",
        title: "زوم اپ",
        image: "/uploads/ad__11abc2de-1382-4179-8b0f-8d851dfd977c.gif",
        link: "https://www.zoomapp.app/download/",
        alt: "زوم اپ",
        advertiserName: "زوم اپ",
        startDate: "2026-09-08T00:00:00.000Z",
        endDate: "2026-10-07T23:59:59.000Z",
        isActive: false,
        order: 1,
        position: "home",
        clickCount: 0,
        viewCount: 0,
        createdBy: {
            _id: "6a8a996304e544b90136040c",
            username: "saber__dev",
            image: "images/profile13.png",
            fullname: "صابر اسماعیلی"
        },
        createdAt: "2026-09-08T14:23:31.194Z",
        updatedAt: "2026-09-08T14:23:31.194Z"
    },
    {
        _id: "6aa01a631f1313e486bbbb46",
        title: "اقامت 24",
        image: "/uploads/ad__11abc2de-1382-4179-8b0f-8d851dfd977c.gif",
        link: "https://www.eghamat24.com/",
        alt: "اقامت 24",
        advertiserName: "اقامت 24",
        startDate: "2026-10-08T00:00:00.000Z",
        endDate: "2026-12-07T23:59:59.000Z",
        isActive: true,
        order: 2,
        position: "sidebar",
        clickCount: 0,
        viewCount: 0,
        createdBy: {
            _id: "6a8a996304e544b90136040c",
            username: "saber__dev",
            image: "images/profile13.png",
            fullname: "صابر اسماعیلی"
        },
        createdAt: "2026-09-08T14:23:31.194Z",
        updatedAt: "2026-09-08T14:23:31.194Z"
    },
];

const AdvertisementList = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModel, setEditModal] = useState<boolean>(false);
    const [detailsModal, setDetailsModal] = useState<boolean>(false);
    const [advertisemenId, setAdvertisemenIdId] = useState<string | null>(null);

    const handelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const allAdvertisement = useMemo(() => {
        const onlyAdvertisement = advertisement;

        const q = search.trim().toLowerCase();
        if (!q) return onlyAdvertisement;

        return onlyAdvertisement.filter((ads) => {
            const title = (ads.title || "").toLowerCase();
            const alt = (ads.alt || "").toLowerCase();
            const link = (ads.link || "").toLowerCase();

            return (
                title.includes(q) ||
                alt.includes(q) ||
                link.includes(q)
            )
        })
    }, [advertisement,search]);

    const total = allAdvertisement.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedAdvertisement = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return allAdvertisement.slice(start, start + limit)
    }, [allAdvertisement, currentPage, limit]);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

    const handlelLimitChange = (value: number) => {
        setLimit(value);
        setPage(1)
    };

    const limitOptions = useMemo(() => {
        const totalCount = allAdvertisement.length;

        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);

        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount];
    }, [allAdvertisement]);

    const pageIds = useMemo(() =>
        paginatedAdvertisement.map((ads) => ads._id),
        [paginatedAdvertisement]
    );

    const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
    const isSomePageSlected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);


    const toggleSelectAllPage = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((_id) => !pageIds.includes(_id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
        }
    };

    const toggleSelectedOne = (_id: string) => {
        setSelectedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])
    };

    const handelDeleteConfirm = async () => {
        console.log('delete')
    };

    const handelCreateConfirm = async () => {
        console.log('create ads')
    };

    const handelEditConfirm = async () => {
        console.log('edit ads')
    };

    const detailsAdvertisemenHandel = (_id: string) => {
        setAdvertisemenIdId(_id);
        setDetailsModal(true);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>لیست بنر</h3>
                    <Search
                        value={search}
                        onChange={handelSearchChange}
                    />
                </div>
                <button
                    onClick={() => setCreateModal(true)}
                    className='w-34.25 h-8 cursor-pointer bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>
                    ایجاد تبلیغ +
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
                            className='bi bi-align-bottom fill-fuchsia-500'
                            viewBox='0 0 16 16'
                        >
                            <rect width='4' height='12' x='6' y='1' rx='1'></rect>
                            <path d='M1.5 14a.5.5 0 0 0 0 1zm13 1a.5.5 0 0 0 0-1zm-13 0h13v-1h-13z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل تبلیغات</span>
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
                            className='bi bi-align-center fill-orange-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1m0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5M2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>جدید</span>
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
                            className='bi bi-activity fill-green-500'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>پر بازدید</span>
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
                            className='bi bi-align-top fill-blue-500'
                            viewBox='0 0 16 16'
                        >
                            <rect width='4' height='12' rx='1' transform='matrix(1 0 0 -1 6 15)'></rect>
                            <path d='M1.5 2a.5.5 0 0 1 0-1zm13-1a.5.5 0 0 1 0 1zm-13 0h13v1h-13z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <h4 className='text-[14px] font-IRANYekan-Bold'>کل مقالات</h4>
                        <button
                            type="button"
                            className={`
                                    cursor-pointer h-8 px-4 transition-all ease-in rounded-sm bg-red-500 hover:bg-red-800 text-white  items-center justify-center text-[13px]
                                    ${selectedIds.length ? "flex" : "hidden"}
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
                {
                    allAdvertisement.length ? (
                        <div className="mt-5">
                            <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllPageSelected}
                                        onChange={() => toggleSelectAllPage()}
                                        ref={(el) => {
                                            if (el) el.indeterminate = isSomePageSlected
                                        }}
                                        className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                </div>
                                <div>ردیف</div>
                                <div>عنوان</div>
                                <div>تاریخ شروع</div>
                                <div>تاریخ پایان</div>
                                <div>تبلیغ کننده</div>
                                <div>سایر</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedAdvertisement.map((ads, index) => (
                                    <div key={ads._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr_3fr] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(ads._id)}
                                                onChange={() => toggleSelectedOne(ads._id)}
                                                className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{ads.title}</div>
                                        <div>{new Date(ads.startDate).toLocaleDateString("fa-ir")}</div>
                                        <div>{new Date(ads.endDate).toLocaleDateString("fa-ir")}</div>
                                        <div>{ads.advertiserName}</div>
                                        <div className={ads.isActive ? "bg-green-100" : "bg-red-100"}>{ads.isActive ? "فعال" : "غیر فعال"}</div>
                                        <div className='flex items-center justify-center gap-x-2'>
                                            <button
                                                type="button"
                                                onClick={() => detailsAdvertisemenHandel(ads._id)}
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
                                                onClick={() => setEditModal(true)}
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
                                            onChange={(e) => handlelLimitChange(Number(e.target.value))}
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
                        <EmptyPage name='تبلیغ' text='تبلیغات' />
                    )
                }
                {
                    deleteModal && (
                        <DeleteModal
                            confirmBtn={handelDeleteConfirm}
                            closeBtn={() => setDeleteModal(false)}
                            text='تبلیغ'
                        />
                    )
                }
                {
                    createModal && (
                        <CreateAdvertisement
                            confirm={handelCreateConfirm}
                            close={() => setCreateModal(false)}
                        />
                    )
                }
                {
                    editModel && (
                        <EditAdvertisement
                            confirm={handelEditConfirm}
                            close={() => setEditModal(false)}
                        />
                    )
                }
                {
                    detailsModal && (
                        <DetailsAdvertisement 
                            close={() => setDetailsModal(false)}
                            _id={advertisemenId!}
                            advertisement={allAdvertisement as Advertisement[]}
                        />
                    )
                }
            </div>
        </>
    )
}

export default AdvertisementList;