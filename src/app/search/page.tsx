import MobileNavbar from '@/components/modules/Header/MobileNavbar'
import Navbar from '@/components/modules/Header/Navbar'
import SearchBox from '@/components/templates/Search/SearchBox'

const Search = () => {
    return (
        <>
            {/* desktop navbar */}
            <div className="w-full pt-4 pb-2 sticky top-0 z-20 bg-white hidden lg:block">
                <Navbar />
            </div>
            {/* mobile navbar */}
            <div className="w-full pt-4 pb-4 sticky top-0 z-20 bg-white shadow block lg:hidden">
                <MobileNavbar />
            </div>
            {/* search box */}
            <SearchBox />
        </>
    )
}

export default Search