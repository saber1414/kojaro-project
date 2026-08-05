"use client"

type ArticleBottomSectionProps = {
  scrollToCommentBox: () => void;
  progress: number;
  showModal: () => void;
}

const ArticleBottomSection = ({ scrollToCommentBox, progress, showModal }: ArticleBottomSectionProps) => {
  return (
    <div className="fixed bottom-0 w-full bg-white h-12 px-4 right-0 left-0 z-10 shadow shadow-gray-400 block lg:hidden">
      <div className="flex items-center justify-between h-[inherit]">
        <button type="button" className='flex flex-row-reverse gap-x-1'>
          <svg width="16" height="16" viewBox="0 0 256 256" className="h-5 w-5 fill-gray-500"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
          <span className='text-[14px] text-gray-500'>0</span>
        </button>
        <button type="button" onClick={scrollToCommentBox} className='flex flex-row-reverse gap-x-1'>
          <svg width="16" height="16" viewBox="0 0 256 256" className="h-5 w-5 fill-gray-500" stroke="var(--text)"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
          <span className='text-[14px] text-gray-500'>0</span>
        </button>
        <button onClick={showModal} type="button" className='flex flex-row-reverse gap-x-1'>
          <svg width="16" height="16" viewBox="0 0 256 256" className="h-5 w-5 fill-gray-500"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
        </button>
        <button type="button" className='flex flex-row-reverse gap-x-1'>
          <svg width="16" height="16" viewBox="0 0 256 256" className="h-5 w-5 fill-gray-500"><path d="M176,156a43.78,43.78,0,0,0-29.09,11L106.1,140.8a44.07,44.07,0,0,0,0-25.6L146.91,89a43.83,43.83,0,1,0-13-20.17L93.09,95a44,44,0,1,0,0,65.94L133.9,187.2A44,44,0,1,0,176,156Zm0-120a20,20,0,1,1-20,20A20,20,0,0,1,176,36ZM64,148a20,20,0,1,1,20-20A20,20,0,0,1,64,148Zm112,72a20,20,0,1,1,20-20A20,20,0,0,1,176,220Z"></path></svg>
        </button>
      </div>
      <div className="w-full h-2 bg-gray-200 absolute bottom-0 right-0 left-0">
        <span className='block h-[inherit] bg-green-500' style={{ width: `${progress}%` }}></span>
      </div>
    </div>
  )
}

export default ArticleBottomSection;