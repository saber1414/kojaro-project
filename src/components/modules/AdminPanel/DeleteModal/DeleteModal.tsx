import React from 'react'

type DeleteModalProps = {
    confirmBtn: () => void;
    closeBtn: () => void;
    text: string;
}

const DeleteModal = ({ closeBtn, confirmBtn, text }: DeleteModalProps) => {
    return (
        <div
            onClick={closeBtn}
            className="fixed bg-overview top-0 right-0 left-0 bottom-0 z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='2xl:w-[30%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] h-49.5 absolute top-[30%] right-0 left-0 mx-auto my-0 bg-white flex flex-col'>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-red-500'></span>
                        <span className='text-[14px]'>حذف هشدار</span>
                    </div>
                    <button
                        type="button"
                        onClick={closeBtn}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <div className='px-4'>
                    <p className='text-[14px] font-IRANYekan-Bold'>آیا از حذف این {text} مطمئن هستید؟</p>
                    <span className='text-[14px] pt-3 text-gray-500 block'>
                        <small className='text-red-400 text-[10px] pl-'>هشدار:</small>
                        این مورد قابل بازگردانی نسیت
                    </span>
                </div>
                <div className="bg-gray-100 h-12 mt-auto flex items-center">
                    <button
                        type="button"
                        onClick={confirmBtn}
                        className='cursor-pointer w-48.75 flex mx-2 rounded-full h-8 items-center justify-center bg-white shadow'>
                        <span className='text-[13px] text-gray-500'>بله، حذف شود</span>
                    </button>
                    <button
                        type="button"
                        onClick={closeBtn}
                        className='cursor-pointer w-48.75 flex mx-2 rounded-full h-8 items-center justify-center border border-gray-200'>
                        <span className='text-[13px] text-gray-500'>خیر، حذف نشود</span>
                    </button>
                </div>
            </div>
        </div>

    )
};

export default DeleteModal;