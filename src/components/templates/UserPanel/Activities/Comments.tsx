"use client"
import EmptyComments from '@/components/modules/UserPandel/EmptyComments'
import React, { useState } from 'react'

const Comments = () => {
    const [tab, setTab] = useState("all");

    return (
        <>
            <div className="mt-5">
                <h3 className="text-[14px] font-IRANYekan-Bold mb-10">فهرست تمامی دیدگاه‌های شما</h3>
                <div className="mt-5 relative">
                    <div className="flex items-center justify-center gap-x-6">
                        <button
                            type="button"
                            onClick={() => setTab("all")}
                            className={`cursor-pointer font-IRANYekan-Light ${tab === "all" && "text-blueMenu font-IRANYekan-Bold"}`}>همه</button>
                        <button
                            type="button"
                            onClick={() => setTab("comments")}
                            className={`cursor-pointer font-IRANYekan-Light ${tab === "comments" && "text-blueMenu font-IRANYekan-Bold"}`}>دیدگاه ها</button>
                        <button
                            type="button"
                            onClick={() => setTab("questions")}
                            className={`cursor-pointer font-IRANYekan-Light ${tab === "questions" && "text-blueMenu font-IRANYekan-Bold"}`}>سوالات</button>
                        <button
                            type="button"
                            onClick={() => setTab("analysis")}
                            className={`cursor-pointer font-IRANYekan-Light ${tab === "analysis" && "text-blueMenu font-IRANYekan-Bold"}`}>برسی</button>
                    </div>
                    <span className='block bg-gray-200 w-full h-px my-4'></span>
                    <div className="mt-10">
                        <EmptyComments />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments;