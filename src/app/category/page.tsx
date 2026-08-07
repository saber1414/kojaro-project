import AdsAbove from '@/components/modules/AdsAbove/AdsAbove'
import Footer from '@/components/modules/Footer/Footer'
import MobileNavbar from '@/components/modules/Header/MobileNavbar'
import Navbar from '@/components/modules/Header/Navbar'
import CategoryList from '@/components/templates/Categories/CategoryList'
import HeadCategory from '@/components/templates/Categories/HeadCategory'
import Advertisement from '@/components/templates/Index/Advertisement/Advertisement'
import AdvertisementMobile from '@/components/templates/Index/Advertisement/AdvertisementMobile'
import PlacesOfInterest from '@/components/templates/Index/PlacesOfInterest/PlacesOfInterest'
import SideSection from '@/components/templates/Index/SideSection/SideSection'
import Special from '@/components/templates/Index/Special/Special'

const Category = () => {
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
            <HeadCategory />
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <CategoryList />
                <Advertisement />
                <SideSection />
                <Special />
            </div>
            <div className="block lg:hidden">
                <AdvertisementMobile />
            </div>
            <Footer />
        </>
    )
}

export default Category;