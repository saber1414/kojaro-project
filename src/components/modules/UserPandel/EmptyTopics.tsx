import React from 'react'

const EmptyTopics = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-63">
            <img src="/images/no-result.png" alt="no-result img" />
            <span className='font-IRANYekan-Bold block py-2 text-[14px]'>چیزی پیدا نشد!</span>
            <span className='text-[13px] text-gray-400'>دوباره جستجو کن</span>
        </div>
    )
}

export default EmptyTopics