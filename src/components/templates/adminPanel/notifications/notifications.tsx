"use client"
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import Search from '@/components/modules/AdminPanel/Search/Search';
import React, { useMemo, useState } from 'react'
import CreateNotification from './createNotification';
import EditNotification from './editNotification';
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';

const notifications = [
    {
        _id: "6abd4824b536978ff99cc8a9",
        title: "این یک اعلان تستی می باشد 🎉",
        description: "این یک توضیحات تستی می باشد",
        isActive: false,
        author: {
            _id: "6a8a996304e544b90136040c",
            username: "saber__dev",
            image: "images/profile13.png",
            fullname: "صابر اسماعیلی"
        },
        createdAt: "2026-09-30T17:34:28.976Z",
        updatedAt: "2026-09-30T17:34:28.976Z"
    },
    {
        _id: "6abd4824b536978ff99cc812",
        title: "بروزرسانی",
        description: "بخش مقالات بروزرسانی شد",
        isActive: true,
        author: {
            _id: "6a8a996304e544b90136040c",
            username: "saber__dev",
            image: "images/profile13.png",
            fullname: "صابر اسماعیلی"
        },
        createdAt: "2026-10-10T17:34:28.976Z",
        updatedAt: "2026-10-10T17:34:28.976Z"
    },
];

const NotificationsList = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [deleteModal,setDeleteModal] = useState<boolean>(false);

    const allNotifications = useMemo(() => {
        const onlyNotifications = notifications;

        const q = search.trim().toLowerCase();
        if (!q) return onlyNotifications;

        return onlyNotifications.filter((notification) => {
            const title = notification.title;

            return (title.includes(q))
        })
    }, [notifications, search]);

    const total = allNotifications.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedNotifications = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return allNotifications.slice(start, start + limit);
    }, [allNotifications]);

    const handelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const handlelLimitChange = (value: number) => {
        setLimit(limit);
        setPage(1)
    };

    const limitOptions = useMemo(() => {
        const totalCount = paginatedNotifications.length;

        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);

        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount]
    }, [paginatedNotifications]);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((prev) => Math.min(totalPages, page - 1));

    const pageIds = useMemo(() =>
        paginatedNotifications.map((notification) => notification._id),
        [paginatedNotifications]
    );

    const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
    const isSomePageSelected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);

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

    const hamdelCreateNotification = async () => {
        console.log('create notifcation')
    };

    const handelEditNotification = async () => {
        console.log('edit notification')
    };

    const handelDeleteNotification = async() => {
        console.log('delete notification')
    }

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
                    ایجاد اعلان +
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
                            className='bi bi-bell-fill fill-fuchsia-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>اعلان ها</span>
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
                            className='bi bi-bell fill-orange-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6'></path>
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
                            className='bi bi-app-indicator fill-green-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z'></path>
                            <path d='M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>خوانده نشده </span>
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
                            className='bi bi-alexa fill-blue-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M7.996 0A8 8 0 0 0 0 8a8 8 0 0 0 6.93 7.93v-1.613a1.06 1.06 0 0 0-.717-1.008A5.6 5.6 0 0 1 2.4 7.865 5.58 5.58 0 0 1 8.054 2.4a5.6 5.6 0 0 1 5.535 5.81l-.002.046-.012.192-.005.061a5 5 0 0 1-.033.284l-.01.068c-.685 4.516-6.564 7.054-6.596 7.068A7.998 7.998 0 0 0 15.992 8 8 8 0 0 0 7.996.001Z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
                    </div>
                </div>
            </div>
            {
                allNotifications.length ? (
                    <div className="mt-10 bg-white p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <h4 className='text-[14px] font-IRANYekan-Bold'>اعلانات</h4>
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
                        <div className="mt-5">
                            <div className="grid grid-cols-[1fr_1fr_3fr_5fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllPageSelected}
                                        onChange={() => toggleSelectAllPage()}
                                        ref={(el) => {
                                            if (el) el.indeterminate = isSomePageSelected
                                        }}
                                        className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                </div>
                                <div>ردیف</div>
                                <div>عنوان</div>
                                <div>توضیحات</div>
                                <div>اعلان</div>
                                <div>نویسنده اعلان</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedNotifications.map((notification, index) => (
                                    <div key={notification._id} className="grid grid-cols-[1fr_1fr_3fr_5fr_3fr_3fr_3fr] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(notification._id)}
                                                onChange={() => toggleSelectedOne(notification._id)}
                                                className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{notification.title}</div>
                                        <div>{notification.description}</div>
                                        <div className={`${notification.isActive ? "bg-green-100" : "bg-red-100"}`}>{notification.isActive ? "فعال" : "غیر فعال"}</div>
                                        <div>{notification.author.fullname || notification.author.username}</div>
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
                    </div>
                ) : (
                    <EmptyPage
                        name='اعلانی'
                        text='اعلان ها'
                    />
                )
            }
            {
                createModal && (
                    <CreateNotification
                        confirm={hamdelCreateNotification}
                        close={() => setCreateModal(false)}
                    />
                )
            }
            {
                editModal && (
                    <EditNotification
                        confirm={handelEditNotification}
                        close={() => setEditModal(false)}
                    />
                )
            }
            {
                deleteModal && (
                    <DeleteModal 
                        text='اعلان'
                        confirmBtn={handelDeleteNotification}
                        closeBtn={() => setDeleteModal(false)}
                    />
                )
            }
        </>
    )
}

export default NotificationsList;