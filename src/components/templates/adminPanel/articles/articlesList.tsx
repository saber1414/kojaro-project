"use client"
import Search from '@/components/modules/AdminPanel/Search/Search';
import Link from 'next/link';
import React, { useState } from 'react'

const ArticlesList = () => {
    const [search, setSearch] = useState("")


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
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
                <Link
                    href="/adminPanel/createArticle"
                    className='w-34.25 h-8 bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm'>ایجاد مقاله +</Link>
            </div>
        </>
    )
}

export default ArticlesList;