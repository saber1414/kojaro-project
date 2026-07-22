"use client"
import React, { useCallback, useRef, useState } from 'react'

type ShortVideo = {
    _id: number;
    title: string;
    poster: string;
    video: string;
}

type VideoPlayerProps = {
    shortVideo: ShortVideo[];
    closeVideo: () => void
}

const VideoPlayer = ({ closeVideo, shortVideo }: VideoPlayerProps) => {
    const [sound, setSound] = useState(false);


    return (
        <div className='fixed bg-dark top-0 left-0 bottom-0 right-0 z-40 px-6 py-6'>
            <div className="absolute flex items-center justify-between right-4 left-4">
                <button onClick={closeVideo} type="button" className='cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                </button>
                {
                    sound ? (
                        <button onClick={() => setSound(false)} type="button" className='cursor-pointer'>
                            <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white"><path d="M157.27,21.22a12,12,0,0,0-12.64,1.31L75.88,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V32A12,12,0,0,0,157.27,21.22ZM36,100H68v56H36Zm104,99.46L92,162.13V93.87l48-37.33ZM212,128a44,44,0,0,1-11,29.11,12,12,0,1,1-18-15.88,20,20,0,0,0,0-26.43,12,12,0,0,1,18-15.86A43.94,43.94,0,0,1,212,128Zm40,0a83.87,83.87,0,0,1-21.39,56,12,12,0,0,1-17.89-16,60,60,0,0,0,0-80,12,12,0,1,1,17.88-16A83.87,83.87,0,0,1,252,128Z"></path></svg>
                        </button>
                    ) : (
                        <button onClick={() => setSound(true)} type="button" className='cursor-pointer'>
                            <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white"><path d="M56.88,31.93A12,12,0,1,0,39.12,48.07L64.51,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V185.44l35.12,38.63a12,12,0,0,0,17.76-16.14ZM36,100H68v56H36Zm104,99.46L92,162.13V106.24L140,159Zm-31-134a12,12,0,0,1,2.11-16.84l33.51-26.07A12,12,0,0,1,164,32V94.94a12,12,0,0,1-24,0V56.54l-14.15,11A12,12,0,0,1,109,65.44Zm74,49.35a12,12,0,0,1,18-15.85,44,44,0,0,1,5.55,50.21,12,12,0,0,1-21-11.55A19.67,19.67,0,0,0,188,128,20,20,0,0,0,183,114.79ZM252,128a84.18,84.18,0,0,1-19.11,53.35,12,12,0,1,1-18.53-15.25A60,60,0,0,0,212.73,88a12,12,0,1,1,17.88-16A83.87,83.87,0,0,1,252,128Z"></path></svg>
                        </button>
                    )
                }
            </div>
            <div className="absolute top-[50%] flex flex-col gap-y-4">
                <button type="button" className='cursor-pointer w-12 h-12 bg-dark2 rounded-full flex items-center justify-center'>
                    <svg width="16" height="16" viewBox="0 0 256 256" className="h-6 w-6 text-white fill-white" aria-hidden="true"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                </button>
                <button type="button" className='cursor-pointer w-12 h-12 bg-dark2 rounded-full flex items-center justify-center'>
                    <svg width="16" height="16" fill="var(--grey-1)" viewBox="0 0 256 256" className="h-6 w-6 rotate-180 text-white fill-white" aria-hidden="true"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                </button>
            </div>
            {
                shortVideo.map((video) => (
                    <div key={video._id} className="w-128.25 relative h-full flex-col mx-auto my-0 bg-[url('/images/popular01.jpg')] bg-cover bg-no-repeat">
                        <button type="button" className='cursor-pointer absolute top-[50%] right-[45%] left-[50%]'>
                            <svg viewBox="0 0 16 16" className="scale-150 fill-white" width="52" height="52"><path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm2.841 8.284-4.333 2.667a.336.336 0 0 1-.337.007.334.334 0 0 1-.171-.291V5.334a.334.334 0 0 1 .508-.284l4.334 2.666a.333.333 0 0 1 0 .568z" fillRule="nonzero"></path></svg>
                        </button>
                        <div className="absolute bottom-15 right-2.5">
                            <span className='text-white font-IRANYekan-Bold py-2 block'>بانجی‌جامپینگ مرگبار در برزیل!</span>
                            <p className='text-white text-[13px]'>انجی‌جامپینگ مرگبار در برزیل</p>
                        </div>
                        <div className="absolute bottom-2.5 left-2.5">
                            <div className="flex items-center gap-x-2">
                                <button type="button" className='cursor-pointer rotate-180'>
                                    <svg width="16" height="16" fill="currentColor" className="bi bi-play-fill fill-white text-white" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                    </svg>
                                </button>
                                <span className="bg-white block w-116 h-1.25 rounded-full cursor-pointer">
                                    <small className='w-[50%] h-1.25 bg-blueMenu block'></small>
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default VideoPlayer;