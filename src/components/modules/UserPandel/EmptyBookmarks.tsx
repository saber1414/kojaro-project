import React from 'react'

const EmptyBookmarks = () => {
  return (
    <>
        <div className="w-full h-133 bg-white rounded-sm mt-5">
            <div className="flex flex-col items-center justify-center gap-y-2 h-[inherit]">
                <img src="/images/no-article.png" alt="no-article" />
                <p className="font-IRANYekan-Bold text-[14px]">مطلبی پیدا نشد!</p>
                <span className='text-[13px] text-gray-500'>دوباره جستجو کن</span>
            </div>
        </div>
    </>
  )
}

export default EmptyBookmarks;