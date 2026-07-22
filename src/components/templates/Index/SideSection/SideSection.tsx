"use client"
import NewsDossier from './NewsDossier'
import Theater from './Theater'
import NotableFigures from './NotableFigures'
import LocalFood from './LocalFood'
import LatestPosts from './LatestPosts'

const SideSection = () => {
    return (
        <div className='w-full pt-8 pb-2 px-8 container'>
            <div className="flex gap-x-4">
                <div className="lg:w-[50%] w-0 lg:basis-[50%] basis-0 lg:block hidden">
                    <NewsDossier />
                    <Theater />
                    <NotableFigures />
                    <LocalFood />
                </div>
                <div className="lg:w-[50%] lg:basis-[50%] w-full basis-full">
                    <LatestPosts />
                </div>
            </div>
        </div>
    )
}

export default SideSection;