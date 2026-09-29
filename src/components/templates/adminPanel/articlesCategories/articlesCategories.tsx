"use client"
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import Search from '@/components/modules/AdminPanel/Search/Search';
import React, { useMemo, useState } from 'react'
import CreateArticleCategory from './createCategory';
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';
import EditCategory from './editCategory';

const articleCategories = [
    { _id: "1", name: "دسته بندی 1", slug: "/category" },
    { _id: "2", name: "دسته بندی 2", slug: "/category2" },
    { _id: "3", name: "دسته بندی 3", slug: "/category3" },
    { _id: "4", name: "دسته بندی 4", slug: "/category4" },
    { _id: "5", name: "دسته بندی 5", slug: "/category5" },
    { _id: "6", name: "دسته بندی 6", slug: "/category6" },
    { _id: "7", name: "دسته بندی 7", slug: "/category7" },
    { _id: "8", name: "دسته بندی 8", slug: "/category8" },
    { _id: "9", name: "دسته بندی 9", slug: "/category9" },
    { _id: "10", name: "دسته بندی 10", slug: "/category10" },
    { _id: "11", name: "دسته بندی 11", slug: "/category11" },
]

const ArticleCategoriesList = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [createModel, setCreateModel] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const allCategories = useMemo(() => {
        const onlyCategories = articleCategories;

        const q = search.trim().toLowerCase();
        if (!q) return onlyCategories;

        return onlyCategories.filter((category) => {
            const name = (category.name || "").toLowerCase();
            const slug = (category.slug || "").toLowerCase();

            return (
                name.includes(q) || slug.includes(q)
            )
        });
    }, [articleCategories, search]);

    const total = allCategories.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages)

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

    const paginatedCategories = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return allCategories.slice(start, start + limit)
    }, [allCategories, currentPage, limit]);

    const pageIds = useMemo(() =>
        paginatedCategories.map((category) => category._id),
        [paginatedCategories]
    );

    const isAllPageSelected = pageIds.length > 0 && pageIds.every((_id) => selectedIds.includes(_id));
    const isSomePageSlected = pageIds.some((_id) => selectedIds.includes(_id) && !isAllPageSelected);

    const toggleSelectedOne = (_id: string) => {
        setSelectedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])
    };

    const toggleSelectAllPage = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((_id) => !pageIds.includes(_id)))
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])))
        }
    };

    const limitOptions = useMemo(() => {
        const totalCount = allCategories.length;
        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);
        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount]
    }, [allCategories]);

    const handleLimitChange = (value: number) => {
        setLimit(value)
        setPage(1)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const createCategoryHandel = async () => {
        console.log('create category')
    };

    const editCategoryHandel = async () => {
        console.log('edit category')
    }

    const confirmSubmitHandle = async () => {
        console.log("delete",)
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>دسته بندی مقالات</h3>
                    <Search
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    type='button'
                    onClick={() => setCreateModel(true)}
                    className='w-34.25 h-8 cursor-pointer bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>ایجاد دسته بندی +</button>
            </div>
            <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-journals fill-fuchsia-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2'></path>
                            <path d='M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>دسته بندی ها</span>
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
                            className='bi bi-journal-plus fill-orange-500'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5'
                            ></path>
                            <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'></path>
                            <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>دسته بندی جدید</span>
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
                            className='bi bi-journal-check fill-green-500'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0'
                            ></path>
                            <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'></path>
                            <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>دسته بندی برتر</span>
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
                            className='bi bi-journal-bookmark fill-blue-500'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8'
                            ></path>
                            <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'></path>
                            <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
                    </div>
                </div>
            </div>
            {
                paginatedCategories.length ? (
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
                                <div>نام دسته بندی</div>
                                <div>مسیر دسته بندی</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedCategories.map((category, index) => (
                                    <div key={category._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr] text-[14px] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(category._id)}
                                                onChange={() => toggleSelectedOne(category._id)}
                                                className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{category.name}</div>
                                        <div dir='ltr'>{category.slug}</div>
                                        <div className='flex items-center justify-center gap-x-2'>
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
                    <EmptyPage name='دسته بندی' text='دسته بندی ها' />
                )
            }
            {
                createModel && (
                    <CreateArticleCategory
                        confirm={createCategoryHandel}
                        onCancle={() => setCreateModel(false)}
                    />
                )
            }
            {
                deleteModal && (
                    <DeleteModal
                        confirmBtn={confirmSubmitHandle}
                        closeBtn={() => setDeleteModal(false)}
                        text='دسته بندی'
                    />
                )
            }
            {
                editModal && (
                    <EditCategory
                        confirm={editCategoryHandel}
                        onCancle={() => setEditModal(false)}
                    />
                )
            }
        </>
    )
}

export default ArticleCategoriesList;