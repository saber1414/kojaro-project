"use client"
import EmptyPage from '@/components/modules/AdminPanel/EmptyPage/EmptyPage';
import Search from '@/components/modules/AdminPanel/Search/Search';
import { Ticket, TicketCategory, TicketPriority, TicketStatus } from '@/types/ticket';
import React, { useMemo, useState } from 'react'

const ticketStatusLabel: Record<TicketStatus, string> = {
    open: "باز",
    in_progress: "در حال انجام",
    answered: "پاسخ داده شد",
    closed: "بسته",
    rejected: "رد شد"
};

const ticketCategoryLabel: Record<TicketCategory, string> = {
    technical: "فنی",
    content: "محتوا",
    account: "حساب",
    payment: "پرداخت",
    other: "سایر"
};

const ticketPriorityLabel: Record<TicketPriority, string> = {
    low: "پایین",
    medium: "متوسط",
    high: "سخت",
    urgent:"فوری"
};

const tickets: Ticket[] = [
    {
        _id: "6ac13e96673f83f99d70e157",
        subject: "موضوع تیکت",
        message: "این یک تیکت تستی می باشد",
        status: "open",
        priority: "medium",
        category: "other",
        createdBy: {
            _id: "6a8a996304e544b90136040c",
            username: "saber__dev",
            image: "images/profile13.png",
            role: "admin",
            fullname: "صابر اسماعیلی"
        },
        assignedTo: null,
        attachments: [],
        lastReplyAt: null,
        closedAt: null,
        closedBy: null,
        replies: [],
        createdAt: "2026-10-03T17:42:46.824Z",
        updatedAt: "2026-10-03T17:42:46.824Z"
    }
];

const TicketsList = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const allTickets = useMemo(() => {
        const onlyTickets = tickets;

        const q = search.trim().toLowerCase();
        if (!q) return onlyTickets;

        return onlyTickets.filter((ticket) => {
            const subject = ticket.subject;
            const status = ticket.status;
            const category = ticket.category;
            const priority = ticket.priority;

            return (
                subject.includes(q) || status.includes(q) || category.includes(q) || priority.includes(q)
            )
        })
    }, [tickets, search]);

    const total = allTickets.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);

    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return allTickets.slice(start, start + limit);
    }, [allTickets, currentPage, limit]);

    const goPrev = () => setPage((page) => Math.max(1, page - 1));
    const goNext = () => setPage((page) => Math.min(totalPages, page + 1))

    const handelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const handlelLimitChange = (value: number) => {
        setLimit(value);
        setPage(1)
    };

    const limitOptions = useMemo(() => {
        const totalCount = paginatedTickets.length;

        if (totalCount <= 0) return [10];

        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n < totalCount);
        if (!options.includes(totalCount)) options.push(totalCount);

        return options.length ? options : [totalCount];
    }, [paginatedTickets]);

    const pageIds = useMemo(() =>
        paginatedTickets.map((ticket) => ticket._id),
        [paginatedTickets]
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

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className='text-[14px] font-IRANYekan-Bold'>لیست تیکتها</h3>
                    <Search
                        value={search}
                        onChange={handelSearchChange}
                    />
                </div>
                <button
                    onClick={() => setCreateModal(true)}
                    className='w-34.25 h-8 cursor-pointer bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>
                    ایجاد تیکیت +
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
                            className='bi bi-ticket-perforated-fill fill-fuchsia-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4-1v1h1v-1zm1 3v-1H4v1zm7 0v-1h-1v1zm-1-2h1v-1h-1zm-6 3H4v1h1zm7 1v-1h-1v1zm-7 1H4v1h1zm7 1v-1h-1v1zm-8 1v1h1v-1zm7 1h1v-1h-1z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>کل تیکتها</span>
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
                            className='bi bi-ticket-fill fill-orange-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3z'></path>
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
                            className='bi bi-ticket-detailed-fill fill-green-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5m0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5M4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1'></path>
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
                            className='bi bi-ticket fill-blue-500'
                            viewBox='0 0 16 16'
                        >
                            <path d='M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z'></path>
                        </svg>
                    </div>
                    <div>
                        <span className='text-[14px] text-gray-icon font-IRANYekan-Bold'>سایر</span>
                        <p className='pt-2 text-[13px] font-IRANYekan-Bold'>تعداد: 0</p>
                    </div>
                </div>
            </div>
            {
                allTickets.length ? (
                    <div className="mt-10 bg-white p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <h4 className='text-[14px] font-IRANYekan-Bold'>تیکتها</h4>
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
                            <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllPageSelected}
                                        onChange={() => toggleSelectAllPage()}
                                        ref={(el) => {
                                            if (el) el.indeterminate = isSomePageSelected;
                                        }}
                                        className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                </div>
                                <div>ردیف</div>
                                <div>دسته بندی</div>
                                <div>وضعیت تیکیت</div>
                                <div>اولویت</div>
                                <div>مشخصات فرستنده</div>
                                <div>پیام</div>
                                <div>وضعیت</div>
                            </div>
                            {
                                paginatedTickets.map((ticket, index) => (
                                    <div key={ticket._id} className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr_3fr] text-center items-center bg-gray-50 rounded-lg py-4 mb-2">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(ticket._id)}
                                                onChange={() => toggleSelectedOne(ticket._id)}
                                                className='w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer' />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div>{ticketCategoryLabel[ticket.category]}</div>
                                        <div>{ticketStatusLabel[ticket.status]}</div>
                                        <div>{ticketPriorityLabel[ticket.priority]}</div>
                                        <div>{ticket.createdBy.fullname || ticket.createdBy.username}</div>
                                        <div>
                                            <button type="button" className='cursor-pointer text-[13px] bg-blueMenu w-50 h-8 text-white rounded-sm'>مشاهده</button>
                                        </div>
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
                        name='تیکتی'
                        text='تیکتها'
                    />
                )
            }
        </>
    )
}

export default TicketsList;