"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Advertisement = () => {
    const [closeAdvertisement, setCloseAdvertisement] = useState<boolean>(true);

    return (
        <>
            {
                closeAdvertisement && (
                    <>
                        <div className="flex items-center">
                            <button onClick={() => setCloseAdvertisement(false)} type="button" className='cursor-pointer'>
                                <svg width="20" height="20" fill="currentColor" className="bi bi-x fill-gray-400" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                            <div className='w-full flex items-center gap-x-1'>
                                <span className='text-[13px] text-gray-400'>تبلیغات</span>
                                <span className='w-full h-px block bg-gray-200'></span>
                            </div>
                        </div>
                        <Link href="#" className='mt-1'>
                            <img src="/images/advertisement01.jpg" className='rounded-sm' alt="advertisement" />
                        </Link>
                    </>
                )
            }
        </>
    )
}

export default Advertisement;