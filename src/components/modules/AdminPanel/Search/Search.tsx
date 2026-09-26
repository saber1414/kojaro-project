import React from 'react'

type SearchProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const Search = ({ value, onChange }: SearchProps) => {
    return (
        <div className="bg-white w-88 h-10.5 rounded-md px-2 flex items-center gap-x-2">
            <svg
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 16 16'
            >
                <path
                    stroke='#AEB9E1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.26 12.945a5.926 5.926 0 1 0 0-11.852 5.926 5.926 0 0 0 0 11.852M14.667 14.426l-3.223-3.222'
                ></path>
            </svg>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className='w-full h-full text-[13px] font-IRANYekan-Bold placeholder:text-[13px] text-gray-icon'
                placeholder='جستوجو...' />
        </div>
    )
}

export default Search;