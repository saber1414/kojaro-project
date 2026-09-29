type CreateArticleCategoryProps = {
    confirm: () => void;
    onCancle: () => void;
};

const CreateArticleCategory = ({ confirm, onCancle }: CreateArticleCategoryProps) => {
    return (
        <div onClick={onCancle} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
            <div onClick={(e) => e.stopPropagation()} className="w-[50%] rounded-sm absolute top-[30%] right-0 left-0 mx-auto my-0 bg-white flex flex-col">
                <div className="flex items-center justify-between px-4 mt-2">
                    <h3 className="text-[14px] font-IRANYekan-Bold">ایجاد دسته بندی</h3>
                    <button
                        type="button"
                        onClick={onCancle}
                        className='cursor-pointer'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            fill='currentColor'
                            className='bi bi-x'
                            viewBox='0 0 16 16'
                        >
                            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708'></path>
                        </svg>
                    </button>
                </div>
                <span className='block h-px w-full my-2 bg-gray-100'></span>
                <form className='my-2 px-4'>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col w-[48%]">
                            <label className='text-[13px] mb-2'>نام دسته بندی</label>
                            <input type="text" placeholder='نام دسته بندی' className='w-full h-10 bg-gray-50 rounded-sm text-[13px] text-gray-icon placeholder:text-[13px] pr-2 border border-gray-100' />
                        </div>
                        <div className="flex flex-col w-[48%]">
                            <label className='text-[13px] mb-2'>مسیر دسته بندی</label>
                            <input dir='ltr' type="text" placeholder='/category' className='w-full h-10 bg-gray-50 rounded-sm text-[13px] text-gray-icon placeholder:text-[13px] pl-2 border border-gray-100' />
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button
                            type="button"
                            onClick={confirm}
                            className='bg-blueMenu w-30 h-8 rounded-sm text-[13px] text-white cursor-pointer'>ایجاد</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateArticleCategory;