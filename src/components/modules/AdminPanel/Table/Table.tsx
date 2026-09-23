"use client"
import React, { useEffect, useRef, useState } from 'react'

const Table = () => {
    const [hasOverflow, setHasOverflow] = useState<boolean>(false);
    const tableListRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (tableListRef.current && containerRef.current) {
                const contentHeight = tableListRef.current.scrollHeight;
                const containerHeight = containerRef.current.clientHeight;

                setHasOverflow(contentHeight > containerHeight);
            }
        };

        const timer = setTimeout(checkOverflow, 100);

        window.addEventListener("resize", checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkOverflow); // ✅ removeEventListener
        };
    }, []);

    const users = [
        { id: 1, name: "صابر اسماعیلی", username: "Saber__dev", email: "saber.esmaili1414@gmail.com", phone: "09333943645" },
        { id: 2, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
        { id: 3, name: "صابر اسماعیلی", username: "Saber__dev", email: "saber.esmaili1414@gmail.com", phone: "09333943645" },
        { id: 4, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
        { id: 5, name: "صابر اسماعیلی", username: "Saber__dev", email: "saber.esmaili1414@gmail.com", phone: "09333943645" },
        { id: 6, name: "--", username: "sasan_d", email: "sasan_mohammadi00@gmail.com", phone: "--" },
    ];

    return (
        <div className='bg-white w-full lg:w-[80%] p-4 rounded-lg shadow-sm sm:mt-4 md:mt-0'>
            <div className="mb-4">
                <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                    کاربران جدید 🎉
                </span>
            </div>
            <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                <div className="flex items-center justify-center">
                    <input type="checkbox" className='w-4 h-4 rounded border-gray-300 cursor-pointer' />
                </div>
                <div>ردیف</div>
                <div>نام و نام خانوادگی</div>
                <div>نام کاربری</div>
                <div>ایمیل</div>
                <div>تلفن</div>
                <div>وضعیت</div>
            </div>
            <div
                ref={containerRef}
                className="h-68 overflow-hidden"
            >
                <div
                    ref={tableListRef}
                    className={`
                        h-full
                        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500
                        transition-all duration-300
                        ${hasOverflow ? "overflow-y-auto" : "overflow-hidden"}
                    `}
                >
                    {users.map((user, index) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-center items-center text-[13px] text-gray-icon font-IRANYekan-Bold bg-gray-50 rounded-lg py-4 mt-2"
                        >
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                            </div>
                            <div>{index + 1}</div>
                            <div>{user.name}</div>
                            <div>{user.username}</div>
                            <div className="truncate px-2">{user.email}</div>
                            <div>{user.phone}</div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="button"
                                    className='cursor-pointer bg-red-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-200 transition-colors'
                                >
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
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Table;