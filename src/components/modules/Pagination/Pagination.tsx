import React from 'react'

const Pagination = () => {
    return (
        <>
            <ul className='mt-10 flex items-center gap-x-4'>
                <li>
                    <button type="button" className='cursor-pointer'>
                        <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>
                    </button>
                </li>
                <li>
                    <button type='button' className='cursor-pointer flex items-center justify-center mb-1 w-8 h-8 rounded-full bg-dark text-white'>1</button>
                </li>
                <li>
                    <button type='button' className='cursor-pointer flex items-center justify-center text-gray-500 mb-1'>2</button>
                </li>
                <li>
                    <button type='button' className='cursor-pointer flex items-center justify-center text-gray-500 mb-1'>3</button>
                </li>
                <li>
                    <button type="button" className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Pagination;