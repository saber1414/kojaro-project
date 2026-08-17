import AdsAbove from '@/components/modules/AdsAbove/AdsAbove'
import Footer from '@/components/modules/Footer/Footer'
import MobileNavbar from '@/components/modules/Header/MobileNavbar'
import Navbar from '@/components/modules/Header/Navbar'
import Profile from '@/components/modules/UserPandel/Profile'
import SettingsBox from '@/components/templates/UserPanel/Settings/SettingsBox'

const Settings = () => {
    return (
        <>
            <AdsAbove />
            {/* desktop navbar */}
            <div className="w-full pt-4 pb-2 sticky top-0 z-20 bg-white hidden lg:block">
                <Navbar />
            </div>
            {/* mobile navbar */}
            <div className="w-full pt-4 pb-4 sticky top-0 z-20 bg-white shadow block lg:hidden">
                <MobileNavbar />
            </div>
            <Profile
                title='تنظیمات'
                description='در این صفحه می‌توانید تنظیمات مربوط به اعلانات، کامنت‌ها، اطلاعات کاربری، گذرواژه را مشاهده و تغییر دهید'
            />
            <SettingsBox />
            <Footer />
        </>
    )
}

export default Settings;