import AdsAbove from "@/components/modules/AdsAbove/AdsAbove";
import MobileNavbar from "@/components/modules/Header/MobileNavbar";
import Navbar from "@/components/modules/Header/Navbar";
import SliderBanner from "@/components/templates/Index/SiderBanner/SliderBaner";
import SliderBannerMobile from "@/components/templates/Index/SiderBanner/SliderBannerMobile";


export default function Home() {
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
      <SliderBanner />
      <SliderBannerMobile />
    </>
  );
}
