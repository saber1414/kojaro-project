import React from 'react'

type EmptyPageProp = {
    name: string;
    text: string;
}

const EmptyPage = ({name,text}:EmptyPageProp) => {
    return (
        <div className='mt-10 bg-white p-1 flex items-center justify-center flex-col rounded-lg'>
            <img src="/images/emptyImage.png" alt="empty image" className='w-40 mt-10 mb-2' />
            <span className='mb-2 block'>هیچ {name} یافت نشد</span>
            <p className='text-gray-icon text-[13px] mb-10'>{text} ثبت شده در اینجا نمایش داده خواهد شد</p>
        </div>
    )
}

export default EmptyPage