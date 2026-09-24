import React from 'react'

const TableSkeleton = ({ rows = 10 }: { rows?: number }) => {
    return (
        <div className='animate-pulse mt-10 bg-white'>
            <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-center bg-gray-100 rounded-lg py-4 mb-2">
                <div className="flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-8 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-14 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-3 w-12 rounded bg-gray-200" />
                </div>
            </div>
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr_3fr] text-center bg-gray-50 rounded-lg py-4 mb-2"
                >
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-3 w-5 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-3 w-24 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-3 w-32 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <div className="w-8 h-8 rounded-md bg-gray-200" />
                        <div className="w-8 h-8 rounded-md bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableSkeleton;