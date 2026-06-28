import AdsAbove from "@/components/modules/AdsAbove/AdsAbove";
import Navbar from "@/components/modules/Header/Navbar";


export default function Home() {
  return (
    <>
      <AdsAbove />
      <div className="w-full px-8 pt-4 pb-5">
        <Navbar />
      </div>
    </>
  );
}
