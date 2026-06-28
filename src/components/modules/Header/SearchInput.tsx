import React from 'react'

type SearchInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    closeBtn: () => void;
}

const SearchInput = ({ value, onChange, closeBtn }: SearchInputProps) => {
    return (
        <div className='relative'>
            <div className='w-162.5 rounded-full h-9 border border-dark overflow-hidden px-1 flex items-center gap-x-2'>
                {
                    value.length > 0 ? (
                        <button onClick={closeBtn} type="button" className='w-7 h-7 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center'>
                            <svg width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </button>
                    ) : (
                        <button type="button" className='w-7 h-7 rounded-full bg-sky-500 cursor-pointer flex items-center justify-center'>
                            <svg width="12" height="12" fill="currentColor" className="bi bi-search fill-white" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    )
                }
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder='جستجو در مقاصد، جاهای دیدنی، هتل‌ها و رستوران‌ها ...'
                    className='w-full h-[inherit] text-[14px] placeholder:text-[14px] pr-2' />
            </div>
        </div>
    )
}

export default SearchInput;