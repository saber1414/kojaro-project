import React, { useMemo } from 'react';
import DOMPurify from 'dompurify'

type DetailsArticleProps = {
    content: string;
    close: () => void;
}

const DetailsArticle = ({ content, close }: DetailsArticleProps) => {
    const sanitizedContent = useMemo(() => {
        if (typeof window === "undefined") return "";

        return DOMPurify.sanitize(content);
    }, [content]);
    return (
        <div onClick={close} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
            <div
                onClick={(e) => e.stopPropagation()}
                className="2xl:w-[70%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] absolute top-[5%] right-0 left-0 mx-auto my-0 bg-white flex flex-col">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-green-500'></span>
                        <span className='text-[14px]'>متن مقاله</span>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className="w-full h-px bg-gray-10 block"></span>
                <div className="mt-2 px-2 h-170 overflow-y-scroll content">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
            </div>
        </div>
    )
}

export default DetailsArticle;