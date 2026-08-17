import Link from 'next/link'

type ProfileProps = {
    title: string;
    description: string
}

const Profile = ({title, description}: ProfileProps) => {
    return (
        <>
            <div className="relative">
                <img src="/images/profile-cover.png" alt="profile cover" />
                <div className="lg:w-26 lg:h-26 w-20 h-20 flex items-center justify-center bg-white shadow shadow-gray-200 rounded-full absolute top-[80%] right-0 left-0 mx-auto my-0">
                    <img src="/images/profile04.png" className='lg:w-24 lg:h-24 w-18 h-18' alt="img" />
                </div>
            </div>
            <div className="w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container">
                <div className="flex flex-wrap gap-y-4 items-center lg:justify-between justify-center mt-10 lg:mt-0">
                    <div className="flex items-center gap-x-4 ml-4 lg:ml-0">
                        <Link href="/userPanel" className='w-32.5 rounded-sm h-7.5 flex items-center justify-center gap-x-2 text-gray-400 bg-white shadow shadow-gray-200'>
                            <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M212,76H32A12,12,0,0,0,20,88v48a100.24,100.24,0,0,0,26.73,68H32a12,12,0,0,0,0,24H208a12,12,0,0,0,0-24H193.27a100.75,100.75,0,0,0,20-32A44,44,0,0,0,256,128v-8A44.05,44.05,0,0,0,212,76Zm-16,60a76.27,76.27,0,0,1-42,68H86a76.27,76.27,0,0,1-42-68V100H196Zm36-8a20,20,0,0,1-12.57,18.55A97.17,97.17,0,0,0,220,136V101.68A20,20,0,0,1,232,120ZM68,48V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Zm40,0V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Zm40,0V24a12,12,0,0,1,24,0V48a12,12,0,0,1-24,0Z"></path></svg>
                            <span className='text-[14px]'>کجارو من</span>
                        </Link>
                        <Link href="/userPanel/bookmarks" className='w-32.5 rounded-sm h-7.5 flex items-center justify-center gap-x-2 text-gray-400 bg-white shadow shadow-gray-200'>
                            <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                            <span className='text-[14px]'>بوکمارک مطالب</span>
                        </Link>
                    </div>
                    <div className="flex sm:flex-nowrap flex-wrap sm:gap-y-0 gap-y-4 items-center gap-x-4">
                        <Link href="/userPanel/notifications" className='w-32.5 rounded-sm h-7.5 flex items-center justify-center gap-x-2 text-gray-400 bg-white shadow shadow-gray-200'>
                            <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M225.29,165.93C216.61,151,212,129.57,212,104a84,84,0,0,0-168,0c0,25.58-4.59,47-13.27,61.93A20.08,20.08,0,0,0,30.66,186,19.77,19.77,0,0,0,48,196H84.18a44,44,0,0,0,87.64,0H208a19.77,19.77,0,0,0,17.31-10A20.08,20.08,0,0,0,225.29,165.93ZM128,212a20,20,0,0,1-19.6-16h39.2A20,20,0,0,1,128,212ZM54.66,172C63.51,154,68,131.14,68,104a60,60,0,0,1,120,0c0,27.13,4.48,50,13.33,68Z"></path></svg>
                            <span className='text-[14px]'>اعلانات</span>
                        </Link>
                        <Link href="/userPanel/activities" className='w-32.5 rounded-sm h-7.5 flex items-center justify-center gap-x-2 text-gray-400 bg-white shadow shadow-gray-200'>
                            <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M196,84a31.94,31.94,0,0,0-11.22,2A32,32,0,0,0,148,69V44a32,32,0,0,0-64,0v66.83A32,32,0,0,0,32.25,148l4.68,8.24C71.11,216.48,86.72,244,136,244a92.1,92.1,0,0,0,92-92V116A32,32,0,0,0,196,84Zm8,68a68.08,68.08,0,0,1-68,68c-34,0-43.49-14.45-78.2-75.65l-4.69-8.28a.16.16,0,0,1,0-.07,8,8,0,0,1,13.86-8c.06.12.13.23.2.35l18.68,30A12,12,0,0,0,108,152V44a8,8,0,0,1,16,0v68a12,12,0,0,0,24,0V100a8,8,0,0,1,16,0v20a12,12,0,0,0,24,0v-4a8,8,0,0,1,16,0Z"></path></svg>
                            <span className='text-[14px]'>فعالیت ها</span>
                        </Link>
                        <Link href="/userPanel/settings" className='w-32.5 rounded-sm h-7.5 flex items-center justify-center gap-x-2 text-gray-400 bg-white shadow shadow-gray-200'>
                            <svg width="16" height="16" className='fill-gray-400' viewBox="0 0 256 256"><path d="M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"></path></svg>
                            <span className='text-[14px]'>تنظیمات</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-center text-2xl font-IRANYekan-Bold">{title}</h2>
                    <p className="text-[14px] py-6 text-gray-500 text-center">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Profile