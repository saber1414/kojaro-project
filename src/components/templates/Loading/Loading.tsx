import React from 'react'

const Loading = () => {
    return (
        <>
            <div className="fixed left-0 right-0 top-0 bottom-0 z-40 bg-overview">
                <div className="w-[15%] absolute left-0 right-0 top-[30%] p-4 rounded-lg bg-white my-0 mx-auto flex items-center justify-center flex-col gap-y-4">
                    <img src="/images/kojaro.png" className='' alt="loading image" />
                    <div className="loading"></div>
                </div>
            </div>
        </>
    )
}

export default Loading;