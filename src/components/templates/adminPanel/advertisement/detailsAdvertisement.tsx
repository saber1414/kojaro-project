import { Advertisement } from '@/types/advertisement';
import React, { useMemo } from 'react'

type DetailsAdvertisementProps = {
    _id: string;
    close: () => void;
    advertisement: Advertisement[]
};

const DetailsAdvertisement = ({ _id, close, advertisement }: DetailsAdvertisementProps) => {
    const detailsAds = useMemo(() =>
        advertisement.find((ads) => ads._id === _id),
        [advertisement, _id]
    );

    return (
        <div onClick={close} className='fixed top-0 right-0 left-0 bottom-0 bg-overview z-20'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>جزئیات بیشتر</span>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className="w-full h-px bg-gray-10 block mt-4"></span>
                <div className="grid grid-cols-[3fr_3fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-200 rounded-lg py-4 mb-2 mx-4 mt-5">
                    <div>تعداد بازدید</div>
                    <div>تعداد کلیک</div>
                    <div>ردیف نمایش</div>
                    <div>نام مدیر ایجاد کننده</div>
                    <div>عکس تبلیغ</div>
                    <div>محل استقرار</div>
                </div>
                <div className="grid grid-cols-[3fr_3fr_3fr_3fr_3fr_3fr] text-center items-center bg-gray-100 rounded-lg py-4 mb-2 mx-4">
                    <div>{detailsAds?.viewCount}</div>
                    <div>{detailsAds?.clickCount}</div>
                    <div>{detailsAds?.order}</div>
                    <div>{detailsAds?.createdBy.fullname || detailsAds?.createdBy.username}</div>
                    <div>
                        <img src={`${detailsAds?.image}`} alt={detailsAds?.title} />
                    </div>
                    <div>
                        {
                            detailsAds?.position === "home" && "خانه" ||
                            detailsAds?.position === "article" && "مقاله" ||
                            detailsAds?.position === "custom" && "پیش فرض" ||
                            detailsAds?.position === "footer" && "فوتر" ||
                            detailsAds?.position === "sidebar" && "سایدبار"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsAdvertisement;