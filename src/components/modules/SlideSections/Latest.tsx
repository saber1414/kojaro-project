"use client"
import Link from 'next/link'

const Latest = () => {
    const latestArray = [
        {
            id: 1,
            title: "انحراف ستون‌های کاخ چهلستون به دلیل حمله موشکی تایید شد",
            shortDescription: "انحراف و کمانش در ستون‌های اطراف حوض میانی کاخ‌موزه چهلستون اصفهان و آسیب‌دیدگی سازه‌ای این بنای تاریخی به صورت رسمی تایید شد.",
            image: "/images/image14.jpg"
        },
        {
            id: 2,
            title: "هشدار فوری کره جنوبی به شهروندان خود برای خروج از خاورمیانه",
            shortDescription: "وزارت امور خارجه کره جنوبی به شهروندان خود در خاورمیانه هشدار داد که به دلیل تشدید تنش‌ها بی‌درنگ از این منطقه خارج شوند.",
            image: "/images/image15.jpg"
        },
        {
            id: 3,
            title: "سرای سعدالسلطنه قزوین؛ شاهکار معماری قاجار با حال‌وهوایی متفاوت",
            shortDescription: "سرای سعدالسلطنه، با معماری باشکوه قاجاری، کافه‌ها، بازار صنایع دستی و موزه‌های دیدنی، از مهم‌ترین جاذبه‌های قزوین است.",
            image: "/images/image16.jpg"
        },
        {
            id: 4,
            title: "آسیب شدید به گردشگری دریایی و فرودگاه‌های سیستان و بلوچستان در پی حملات اخیر",
            shortDescription: "حملات اخیر به استان سیستان و بلوچستان بیش از ۲ هزار میلیارد تومان به زیرساخت‌های غیرنظامی، فرودگاه‌ها و بخش گردشگری دریایی خسارت وارد کرده است.",
            image: "/images/image17.jpg"
        },
        {
            id: 5,
            title: "سامانه فروش بلیت قطار از کار افتاد",
            shortDescription: "سامانه پیش‌فروش بلیت قطارهای مسافری برای نیمه اول مردادماه به دلیل اختلال فنی از دسترس خارج شد.",
            image: "/images/image18.jpg"
        },
        {
            id: 6,
            title: "سفر به غار یخی چما ممنوع شد",
            shortDescription: "رئیس اداره میراث‌فرهنگی، گردشگری و صنایع‌دستی شهرستان کوهرنگ درباره خطر ریزش غار یخی چما و لزوم خودداری گردشگران از ورود به آن هشدار داد.",
            image: "/images/image19.jpg"
        },
    ];

    return (
        <div className="mt-10">
            {
                latestArray.map((latest) => (
                    <div key={latest.id} className="border-b border-gray-200 pb-4 pt-4 flex flex-col-reverse sm:flex-row gap-x-4 lg:justify-normal justify-between">
                        <div className="xl:w-137.5 lg:w-90 md:w-120 sm:w-90 w-full h-auto flex flex-col justify-between">
                            <div>
                                <Link href="#" className='font-IRANYekan-Bold xl:text-[18px] text-[15px] sm:pt-0 pt-5 block'>
                                    {latest.title}
                                </Link>
                                <p className='text-[14px] text-gray-500 pt-3 font-IRANYekan-Light'>{latest.shortDescription}</p>
                            </div>
                            <div className="flex items-center gap-x-4 pt-4 xl:pt-0">
                                <div className='flex items-center gap-x-2'>
                                    <svg width="16" height="16" viewBox="0 0 256 256" className="fill-gray-400"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                                    <span className='text-gray-400 text-[13px]'>0</span>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <svg width="16" height="16" className="fill-gray-400" viewBox="0 0 256 256"><path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z"></path></svg>
                                    <span className='text-gray-400 text-[13px]'>3 روز قبل</span>
                                </div>
                                <button type="button" className='flex items-center gap-x-2 cursor-pointer'>
                                    <svg width="16" className='fill-gray-400' height="16" viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                                    <span className='text-gray-400 text-[13px]'>بوکمارک</span>
                                </button>
                            </div>
                        </div>

                        <Link href="#" className='sm:w-35 w-full sm:h-35 h-full'>
                            <img src={latest.image} className='w-[inherit] h-[inherit] rounded-lg' alt={latest.title} />
                        </Link>
                    </div>
                ))
            }
            <div className="mt-5">
                <Link href="#" className='flex items-center gap-x-2'>
                    <span className='text-[13px] font-IRANYekan-Bold'>مشاهده مطالب بیشتر</span>
                    <svg width="12" height="12" viewBox="0 0 256 256" className="fill-blueMenu"><path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path></svg>
                </Link>
            </div>
        </div>
    )
}

export default Latest;