"use client"
import Link from 'next/link';

const LocalFood = () => {
    const localFoods = [
        {
            id: 1,
            title: "شربت گل‌ محمدی؛ نوشیدنی خوش‌رنگ و معطر تابستان",
            image: "/images/food01.jpg",
            readCount: 5,
            date: "۱ روز قبل"
        },
        {
            id: 2,
            title: "طرز تهیه شربت زعفران؛ یک نوشیدنی سنتی گوارا",
            image: "/images/food02.jpg",
            readCount: 5,
            date: "2 روز قبل"
        },
        {
            id: 3,
            title: "طعم تابستان در یک لیوان؛ شربت شاه‌توت خانگی با رنگ و عطری بی‌نظیر",
            image: "/images/food03.jpg",
            readCount: 16,
            date: "۱۱ روز قبل"
        },
    ];

    const FoodBox = ({ item, isMain }: { item: typeof localFoods[0], isMain: boolean }) => {
        const isFirst = isMain;

        return (
            <div className={`${isFirst ? "col-span-2 row-span-1 h-100" : "col-span-1 row-span-1 h-50"} rounded-lg`}>
                <div className={` h-[inherit] px-4 rounded-md relative overflow-hidden bg-cover bg-no-repeat`}
                    style={{ backgroundImage: `url(${item.image})` }}
                >
                    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent'></div>
                    <div className="flex flex-col items-center justify-between h-[inherit] relative">
                        <Link href="#" className={`${isFirst ? "xl:text-2xl pt-15" : "xl:text-[16px] text-[14px] pt-8"} text-white font-IRANYekan-Bold block`}>
                            {item.title}
                        </Link>
                        <div className={`flex items-center justify-between pb-4 ${isFirst ? "-bottom-70" : "-bottom-25"} w-full`}>
                            <div className="flex items-center gap-x-2">
                                <svg width="12" height="12" className='fill-white' viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H157l19.52,19.51a12,12,0,0,1-17,17l-40-40A12,12,0,0,1,128,116h56A12,12,0,0,1,196,128Z"></path></svg>
                                <span className='text-[13px] text-white'>مطالعه {item.readCount}</span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <svg width="12" height="12" fill="var(--white)" viewBox="0 0 256 256" className="[&amp;&gt;*]:stroke-white fill-white"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                                <span className='text-[13px] text-white'>{item.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-10">
            <div className="flex items-center">
                <span className='block bg-blueMenu w-1 h-6 ml-4'></span>
                <h4 className="font-IRANYekan-Bold">تماشاخانه</h4>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                    <FoodBox item={localFoods[0]} isMain={true} />
                    {
                        localFoods.slice(1).map((item) => <FoodBox key={item.id} item={item} isMain={false} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default LocalFood;