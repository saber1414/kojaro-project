
type CreateNotificationProps = {
    confirm: () => void;
    close: () => void;
};

const CreateNotification = ({ confirm, close }: CreateNotificationProps) => {
    return (
        <div onClick={close} className='fixed top-0 right-0 left-0 bottom-0 bg-overview z-20'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>ایجاد اعلان</span>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <form className='flex justify-between flex-wrap gap-y-4'>
                    <div className="w-[50%] flex flex-col">
                        <label className='text-[14px] mb-4'>عنوان</label>
                        <input type="text" className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='عنوان' />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className='text-[14px] mb-4'>عنوان</label>
                        <textarea className='bg-white pr-4 h-50 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm pt-2' placeholder='توضیحات'></textarea>
                    </div>
                    <div className="w-[48%] flex flex-col"></div>
                    <div className="flex justify-end w-full">
                        <button onClick={confirm} type="button" className='w-35 h-10 cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-blueMenu'>ذخیره</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNotification;