import React from 'react'

const EmptyComments = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-63">
            <img src="/images/no-comment.png" alt="no-result img" />
            <span className='font-IRANYekan-Bold block py-2 text-[14px]'>هنوز چیزی ثبت نشده!</span>
            <span className='text-[13px] text-gray-400'>منتظر مشارکت شما هستیم</span>
        </div>
    )
}

export default EmptyComments