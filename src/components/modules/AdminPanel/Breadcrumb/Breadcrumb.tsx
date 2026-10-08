import Link from 'next/link';
import React from 'react'

const Breadcrumb = () => {
    return (
        <>
            <div className="mt-5 flex items-center gap-x-2">
                <Link href="/adminPanel" className='text-[13px] text-green-1'>جدول</Link>
                <span className='block'>/</span>
                <Link href="/adminPanel" className='text-[13px]'>کاربران</Link>
            </div>
        </>
    )
}

export default Breadcrumb;