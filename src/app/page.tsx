import AdsAbove from "@/components/modules/AdsAbove/AdsAbove";
import Navbar from "@/components/modules/Header/Navbar";
import SliderBanner from "@/components/templates/Index/SiderBanner/SliderBaner";


export default function Home() {
  return (
    <>
      <AdsAbove />
      <div className="w-full pt-4 pb-2 sticky top-0 z-20 bg-white">
        <Navbar />
      </div>
      <SliderBanner />
    </>
  );
}
