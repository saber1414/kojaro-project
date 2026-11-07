import React from 'react'

type AnswerCommentProps = {
    _id?: string
    onClose: () => void;
}

const AnswerComment = ({ _id, onClose }: AnswerCommentProps) => {
    return (
        <div onClick={onClose} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
            <div onClick={(e) => e.stopPropagation()} className="2xl:w-[70%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] absolute top-[10%] right-0 left-0 mx-auto my-0 bg-white flex flex-col">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-green-500'></span>
                        <span className='text-[14px]'>پاسخ دیدگاه</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className="w-full h-px bg-gray-10 block"></span>
                <div className="mt-5 mb-2 px-4">
                    <div className="mb-5">
                        <div className="flex items-center gap-x-1 relative">
                            <img src="/images/profile21.png" alt="user image" className='w-8' />
                            <span className='block absolute w-2 h-2 rounded-full bottom-0 bg-green-500'></span>
                            <small className='text-gray-400'>saber__dev</small>
                        </div>
                    </div>
                    <form className=''>
                        <label className='text-[13px] pb-2 block'>متن پاسخ</label>
                        <textarea placeholder='متن پاسخ' className='w-full h-50 bg-gray-50 pt-1 pr-2 placeholder:text-[13px] text-[14px]'></textarea>
                        <div className="mt-5 flex items-center justify-end">
                            <button type="submit" className='bg-blueMenu cursor-pointer text-white text-[14px] flex items-center justify-center rounded-sm w-35 h-10'>ارسال</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AnswerComment;