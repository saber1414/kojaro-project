import React, { useMemo, useState } from 'react'
import EmptyPage from '../../../modules/AdminPanel/EmptyPage/EmptyPage';
import EditSubMenu from './EditSubMenu';
import DeleteModal from '@/components/modules/AdminPanel/DeleteModal/DeleteModal';

export interface Menu {
    _id: string;
    name: string;
    slug: string;
    parentId: string | null;
    children: Menu[];
    icon: string | null;
    createdAt: string;
    updatedAt: string;
}

type DetailsMenuProps = {
    menus: Menu[];
    _id: string;
    confirm?: () => void;
    closeBtn: () => void;
};

const DetailsMenu = ({ confirm, closeBtn, menus, _id }: DetailsMenuProps) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editSubMenuModal, setEditSubMenuModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const parentMenu = useMemo(() =>
        menus.find((menu) => menu._id === _id),
        [menus, _id]
    );

    const subMenus = parentMenu?.children || [];

    const total = subMenus.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedSubMenus = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return subMenus.slice(start, start + limit)
    }, [subMenus]);

    const limitOptions = useMemo(() => {
        const totalCount = subMenus.length;

        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);

        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount];
    }, [subMenus]);

    const handleLimitChange = (value: number) => {
        setLimit(value);
        setPage(1);
    };

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1));

    const pageIds = useMemo(() =>
        paginatedSubMenus.map((subMenu) => subMenu._id),
        [paginatedSubMenus]
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

    const editSubMenuHandel = async () => {
        console.log('Edit sub menu')
    };

    const deleteSubMenuHandel = async() => {
        console.log('delete sub menu')
    }

    return (
        <>
            <div onClick={closeBtn} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
                <div onClick={(e) => e.stopPropagation()} className="2xl:w-[70%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] absolute top-[10%] right-0 left-0 mx-auto my-0 bg-white flex flex-col">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <span className='block w-1 h-5 absolute right-0 bg-green-500'></span>
                            <span className='text-[14px]'>جزئیات منو</span>
                        </div>
                        <button
                            type="button"
                            onClick={closeBtn}
                            className='cursor-pointer'>
                            <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                        </button>
                    </div>
                    <span className="w-full h-px bg-gray-10 block"></span>
                    <div className="flex items-center justify-between px-4 mt-4">
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
                    {
                        paginatedSubMenus.length ? (
                            <>
                                <div className="mt-5 grid grid-cols-[1fr_1fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2 mx-4">
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
                                    <div>زیر دسته ها</div>
                                    <div>وضعیت</div>
                                </div>
                                {
                                    paginatedSubMenus.map((subMenu, index) => (
                                        <div key={subMenu._id} className="grid grid-cols-[1fr_1fr_3fr_3fr] text-center items-center bg-gray-50 rounded-lg py-4 mb-2 mx-4">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(subMenu._id)}
                                                    onChange={() => toggleSelectedOne(subMenu._id)}
                                                    className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                            </div>
                                            <div>{index + 1}</div>
                                            <div>{subMenu.name}</div>
                                            <div className='flex items-center justify-center gap-x-2'>
                                                {
                                                    subMenu.children.length > 0 && (
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
                                                    )
                                                }
                                                <button
                                                    type="button"
                                                    onClick={() => setEditSubMenuModal(true)}
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
                            </>
                        ) : (
                            <EmptyPage name='زیر دسته' text='زیر دسته ها' />
                        )
                    }
                    <div className="flex items-center justify-between mt-5 mb-5 px-4">
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
            </div>
            {
                editSubMenuModal && (
                    <EditSubMenu
                        confirm={editSubMenuHandel}
                        closeBtn={() => setEditSubMenuModal(false)}
                    />
                )
            }
            {
                deleteModal && (
                    <DeleteModal 
                        confirmBtn={deleteSubMenuHandel}
                        closeBtn={() => setDeleteModal(false)}
                        text='زیر منو'
                    />
                )
            }
        </>
    )
}

export default DetailsMenu