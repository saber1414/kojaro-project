"use client"
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import React, { useMemo, useState } from 'react'

const users = [
    { _id: 1, name: "صابر اسماعیلی", username: "Saber__dev", email: "saber.esmaili1414@gmail.com", phone: "09333943645", role: "author" },
    { _id: 2, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
    { _id: 3, name: "علی احمدی", username: "ali_ahmadi", email: "ali.ahmadi001@gmail.com", phone: "09215598741", role: "user" },
    { _id: 4, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
    { _id: 5, name: "صابر اسماعیلی", username: "Saber__dev", email: "saber.esmaili1414@gmail.com", phone: "09333943645", role: "user" },
    { _id: 6, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--", role: "user" },
    { _id: 7, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--", role: "author" },
    { _id: 8, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "09333943645", role: "author" },
    { _id: 9, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
    { _id: 10, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "09333943645", role: "author" },
    { _id: 11, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--", role: "author" },
    { _id: 12, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--", role: "author" },
    { _id: 13, name: "--", username: "saberd", email: "sasan_mohammadi00@gmail.com", phone: "--", role: "author" },
];

const AuthorList = () => {
    const authors = useMemo(() =>
        users.filter((author) => author.role === "author"),
        [users]
    );
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const total = authors.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const paginatedAuthros = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return authors.slice(start, start + limit);
    }, [authors, currentPage, limit]);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

    const limitOptions = useMemo(() => {
        const totalCount = authors.length;
        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);

        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount]
    }, [authors.length]);

    const handleLimitChange = (value: number) => {
        setLimit(value);
        setPage(1)
    };

    const pageIds = useMemo(() =>
        paginatedAuthros.map((auhtor) => auhtor._id),
        [paginatedAuthros]
    );

    const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
    const isSomePageSlected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);

    const toggleSelectedOne = (_id: number) => {
        setSelectedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])
    };

    const toggleSelectAllPage = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((_id) => !pageIds.includes(_id)))
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])))
        }
    };

    const deleteAllHandel = async () => {
        console.log('delete all')
    };

    const confirmSubmitHandle = async () => {
        console.log("delete",)
    };

    const operationCancelled = () => {
        setDeleteModal(false)
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>لیست نویسندگان</h3>
                    <div className="bg-white w-88 h-10.5 rounded-md px-2 flex items-center gap-x-2">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                stroke='#AEB9E1'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M7.26 12.945a5.926 5.926 0 1 0 0-11.852 5.926 5.926 0 0 0 0 11.852M14.667 14.426l-3.223-3.222'
                            ></path>
                        </svg>
                        <input type="text" className='w-full h-full text-[13px] font-IRANYekan-Bold placeholder:text-[13px] text-gray-icon' placeholder='جستوجو...' />
                    </div>
                </div>
                <button type='button' className='w-34.25 h-8 bg-green-1 text-white cursor-pointer text-[13px] rounded-sm'>افزودن کاربر جدید</button>
            </div>
            <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#CB3CFF'
                                d='M5.127 7.48c.51 0 .977-.237 1.355-.6-.396-.712-.622-1.516-.622-2.288 0-.655.157-1.272.435-1.817a2.25 2.25 0 0 0-1.18-.335c-1.263 0-2.287 1.038-2.287 2.32 0 1.28 1.036 2.72 2.3 2.72M6.666 8.58a3.3 3.3 0 0 0-.692-.075H4.273a3.283 3.283 0 0 0-3.278 3.288l.008.389c0 .507.41.918.916.918h1.677a5.18 5.18 0 0 1 3.07-4.52M9.808 7.965c1.566 0 2.821-1.785 2.821-3.373s-1.27-2.877-2.836-2.877-2.836 1.288-2.836 2.877 1.285 3.373 2.85 3.373'
                            ></path>
                            <path
                                fill='#CB3CFF'
                                d='M14.921 13.314a4.07 4.07 0 0 0-4.063-4.077h-2.11a4.07 4.07 0 0 0-4.063 4.077l.01.482c0 .629.508 1.139 1.135 1.139h7.966c.627 0 1.135-.51 1.135-1.14z'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل نویسندگان</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                            width='14'
                            height='15'
                            fill='none'
                            viewBox='0 0 14 15'
                        >
                            <path
                                fill='#FDB52A'
                                d='M0 13.454a4.44 4.44 0 0 1 4.438-4.438h4.904a4.44 4.44 0 0 1 4.438 4.438 1.48 1.48 0 0 1-1.48 1.48H1.48A1.48 1.48 0 0 1 0 13.453M6.892 7.89c2.169 0 3.927-1.767 3.927-3.945S9.06 0 6.892 0 2.966 1.766 2.966 3.945s1.758 3.944 3.926 3.944'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>نویسندگان جدید</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#05C168'
                                d='M11.502.889a4.4 4.4 0 0 0-3.539 1.777 4.42 4.42 0 0 0-2.22-1.575 4.4 4.4 0 0 0-2.718.026c-.88.295-1.647.86-2.19 1.617A4.46 4.46 0 0 0 0 5.334c0 5.325 7.366 9.525 7.676 9.703.087.05.187.075.287.074.1.002.2-.024.288-.074a23 23 0 0 0 3.797-2.785c2.573-2.326 3.878-4.652 3.878-6.919 0-1.179-.466-2.31-1.295-3.143A4.41 4.41 0 0 0 11.502.89'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>نویسندگان برتر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <svg
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill='#086CD9'
                                d='M7.963 0C6.388 0 4.85.47 3.54 1.348a8 8 0 0 0-2.933 3.59 8.03 8.03 0 0 0 1.726 8.719 7.93 7.93 0 0 0 8.678 1.734 7.97 7.97 0 0 0 3.574-2.946A8.03 8.03 0 0 0 15.926 8a8.03 8.03 0 0 0-2.337-5.652A7.96 7.96 0 0 0 7.963 0M4.288 8.923a.92.92 0 0 1-.849-.57.927.927 0 0 1 .67-1.258.915.915 0 0 1 .943.392.926.926 0 0 1-.114 1.166.92.92 0 0 1-.65.27m3.675 0a.92.92 0 0 1-.849-.57.93.93 0 0 1 .2-1.006A.918.918 0 0 1 8.881 8c0 .245-.097.48-.27.653a.92.92 0 0 1-.649.27m3.676 0a.92.92 0 0 1-.85-.57.93.93 0 0 1 .2-1.006.917.917 0 0 1 1.568.653.917.917 0 0 1-.919.923'
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر نویسندگان</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 1</p>
                    </div>
                </div>
            </div>
            {/* table */}
            <div className="mt-10 bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <h4 className='text-[14px] font-IRANYekan-Bold'>کل نویسندگان</h4>
                        <button
                            type="button"
                            onClick={deleteAllHandel}
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
                <span className='w-full h-px bg-gray-10 mt-5 block'></span>
                {/* table */}
                {
                    users.length ? (
                        <div className="mt-5">
                            <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
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
                                <div>نام و نام خانوادگی</div>
                                <div>نام کاربری</div>
                                <div>ایمیل</div>
                                <div>تلفن</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedAuthros.map((user, index) => (
                                    <div key={user._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(user._id)}
                                                onChange={() => toggleSelectedOne(user._id)}
                                                className='w-4 h-4 rounded accent-green-1 border-gray-300 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{user.name}</div>
                                        <div>{user.username}</div>
                                        <div>{user.email}</div>
                                        <div>{user.phone}</div>
                                        <div className='flex items-center justify-center gap-x-2'>
                                            <button
                                                type="button"
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
                    ) : (
                        <EmptyPage name='نویسنده' text='نویسندگان' />
                    )
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
            {
                deleteModal && (
                    <DeleteModal 
                        confirmBtn={confirmSubmitHandle}
                        closeBtn={operationCancelled}
                        text='نویسنده'
                    />
                )
            }
        </>
    )
}

export default AuthorList;