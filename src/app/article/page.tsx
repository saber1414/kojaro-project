import AdsAbove from '@/components/modules/AdsAbove/AdsAbove'
import Footer from '@/components/modules/Footer/Footer'
import MobileNavbar from '@/components/modules/Header/MobileNavbar'
import Navbar from '@/components/modules/Header/Navbar'
import ArticleBox from '@/components/templates/Article/Article'
import Special from '@/components/templates/Index/Special/Special'

const Article = () => {
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
            <ArticleBox />
            <Special />
            <Footer />
        </>
    )
}

export default Article;