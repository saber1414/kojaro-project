import Footer from '@/components/modules/Footer/Footer';
import InformationBox from '@/components/templates/UserPanel/Settings/Information/Information';
import Password from '@/components/templates/UserPanel/Settings/Information/Password';
import Sponsor from '@/components/templates/UserPanel/Settings/Information/Sponsor';
import Link from 'next/link';

const Information = () => {
    return (
        <>
            <div className="w-full h-14 bg-dark2 fixed z-30 md:block hidden">
                <div className="container h-[inherit] flex items-center justify-between">
                    <span className='text-white font-IRANYekan-Light text-[14px]'>اگر می‌خواهی به صفحه‌ قبلی که از آن آمدی برگردی، روی دکمه بازگشت کلیک کن</span>
                    <Link href="/userPanel/settings" className='flex items-center justify-between px-4 gap-x-2 w-24.25 rounded-full h-8.5 border border-white text-white text-[13px]'>
                        <span>بازگشت</span>
                        <svg width="20" height="20" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="bg-white w-full lg:h-100.25 p-4 md:mt-10">
                <div className="container">
                    <div className="flex lg:h-100.25 h-full lg:overflow-hidden lg:flex-row flex-col">
                        <div className="lg:w-[50%] w-full gap-y-4 flex flex-col md:mt-10">
                            <span className="text-red-500 font-IRANYekan-Bold">خوش آمدی!</span>
                            <h4 className="font-IRANYekan-Bold md:text-2xl">مدیریت حساب کاربری یکپارچه</h4>
                            <p className='text-gray-500 md:text-[16px] text-[13px] lien text-base/7 font-IRANYekan-Light'>با یک حساب کاربری می‌تونی در تمامی وب‌سایت‌های هولدینگ رسانه‌ای قلم شامل زومیت، زومجی، کجارو، پدال، فیلمزی و زوبین، فعالیت کنی. اینجا می‌تونی اطلاعات اصلی حساب کاربری یکپارچه خودت رو مشاهده کنی و تغییر بدی. همچنین تنظیمات امنیتی حساب کاربری مثل گذرواژه و تاریخ آخرین تغییرش رو ببینی.</p>
                        </div>
                        <div className="lg:w-[50%] w-full mt-10">
                            <img src="/images/after-login-back-v-2.png" className='md:w-130.75 md:h-100 w-[inherit] h-[inherit] lg:mx-0 lg:my-0 mx-auto my-0' alt="img" />
                        </div>
                    </div>
                </div>
            </div>
            <InformationBox />
            <Password />
            <Sponsor />
            <Footer />
        </>
    )
}

export default Information;