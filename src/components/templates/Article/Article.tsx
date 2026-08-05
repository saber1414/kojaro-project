"use client"
import Link from 'next/link';
import RelatedArticles from './RelatedArticles';
import Comments from './Comments';
import { useCallback, useEffect, useRef, useState } from 'react';
import Advertisement from './Advertisement';
import LatestContent from './LatestContent';
import ArticleBoxMobile from './ArticleBoxMobile';
import ArticleBottomSection from './ArticleBottomSection';
import Bookmark from './Bookmark';

const ArticleBox = () => {
  const articleContentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const scrollToCommentBox = () => {
    const commentBox = document.getElementById('comment-box');
    if (commentBox) {
      const yOffset = -80;
      const y = commentBox.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScroll = useCallback(() => {
    if (!articleContentRef.current) return;

    const articleTop = articleContentRef.current.offsetTop;
    const articleHeight = articleContentRef.current.scrollHeight;

    const scrollTop = window.scrollY;
    const scrolledFromArticle = scrollTop - articleTop;
    const windowHight = window.innerHeight;

    let progressPercent = 0;

    if (scrolledFromArticle <= 0) {
      progressPercent = 0;
    } else if (scrolledFromArticle >= articleHeight - windowHight) {
      progressPercent = 100
    } else {
      progressPercent = (scrolledFromArticle / (articleHeight - windowHight)) * 100;
    };

    const finalProgress = Math.min(Math.max(Math.round(progressPercent), 0), 100);
    setProgress(finalProgress)
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll()
    }, 100);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll)
    }
  }, [handleScroll]);


  useEffect(() => {
    if (isBookmark) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => { document.body.style.overflow = "auto" }
  }, [isBookmark])

  return (
    <>
      <div className='w-full pt-8 pb-2 xl:px-8 lg:px-4 px-2 container'>
        <div className="flex lg:flex-row flex-col gap-x-4">
          <div className='2xl:basis-[10%] xl:basis-[10%] lg:basis-[10%] basis-[10%] mt-28 hidden lg:block'>
            <div className="sticky top-50 flex flex-col items-center">
              <div className="flex flex-col gap-y-4 mb-6 items-center ">
                <button onClick={scrollToCommentBox} type="button" className='cursor-pointer flex flex-col items-center gap-y-2'>
                  <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                  <span className='text-[14px] text-gray-400'>3</span>
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mb-6 items-center">
                <button type="button" className='cursor-pointer flex flex-col items-center gap-y-2'>
                  <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
                  <span className='text-[14px] text-gray-400'>7</span>
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mb-6 items-center">
                <button onClick={() => setIsBookmark(true)} type="button" className='cursor-pointer flex flex-col items-center gap-y-2'>
                  <svg width="20" height="20" className='fill-gray-400' viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mb-6 items-center">
                <button type="button" className='cursor-pointer flex flex-col items-center gap-y-2'>
                  <svg width="20" height="20" viewBox="0 0 256 256" className='fill-gray-400'><path d="M176,156a43.78,43.78,0,0,0-29.09,11L106.1,140.8a44.07,44.07,0,0,0,0-25.6L146.91,89a43.83,43.83,0,1,0-13-20.17L93.09,95a44,44,0,1,0,0,65.94L133.9,187.2A44,44,0,1,0,176,156Zm0-120a20,20,0,1,1-20,20A20,20,0,0,1,176,36ZM64,148a20,20,0,1,1,20-20A20,20,0,0,1,64,148Zm112,72a20,20,0,1,1,20-20A20,20,0,0,1,176,220Z"></path></svg>
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mb-6 items-center">
                <div className="w-0.5 h-31 bg-gray-200 relative">
                  <span
                    className='absolute top-0 left-0 right-0 bg-green-400 transition-all duration-300'
                    style={{ height: `${progress}%` }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div ref={articleContentRef} className='2xl:basis-[70%] xl:basis-[65%] lg:basis-[60%] basis-[90%] hidden lg:block'>
            <h1 className='font-IRANYekan-Bold xl:text-2xl text-[17px]'>شادترین شهر جهان در سال ۲۰۲۶ معرفی شد؛ ۲۰ شهری که شما را غافلگیر می‌کند</h1>
            <div className="mt-10 flex items-center gap-x-4">
              <Link href="#" className='text-[13px] text-gray-500 font-IRANYekan-Light'>اخبار گردشگری و میراث</Link>
              <span className='block w-px h-4 bg-gray-400'></span>
              <p className='text-[13px] text-gray-500 font-IRANYekan-Light'>شنبه 3 مرداد 1405 - 18:17</p>
              <span className='block w-px h-4 bg-gray-400'></span>
              <p className='text-[13px] text-gray-500 font-IRANYekan-Light'>مطالعه 3 دقیقه</p>
            </div>
            <div className="mt-5">
              <Link href="#" className='flex items-center gap-x-2'>
                <img src="images/profile.jpg" className='w-8 h-8 rounded-full' alt="profile image" />
                <span className='text-[14px] font-IRANYekan-Bold'>بنفشه کمالی</span>
              </Link>
            </div>
            <div className="mt-5">
              <img src="/images/image25.jpg" className='rounded-sm' alt="img" />
              <p className='py-2 text-dark2 text-[16px]'>با بررسی نظر بیش از ۲۴ هزار شهروند از سراسر جهان، فهرست شادترین شهرهای دنیا در سال ۲۰۲۶ منتشر شد.</p>
              <p className="py-2 text-dark2 text-[16px]">
                نتایج تازه‌ترین نظرسنجی جهانی نشان می‌دهد شهر باث در انگلیس عنوان شادترین شهر جهان در سال ۲۰۲۶ را به دست آورده است. این رتبه‌بندی را مجله Time Out با بررسی دیدگاه بیش از ۲۴ هزار نفر از ساکنان شهرهای مختلف جهان تهیه کرده است.
              </p>
              <p className="py-2 text-dark2 text-[16px]">
                این نظرسنجی فقط به جذابیت‌های گردشگری شهرها توجه نکرده، بلکه عواملی مانند احساس رضایت ساکنان، ارتباط اجتماعی، تجربه‌های روزمره، دسترسی به فرهنگ، فضاهای سبز و میزان مثبت‌اندیشی مردم را نیز بررسی کرده است.
              </p>
              <h2 className='text-[18px] py-4 font-IRANYekan-Bold'>باث؛ شهری تاریخی با بیشترین حس شادی</h2>
              <img src="/images/image26.jpg" className='w-full rounded-sm bg-cover' alt="img" />
              <p className="py-2">
                باث با کسب بالاترین امتیاز کلی، رتبه نخست فهرست شادترین شهرهای جهان در سال ۲۰۲۶ را به خود اختصاص داد. ۹۳ درصد از ساکنان این شهر اعلام کردند که زندگی در باث آن‌ها را خوشحال می‌کند و ۹۲ درصد گفتند در این شهر نسبت به مکان‌های دیگری که تجربه کرده‌اند، احساس شادی بیشتری دارند.
              </p>
              <p className="py-2">
                همچنین ۹۰ درصد از شرکت‌کنندگان، مردم باث را مثبت ارزیابی کردند، ۹۱ درصد از تجربه‌های روزمره خود در این شهر رضایت داشتند و ۷۶ درصد معتقد بودند میزان شادی در شهرشان طی سال‌های اخیر افزایش یافته است.
              </p>
              <p className="py-2">
                باث به‌دلیل حمام‌های تاریخی رومی، معماری گرجی و نزدیکی به طبیعت شناخته می‌شود. این شهر همچنین در بخش فضاهای سبز و ارتباط با طبیعت امتیاز بالایی کسب کرد. ۸۳ درصد از ساکنان باث گفتند پیدا کردن حس اجتماع و ارتباط با دیگران در این شهر آسان است.
              </p>
              <h2 className='text-[18px] py-4 font-IRANYekan-Bold'>شهرهای آمریکایی و آسیایی در میان شادترین‌های جهان</h2>
              <img src="/images/image27.jpg" className='w-full rounded-sm bg-cover' alt="img" />
              <p className="py-2">
                پس از باث، پاناما سیتی در رتبه دوم قرار گرفت. ۹۳ درصد از ساکنان این شهر گفتند زندگی در پاناما سیتی باعث شادی آن‌ها می‌شود. این شهر همچنین بالاترین امتیاز را در زمینه حس اجتماعی میان تمام شهرهای بررسی‌شده به دست آورد؛ ۸۷ درصد از مردم اعلام کردند ایجاد ارتباط با دیگران در این شهر آسان است.
              </p>
              <p className="py-2">
                گوادالاخارای مکزیک نیز با امتیاز کلی ۸۳ درصد جایگاه سوم را به دست آورد. این شهر که به زادگاه موسیقی ماریاچی و نوشیدنی‌های مختلف شناخته می‌شود، در زمینه فرهنگ و غذا نیز عملکرد خوبی داشت. ۸۶ درصد از شرکت‌کنندگان از فضای فرهنگی شهر و ۸۵ درصد از فرهنگ غذایی آن رضایت داشتند.
              </p>
              <p className="py-2">
                مدئین در کلمبیا، کراکوف در لهستان و جیپور در هند دیگر شهرهای بالای جدول بودند. در میان شهرهای بزرگ جهان نیز شیکاگو، شانگهای، مونترال، سائوپائولو و ملبورن توانستند جایگاهی در فهرست ۲۰ شهر شاد جهان پیدا کنند.
              </p>
              <h2 className="text-[18px] py-4 font-IRANYekan-Bold">فهرست ۲۰ شادترین شهر جهان در سال ۲۰۲۶</h2>
              <ul className='mt-5'>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>باث، بریتانیا</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>پاناما سیتی، پاناما</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>گوادالاخارا، مکزیک</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>مدئین، کلمبیا</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>کراکوف، لهستان</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>جیپور، هند</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>شیکاگو، آمریکا</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>کیپ‌تاون، آفریقای جنوبی</p>
                </li>
                <li className='flex items-center gap-x-2 pb-2'>
                  <span className='w-2 h-2 rounded-full bg-blueMenu block'></span>
                  <p className='font-IRANYekan-Bold'>شانگهای، چین</p>
                </li>
              </ul>
              <p className="py-2">این رتبه‌بندی نشان می‌دهد شادی شهری فقط به اندازه یا شهرت یک شهر وابسته نیست؛ بلکه عواملی مانند روابط اجتماعی، دسترسی به طبیعت، فعالیت‌های فرهنگی و کیفیت تجربه‌های روزمره نقش مهمی در احساس رضایت ساکنان دارند.</p>
            </div>
            <div className="mt-5">
              <div className="border border-gray-200 p-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center xl:gap-x-8 gap-x-2">
                    <div className="flex items-center gap-x-4">
                      <span className='text-[14px] font-IRANYekan-Bold'>مقاله رو دوست داشتی؟</span>
                      <button type="button" className='cursor-pointer flex gap-x-2'>
                        <svg width="12" height="12" className='fill-gray-500 mt-0.5' viewBox="0 0 256 256"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
                        <span className='text-[13px] text-gray-500'>لایک</span>
                      </button>
                    </div>
                    <div className="flex items-center xl:gap-x-4 gap-x-2">
                      <span className='text-[14px] font-IRANYekan-Bold'>نظرت چیه؟</span>
                      <button type="button" className='cursor-pointer flex gap-x-2'>
                        <svg width="12" height="12" className='fill-gray-500 mt-0.5' viewBox="0 0 256 256" stroke="var(--text)"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path></svg>
                        <span className='text-[13px] text-gray-500'>ارسال نظر</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center xl:gap-x-8 gap-x-2">
                    <button type="button" className='cursor-pointer flex gap-x-2'>
                      <svg width="12" height="12" viewBox="0 0 256 256" className='fill-gray-500 mt-0.5'><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
                      <span className='text-[13px] text-gray-500'>بوکمارک</span>
                    </button>
                    <button type="button" className='cursor-pointer flex gap-x-2'>
                      <svg width="12" height="12" className='fill-gray-500 mt-0.5' viewBox="0 0 256 256"><path d="M176,156a43.78,43.78,0,0,0-29.09,11L106.1,140.8a44.07,44.07,0,0,0,0-25.6L146.91,89a43.83,43.83,0,1,0-13-20.17L93.09,95a44,44,0,1,0,0,65.94L133.9,187.2A44,44,0,1,0,176,156Zm0-120a20,20,0,1,1-20,20A20,20,0,0,1,176,36ZM64,148a20,20,0,1,1,20-20A20,20,0,0,1,64,148Zm112,72a20,20,0,1,1,20-20A20,20,0,0,1,176,220Z"></path></svg>
                      <span className='text-[13px] text-gray-500'>اشتراک گذاری</span>
                    </button>
                  </div>
                </div>
                <span className='w-full h-px bg-gray-200 block my-4'></span>
                <div className="flex items-center justify-between">
                  <Link href="#" className='flex items-center gap-x-2'>
                    <img src="/images/profile.jpg" className='w-10 h-10 rounded-full' alt="img" />
                    <span className='text-[14px] font-IRANYekan-Bold'>بنفشه کمالی</span>
                  </Link>
                  <button type="button" className='w-31 h-10 border border-gray-200 rounded-full px-4 flex items-center gap-x-2 cursor-pointer'>
                    <svg width="16" height="16" viewBox="0 0 256 256"><path d="M44,68V196h64a12,12,0,0,1,0,24H40a20,20,0,0,1-20-20V64A20,20,0,0,1,40,44H93.33a20.12,20.12,0,0,1,12,4L132,68h84a20,20,0,0,1,20,20v20a12,12,0,0,1-24,0V92H128a12,12,0,0,1-7.2-2.4L92,68ZM239.64,170.87l-20.58,17,6.25,25.26a12,12,0,0,1-17.73,13.22L184,212.46l-23.58,13.88a12,12,0,0,1-17.73-13.22l6.25-25.26-20.58-17a12,12,0,0,1,6.72-21.22l27.42-2.12L173,123.24a12,12,0,0,1,22,0l10.48,24.29,27.42,2.12a12,12,0,0,1,6.72,21.22Zm-38.2.42-5-.39a12,12,0,0,1-10.09-7.21l-2.33-5.4-2.33,5.4a12,12,0,0,1-10.1,7.21l-5,.39,3.48,2.87a12,12,0,0,1,4,12.13l-1.21,4.89,5.07-3a12,12,0,0,1,12.18,0l5.07,3L194,186.29a12,12,0,0,1,4-12.13Z"></path></svg>
                    <span className='text-[14px]'>دنبال کردن</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            <ArticleBoxMobile
              scrollToCommentBox={scrollToCommentBox}
              progress={progress}
            />
          </div>
          <div className='2xl:basis-[20%] xl:basis-[25%] lg:basis-[30%] basis-0 hidden lg:block mt-35'>
            <div className="sticky top-40 flex flex-col">
              <Advertisement />
              <LatestContent />
            </div>
          </div>
          {/* mobile */}
          <div className="mt-10 pr-8 block lg:hidden">
            <Advertisement />
            <LatestContent />
          </div>
        </div>
        <div className="hidden lg:flex">
          <RelatedArticles />
        </div>
        <div id='comment-box'>
          <Comments />
        </div>
        {/* mobile */}
        <ArticleBottomSection
          scrollToCommentBox={scrollToCommentBox}
          progress={progress}
          showModal={() => setIsBookmark(true)}
        />
        {/* show bookmark */}
        {
          isBookmark && (
            <Bookmark
              onCancel={() => setIsBookmark(false)}
            />
          )
        }
      </div>
      <div onClick={() => setIsBookmark(false)} className={`fixed bg-overview top-0 right-0 left-0 bottom-0 z-30 ${isBookmark ? "block" : "hidden"}`}></div>
    </>
  )
}

export default ArticleBox;