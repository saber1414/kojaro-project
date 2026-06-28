"use client"
import Link from 'next/link'
import { useState } from 'react'

const AdsAbove = () => {
    const [showAdsAbove, setShowAdsAbove] = useState<boolean>(true);

    return (
        <div className={`w-full h-47.75 relative ${showAdsAbove ? "block" : "hidden"}`}>
            <Link href="#">
                <img src="/images/adsAbove.gif" alt="adsAbove" />
            </Link>
            <button
                type="button"
                className='cursor-pointer w-5 h-5 bg-white2 absolute top-0 left-0 flex items-center justify-center'
                onClick={() => setShowAdsAbove(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--white)" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
            </button>
        </div>
    )
}

export default AdsAbove