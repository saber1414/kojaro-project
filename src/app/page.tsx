import AdsAbove from "@/components/modules/AdsAbove/AdsAbove";
import Footer from "@/components/modules/Footer/Footer";
import MobileNavbar from "@/components/modules/Header/MobileNavbar";
import Navbar from "@/components/modules/Header/Navbar";
import Advertisement from "@/components/templates/Index/Advertisement/Advertisement";
import AdvertisementMobile from "@/components/templates/Index/Advertisement/AdvertisementMobile";
import EditorsPick from "@/components/templates/Index/EditorsPick/EditorsPick";
import KojaroVideos from "@/components/templates/Index/KojaroVideos/KojaroVideos";
import PlacesOfInterest from "@/components/templates/Index/PlacesOfInterest/PlacesOfInterest";
import SliderBanner from "@/components/templates/Index/SiderBanner/SliderBaner";
import SliderBannerMobile from "@/components/templates/Index/SiderBanner/SliderBannerMobile";
import SideSection from "@/components/templates/Index/SideSection/SideSection";
import Special from "@/components/templates/Index/Special/Special";


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
      <EditorsPick />
      <div className="hidden lg:block">
        <Advertisement />
      </div>
      <div className="block lg:hidden">
        <AdvertisementMobile />
      </div>
      <PlacesOfInterest />
      <KojaroVideos />
      <SideSection />
      <Special/>
      <Footer />
    </>
  );
};
